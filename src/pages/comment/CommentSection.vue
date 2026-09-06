<template>
  <div class="forum-list">
    <div class="list-toolbar">
      <div class="toolbar-copy">
        <p class="toolbar-title">讨论区</p>
        <p class="toolbar-meta">共 {{ meta.total }} 个主题，当前第 {{ meta.page }} / {{ Math.max(meta.totalPages, 1) }} 页</p>
      </div>
      <div class="toolbar-actions">
        <div class="view-tabs">
          <button
            v-for="item in views"
            :key="item.value"
            class="view-tab"
            :class="{ active: selectedView === item.value }"
            @click="selectedView = item.value"
          >
            {{ item.label }}
          </button>
        </div>
        <label class="sort-select">
          <span>排序</span>
          <select v-model="selectedSort" @change="handleSortChange">
            <option value="latest">最新发布</option>
            <option value="top">热度优先</option>
          </select>
        </label>
      </div>
    </div>

    <div class="signal-strip">
      <div class="signal-item">
        <span class="signal-label">推荐内容</span>
        <strong>架构设计 + 经验分享</strong>
      </div>
      <div class="signal-item">
        <span class="signal-label">当前视图</span>
        <strong>{{ viewLabel }}</strong>
      </div>
      <div class="signal-item">
        <span class="signal-label">热门讨论</span>
        <strong>{{ hottestThread?.title || '暂无热门讨论' }}</strong>
      </div>
    </div>

    <div class="search-row">
      <input
        v-model.trim="searchKeyword"
        class="search-input"
        placeholder="搜索标题、正文、作者，快速定位技术话题"
      />
      <div class="category-tabs">
        <button
          v-for="item in categoryOptions"
          :key="item"
          class="category-tab"
          :class="{ active: selectedCategory === item }"
          @click="handleCategoryChange(item)"
        >
          {{ item }}
        </button>
      </div>
      <span class="search-result">命中 {{ filteredComments.length }} 个主题</span>
    </div>

    <div v-if="isLoading && comments.length === 0" class="state-card">
      <Spin />
      <p>正在加载讨论列表...</p>
    </div>

    <div v-else-if="filteredComments.length > 0" class="thread-list">
      <article
        v-for="comment in filteredComments"
        :key="comment.id"
        class="thread-card"
        @click="goToDetail(comment.id)"
      >
        <div class="thread-rank">{{ threadHeat(comment) }}</div>
        <div class="thread-main">
          <div class="thread-topline">
            <span class="thread-type">{{ comment.category || resolveThreadType(comment) }}</span>
            <span v-if="comment.isPinned" class="thread-badge pin">置顶</span>
            <span v-if="comment.isFeatured" class="thread-badge featured">精华</span>
            <span v-if="comment.likeCount >= 3" class="thread-badge hot">热门</span>
            <span v-if="comment.replyCount === 0" class="thread-badge plain">待解答</span>
            <span v-if="comment.replyCount >= 5" class="thread-badge plain">多回复</span>
          </div>
          <h3 class="thread-title">{{ comment.title || '未命名主题' }}</h3>
          <p class="thread-excerpt">{{ excerpt(comment.content) }}</p>
          <div v-if="comment.tags && comment.tags.length > 0" class="thread-tags">
            <span v-for="tag in comment.tags" :key="tag" class="thread-tag"># {{ tag }}</span>
          </div>
          <div class="thread-footer">
            <div class="thread-author">
              <img :src="comment.user?.avatar || defaultAvatar" :alt="comment.user?.username || '开发者'">
              <div>
                <strong>{{ comment.user?.username || '开发者' }}</strong>
                <div class="author-tags-row">
                  <span v-if="comment.user?.badge" class="author-custom-badge">{{ comment.user.badge }}</span>
                  <span class="author-level">Lv.{{ Math.floor((comment.user?.score || 0) / 100) + 1 }}</span>
                  <span>{{ authorTag(comment) }}</span>
                </div>
              </div>
            </div>
            <div class="thread-stats">
              <span>{{ formatDate(comment.createdAt) }}</span>
              <span>{{ comment.likeCount }} 赞同</span>
              <span>{{ comment.replyCount }} 回复</span>
              <span>{{ formatLastActivity(comment) }}</span>
            </div>
          </div>
        </div>
        <div class="thread-entry">
          <button class="enter-btn" @click.stop="goToDetail(comment.id)">进入讨论</button>
          <button
            v-if="canDelete(comment)"
            class="delete-btn"
            @click.stop="handleDeleteComment(comment.id)"
          >
            删除
          </button>
        </div>
      </article>
    </div>

    <div v-else class="state-card empty">
      <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      <p>没有找到符合条件的主题，换个关键词或直接发布新主题。</p>
    </div>

    <div v-if="meta.totalPages > 1" class="pagination-bar">
      <button class="page-btn" :disabled="meta.page <= 1 || isLoading" @click="handlePageChange(meta.page - 1)">
        上一页
      </button>
      <span class="page-indicator">{{ meta.page }} / {{ meta.totalPages }}</span>
      <button class="page-btn" :disabled="meta.page >= meta.totalPages || isLoading" @click="handlePageChange(meta.page + 1)">
        下一页
      </button>
    </div>

    <div v-if="error" class="error-message">
      <span>{{ error }}</span>
      <button class="retry-btn" @click="retryLoad">重试</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import defaultAvatar from '~/assets/icon/default-avatar.png';
import type { MainComment } from '~/types/comment';
import { useCommentStore } from '~/store/commentStore';
import { useUserStore } from '~/store/user';
import Spin from './Spin.vue';

type ViewMode = 'all' | 'hot' | 'unanswered' | 'longform';

const views: { label: string; value: ViewMode }[] = [
  { label: '全部', value: 'all' },
  { label: '热议', value: 'hot' },
  { label: '待回复', value: 'unanswered' },
  { label: '长帖', value: 'longform' },
];

const router = useRouter();
const commentStore = useCommentStore();
const userStore = useUserStore();
const { comments, isLoading, error, meta } = storeToRefs(commentStore);

const searchKeyword = ref('');
const selectedView = ref<ViewMode>('all');
const selectedSort = ref<'latest' | 'top'>('latest');
const selectedCategory = ref('全部');

const currentUserId = computed(() => {
  const userInfo = userStore.getUserInfo;
  return userInfo && 'userId' in userInfo ? parseInt(userInfo.userId) : 0;
});

const currentUserRole = computed(() => {
  const userInfo = userStore.getUserInfo;
  return userInfo && 'role' in userInfo ? String(userInfo.role).toUpperCase() : '';
});

const hottestThread = computed(() => {
  return [...comments.value].sort((a, b) => threadScore(b) - threadScore(a))[0];
});

const categoryOptions = computed(() => {
  const categories = new Set(['全部']);
  comments.value.forEach(comment => categories.add(comment.category || '综合讨论'));
  return [...categories];
});

const filteredComments = computed(() => {
  const keyword = searchKeyword.value.toLowerCase();
  return comments.value.filter((comment) => {
    const matchesView = (() => {
      if (selectedView.value === 'hot')
        return threadScore(comment) >= 8;
      if (selectedView.value === 'unanswered')
        return comment.replyCount === 0;
      if (selectedView.value === 'longform')
        return comment.replyCount >= 4 || plainText(comment.content).length > 120;
      return true;
    })();

    const haystack = `${comment.title || ''} ${plainText(comment.content)} ${comment.user?.username || ''}`.toLowerCase();
    const matchesKeyword = !keyword || haystack.includes(keyword);
    const matchesCategory = selectedCategory.value === '全部'
      || (comment.category || '综合讨论') === selectedCategory.value;
    return matchesView && matchesKeyword && matchesCategory;
  });
});

const viewLabel = computed(() => {
  return views.find(item => item.value === selectedView.value)?.label || '全部';
});

function plainText(content: string) {
  return content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(content: string) {
  const value = plainText(content);
  return value.length > 90 ? `${value.slice(0, 90)}...` : value;
}

function threadScore(comment: MainComment) {
  return comment.likeCount * 2 + comment.replyCount * 3;
}

function threadHeat(comment: MainComment) {
  const score = threadScore(comment);
  if (score >= 18)
    return '爆';
  if (score >= 10)
    return '热';
  if (score >= 4)
    return '升';
  return '新';
}

function resolveThreadType(comment: MainComment) {
  const title = (comment.title || '').toLowerCase();
  if (title.includes('求助') || title.includes('help'))
    return '求助帖';
  if (title.includes('复盘') || title.includes('赛'))
    return '赛事帖';
  if (title.includes('分享') || title.includes('技术'))
    return '技术帖';
  return '综合帖';
}

function authorTag(comment: MainComment) {
  if ((comment.user?.role || '').toUpperCase() === 'ADMIN')
    return '管理员';
  if (comment.replyCount >= 5)
    return '活跃贡献者';
  return '社区成员';
}

function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  const now = Date.now();
  const diff = Math.floor((now - date.getTime()) / 1000);
  if (diff < 60)
    return '刚刚发布';
  if (diff < 3600)
    return `${Math.floor(diff / 60)} 分钟前`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)} 小时前`;
  return `${Math.floor(diff / 86400)} 天前`;
}

function formatLastActivity(comment: MainComment) {
  const replies = comment.replies || [];
  const latest = replies.length > 0 ? replies[replies.length - 1].createdAt : comment.createdAt;
  return `最后活跃 ${formatDate(latest)}`;
}

function canDelete(comment: MainComment) {
  return comment.userId === currentUserId.value || currentUserRole.value === 'ADMIN';
}

async function handleSortChange() {
  try {
    await commentStore.changeSort(selectedSort.value);
  } catch (error) {
    message.error('切换排序失败');
  }
}

async function handleDeleteComment(commentId: number) {
  try {
    await commentStore.deleteComment(commentId);
    message.success('主题已删除');
  } catch (error) {
    message.error('删除失败，请重试');
  }
}

async function handlePageChange(page: number) {
  try {
    await commentStore.changePage(page);
  } catch (error) {
    message.error('翻页失败，请重试');
  }
}

function handleCategoryChange(category: string) {
  selectedCategory.value = category;
}

function retryLoad() {
  commentStore.loadComments();
}

function goToDetail(commentId: number) {
  router.push(`/comment/${commentId}`);
}
</script>

<style scoped>
.forum-list {
  display: grid;
  gap: 18px;
}

.list-toolbar,
.signal-strip,
.thread-card,
.state-card,
.error-message {
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.list-toolbar {
  display: grid;
  gap: 18px;
  padding: 20px;
  border-radius: 22px;
}

.toolbar-title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #1e293b;
}

.toolbar-meta {
  margin: 6px 0 0;
  font-size: 13px;
  color: #64748b;
}

.toolbar-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
}

.view-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.view-tab {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  border: 1px solid transparent;
}

.view-tab.active {
  color: #3b82f6;
  background: #eff6ff;
}

.sort-select {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #64748b;
}

.sort-select select,
.search-input {
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  color: #0f172a;
  background: #f8fafc;
  outline: none;
}

.sort-select select {
  min-height: 40px;
  padding: 0 12px;
}

.signal-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 14px 18px;
  border-radius: 18px;
}

.signal-item {
  display: grid;
  gap: 6px;
}

.signal-label {
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
}

.signal-item strong {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.search-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-tab {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.category-tab.active {
  color: #3b82f6;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.search-input {
  flex: 1 1 320px;
  min-height: 48px;
  padding: 12px 16px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  background: #f8fafc;
  color: #0f172a;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: #ffffff;
}

.search-result {
  font-size: 13px;
  color: rgba(208, 218, 241, 0.66);
}

.thread-list {
  display: grid;
  gap: 14px;
}

.thread-card {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto;
  gap: 18px;
  padding: 18px 20px;
  border-radius: 22px;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.thread-card:hover {
  transform: translateY(-1px);
  border-color: rgba(111, 145, 246, 0.34);
}

.thread-rank {
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  color: #94a3b8;
  border-right: 1px solid rgba(226, 232, 240, 0.8);
}

.thread-main {
  min-width: 0;
}

.thread-topline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.thread-type,
.thread-badge {
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.thread-type {
  color: #3b82f6;
  background: #eff6ff;
}

.thread-badge.hot {
  color: #ea580c;
  background: #ffedd5;
}

.thread-badge.pin {
  color: #ea580c;
  background: #ffedd5;
}

.thread-badge.featured {
  color: #16a34a;
  background: #dcfce7;
}

.thread-badge.plain {
  color: #64748b;
  background: #f1f5f9;
}

.thread-title {
  margin: 10px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.thread-excerpt {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #475569;
}

.thread-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.thread-tag {
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: #3b82f6;
  background: #eff6ff;
}

.thread-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(226, 232, 240, 0.8);
}

.thread-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.thread-author img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
}

.thread-author div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.author-tags-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.thread-author strong {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

.author-custom-badge {
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 800;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.author-level {
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 800;
  font-style: italic;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.thread-author span {
  font-size: 11px;
  color: #64748b;
}

.thread-stats {
  font-size: 12px;
  color: #94a3b8;
}

.thread-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.thread-entry {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.page-btn,
.retry-btn {
  min-height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.page-btn {
  color: #475569;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
}

.page-btn:hover:not(:disabled) {
  background: #f1f5f9;
}

.retry-btn {
  color: #f8d6d6;
  border: 1px solid rgba(239, 68, 68, 0.22);
  background: rgba(239, 68, 68, 0.10);
}

.enter-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.enter-btn:hover {
  background: #dbeafe;
}

.delete-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  color: #ef4444;
  background: #fef2f2;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: #fee2e2;
}

.state-card,
.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  border-radius: 20px;
  text-align: center;
  color: #64748b;
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.state-card.empty svg {
  margin-bottom: 16px;
  color: #94a3b8;
}

.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-indicator {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

@media (max-width: 920px) {
  .signal-strip,
  .thread-card {
    grid-template-columns: 1fr;
  }

  .thread-rank {
    width: 48px;
    height: 48px;
  }

  .thread-entry {
    flex-direction: row;
    justify-content: flex-start;
  }
}


/* Dark Mode Overrides */
html.dark .forum-shell,
html.dark .thread-page {
  background: #0f172a;
  color: #e2e8f0;
}

html.dark .hero-panel,
html.dark .stat-card,
html.dark .signal-card,
html.dark .sidebar-card,
html.dark .forum-main,
html.dark .list-toolbar,
html.dark .signal-strip,
html.dark .thread-card,
html.dark .state-card,
html.dark .error-message,
html.dark .thread-main,
html.dark .side-card,
html.dark .floor-card,
html.dark .comment-form,
html.dark .modal-content {
  background: #1e293b;
  border-color: #334155;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

html.dark .hero-title,
html.dark .stat-value,
html.dark .signal-title,
html.dark .sidebar-card-header h3,
html.dark .user-pill p,
html.dark .toolbar-title,
html.dark .thread-title,
html.dark .signal-item strong,
html.dark .headline-title,
html.dark .side-card-header h3,
html.dark .side-stat-grid strong,
html.dark .author-name,
html.dark .heading-group h3,
html.dark .quote-preview strong {
  color: #f8fafc;
}

html.dark .hero-desc,
html.dark .bullet-list li,
html.dark .thread-excerpt,
html.dark .comment-content,
html.dark .switch-item span {
  color: #cbd5e1;
}

html.dark .stat-label,
html.dark .sidebar-card-header span,
html.dark .signal-meta,
html.dark .user-pill span,
html.dark .mood-note,
html.dark .toolbar-meta,
html.dark .signal-label,
html.dark .thread-author span,
html.dark .headline-meta,
html.dark .filter-note,
html.dark .side-card-header span,
html.dark .side-stat-grid span,
html.dark .floor-meta,
html.dark .floor-stats,
html.dark .quote-box p,
html.dark .meta-field span,
html.dark .quote-preview p,
html.dark .composer-tip {
  color: #94a3b8;
}

html.dark .secondary-btn,
html.dark .hero-tag,
html.dark .shortcut-item,
html.dark .mood-chip,
html.dark .search-input,
html.dark .sort-select select,
html.dark .category-tab,
html.dark .page-btn,
html.dark .nav-btn,
html.dark .admin-btn,
html.dark .floor-mark,
html.dark .author-badge,
html.dark .quote-box,
html.dark .action-btn,
html.dark .close-btn,
html.dark .meta-select,
html.dark .meta-input,
html.dark .title-input,
html.dark .quote-preview,
html.dark .cancel-btn {
  background: #334155;
  border-color: #475569;
  color: #e2e8f0;
}

html.dark .secondary-btn:hover,
html.dark .shortcut-item:hover,
html.dark .page-btn:hover:not(:disabled),
html.dark .nav-btn:hover,
html.dark .admin-btn:hover,
html.dark .action-btn:hover,
html.dark .close-btn:hover,
html.dark .cancel-btn:hover {
  background: #475569;
}

html.dark .search-input:focus,
html.dark .meta-select:focus,
html.dark .meta-input:focus,
html.dark .title-input:focus {
  background: #1e293b;
  border-color: #3b82f6;
  color: #f8fafc;
}

html.dark .shortcut-item.active,
html.dark .view-tab.active,
html.dark .category-tab.active {
  background: #1e3a8a;
  color: #60a5fa;
  border-color: #1e3a8a;
}

html.dark .thread-type,
html.dark .enter-btn {
  background: #1e3a8a;
  color: #60a5fa;
}

html.dark .enter-btn:hover {
  background: #1e40af;
}

html.dark .thread-badge.hot,
html.dark .thread-badge.pin {
  background: #7c2d12;
  color: #fdba74;
}

html.dark .thread-badge.featured {
  background: #14532d;
  color: #86efac;
}

html.dark .thread-badge.plain {
  background: #334155;
  color: #cbd5e1;
}

html.dark .admin-btn.active {
  background: #854d0e;
  color: #fef08a;
  border-color: #854d0e;
}

html.dark .like-btn.liked {
  background: #7f1d1d;
  color: #fca5a5;
}

html.dark .delete-btn,
html.dark .danger-btn {
  background: #7f1d1d;
  color: #fca5a5;
}

html.dark .delete-btn:hover,
html.dark .danger-btn:hover {
  background: #991b1b;
}

html.dark .modal-footer,
html.dark .form-footer,
html.dark .thread-headline,
html.dark .thread-footer {
  border-color: #334155;
}

html.dark .modal-footer,
html.dark .form-header,
html.dark .modal-body {
  background: transparent;
}

</style>
