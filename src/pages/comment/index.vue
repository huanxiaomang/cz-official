<template>
  <div class="forum-shell">
    <div class="forum-layout">
      <section class="hero-panel">
        <div class="hero-copy">
          <span class="hero-kicker">CZ Developer Forum</span>
          <h1 class="hero-title">技术交流与问题求助社区</h1>
          <p class="hero-desc">
            分享技术见解、讨论架构设计、解决开发难题。在这里，每一次提问与解答都将沉淀为社区的宝贵财富。
          </p>
          <div class="hero-actions">
            <button class="primary-btn" @click="showCommentForm = !showCommentForm">
              {{ showCommentForm ? '收起编辑器' : '发布新主题' }}
            </button>
            <button class="secondary-btn" @click="scrollToList">
              浏览全部讨论
            </button>
          </div>
          <div class="hero-tags">
            <span class="hero-tag">技术问答</span>
            <span class="hero-tag">经验分享</span>
            <span class="hero-tag">开源项目</span>
            <span class="hero-tag">架构设计</span>
          </div>
        </div>
        <div class="hero-rail">
          <div class="hero-stats">
            <div class="stat-card">
              <span class="stat-label">讨论主题</span>
              <strong class="stat-value">{{ summary.topicCount }}</strong>
              <span class="stat-note">已沉淀的技术话题</span>
            </div>
            <div class="stat-card accent">
              <span class="stat-label">回复与解答</span>
              <strong class="stat-value">{{ summary.replyCount }}</strong>
              <span class="stat-note">社区开发者的互助记录</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">参与开发者</span>
              <strong class="stat-value">{{ summary.memberCount }}</strong>
              <span class="stat-note">贡献过代码或见解的成员</span>
            </div>
          </div>
          <div class="signal-card">
            <div class="signal-header">
              <span>近期热议</span>
              <span class="signal-badge">TRENDING</span>
            </div>
            <p class="signal-title">{{ headlineTopic?.title || '暂无热门讨论，欢迎发布你的技术见解。' }}</p>
            <p class="signal-meta">
              <template v-if="headlineTopic">
                {{ headlineTopic.user?.username || '开发者' }} 发起，{{ headlineTopic.likeCount }} 赞同，{{ headlineTopic.replyCount }} 回复
              </template>
              <template v-else>
                社区高活跃度的主题将展示在这里。
              </template>
            </p>
          </div>
        </div>
      </section>

      <div class="forum-grid">
        <main class="forum-main" ref="listAnchor">
          <CommentForm
            v-if="showCommentForm"
            :is-modal="true"
            @submitted="handleCommentSubmitted"
            @cancelled="handleCancelComment"
          />
          <CommentSection />
        </main>

        <aside class="forum-sidebar">
          <section class="sidebar-card shortcut-card">
            <div class="sidebar-card-header">
              <h3>快速导航</h3>
              <span>Navigation</span>
            </div>
            <button class="shortcut-item active">
              <span class="shortcut-dot blue"></span>
              全部讨论流
            </button>
            <button class="shortcut-item">
              <span class="shortcut-dot orange"></span>
              技术问答区
            </button>
            <button class="shortcut-item">
              <span class="shortcut-dot green"></span>
              开源项目区
            </button>
            <button class="shortcut-item">
              <span class="shortcut-dot purple"></span>
              意见与反馈
            </button>
          </section>

          <section class="sidebar-card notice-card">
            <div class="sidebar-card-header">
              <h3>发帖规范</h3>
              <span>Rules</span>
            </div>
            <ul class="bullet-list">
              <li>提问前请先搜索是否已有类似问题。</li>
              <li>请在标题中简明扼要地描述核心问题。</li>
              <li>求助时建议附上复现代码、错误日志或截图。</li>
              <li>保持友善、专业的技术交流氛围。</li>
            </ul>
          </section>

          <section class="sidebar-card">
            <div class="sidebar-card-header">
              <h3>活跃开发者</h3>
              <span>{{ activeUsers.length }}</span>
            </div>
            <div class="user-stack">
              <div v-for="user in activeUsers" :key="user.name" class="user-pill">
                <img :src="user.avatar || defaultAvatar" :alt="user.name" />
                <div>
                  <p>{{ user.name }}</p>
                  <span>{{ user.count }} 次贡献</span>
                </div>
              </div>
            </div>
          </section>

          <section class="sidebar-card">
            <div class="sidebar-card-header">
              <h3>讨论分布</h3>
              <span>Stats</span>
            </div>
            <div class="mood-grid">
              <div class="mood-chip">问题求助</div>
              <div class="mood-chip">技术分享</div>
              <div class="mood-chip">项目展示</div>
              <div class="mood-chip">平台反馈</div>
            </div>
            <p class="mood-note">参与技术讨论，共同建设更专业的开发者社区。</p>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import defaultAvatar from '~/assets/icon/default-avatar.png';
import { useCommentStore } from '~/store/commentStore';
import CommentForm from './CommentForm.vue';
import CommentSection from './CommentSection.vue';

const showCommentForm = ref(false);
const listAnchor = ref<HTMLElement | null>(null);
const commentStore = useCommentStore();
const { comments } = storeToRefs(commentStore);

const summary = computed(() => {
  const topicCount = comments.value.length;
  const replyCount = comments.value.reduce((sum, comment) => sum + (comment.replyCount || 0), 0);
  const memberIds = new Set<number>();
  comments.value.forEach((comment) => {
    if (comment.user?.userId)
      memberIds.add(comment.user.userId);
    comment.replies?.forEach(reply => reply.user?.userId && memberIds.add(reply.user.userId));
  });
  return {
    topicCount,
    replyCount,
    memberCount: memberIds.size,
  };
});

const headlineTopic = computed(() => {
  return [...comments.value]
    .sort((a, b) => (b.likeCount + b.replyCount * 2) - (a.likeCount + a.replyCount * 2))[0];
});

const activeUsers = computed(() => {
  const bucket = new Map<string, { name: string; avatar?: string; count: number }>();
  comments.value.forEach((comment) => {
    const key = String(comment.user?.userId || comment.userId || comment.id);
    const current = bucket.get(key) || {
      name: comment.user?.username || '匿名吧友',
      avatar: comment.user?.avatar,
      count: 0,
    };
    current.count += 1;
    bucket.set(key, current);

    comment.replies?.forEach((reply) => {
      const replyKey = String(reply.user?.userId || reply.userId || reply.id);
      const replyCurrent = bucket.get(replyKey) || {
        name: reply.user?.username || '匿名吧友',
        avatar: reply.user?.avatar,
        count: 0,
      };
      replyCurrent.count += 1;
      bucket.set(replyKey, replyCurrent);
    });
  });

  return [...bucket.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
});

onMounted(async () => {
  await commentStore.loadComments({ page: 1 });
});

function handleCommentSubmitted() {
  showCommentForm.value = false;
  commentStore.loadComments({ page: 1 });
}

function handleCancelComment() {
  showCommentForm.value = false;
}

function scrollToList() {
  listAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<style scoped>
.forum-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: #334155;
  background: #f8fafc;
}

.forum-noise {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.25;
  pointer-events: none;
}

.forum-layout {
  position: relative;
  z-index: 1;
  max-width: 1380px;
  margin: 0 auto;
  padding: 32px 24px 56px;
}

.hero-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(320px, 0.95fr);
  gap: 24px;
  margin-bottom: 28px;
  padding: 32px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.hero-kicker {
  display: inline-block;
  font-size: 13px;
  font-weight: 800;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.hero-title {
  margin: 16px 0;
  font-size: 38px;
  line-height: 1.15;
  font-weight: 900;
  color: #0f172a;
}

.hero-desc {
  font-size: 16px;
  line-height: 1.6;
  color: #475569;
  max-width: 480px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.primary-btn,
.secondary-btn {
  min-height: 46px;
  padding: 0 18px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.primary-btn {
  background: #2563eb;
  color: #ffffff;
  border: 1px solid transparent;
}

.secondary-btn {
  background: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1;
}

.primary-btn:hover,
.secondary-btn:hover {
  transform: translateY(-1px);
}

.primary-btn:hover {
  background: #1d4ed8;
}

.secondary-btn:hover {
  background: #e2e8f0;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.hero-tag {
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  color: #475569;
  background: #f1f5f9;
}

.hero-rail {
  display: grid;
  gap: 18px;
}

.hero-stats {
  display: grid;
  gap: 14px;
}

.stat-card,
.signal-card,
.sidebar-card,
.forum-main {
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.stat-card {
  display: grid;
  gap: 6px;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.stat-label {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
}

.stat-value {
  font-size: 40px;
  font-weight: 900;
  line-height: 1;
  color: #0f172a;
}

.stat-note {
  font-size: 12px;
  color: #94a3b8;
}

.signal-card {
  padding: 20px;
  border-radius: 22px;
}

.signal-header,
.sidebar-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.signal-header span:last-child,
.sidebar-card-header span {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #3b82f6;
}

.signal-title {
  margin: 14px 0 8px;
  font-size: 19px;
  line-height: 1.45;
  font-weight: 700;
  color: #0f172a;
}

.signal-meta {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: #64748b;
}

.forum-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: start;
}

.forum-main {
  min-width: 0;
  padding: 24px;
  border-radius: 28px;
}

.forum-sidebar {
  display: grid;
  gap: 16px;
}

.sidebar-card {
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.sidebar-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.sidebar-card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
}

.sidebar-card-header span {
  font-size: 12px;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
}

.shortcut-card {
  display: grid;
  gap: 10px;
}

.shortcut-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: #f8fafc;
  color: #334155;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.shortcut-item:hover {
  background: #f1f5f9;
}

.shortcut-item.active {
  border-color: #bfdbfe;
  background: #eff6ff;
  color: #2563eb;
}

.shortcut-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.shortcut-dot.blue { background: #60a5fa; }
.shortcut-dot.orange { background: #fb923c; }
.shortcut-dot.green { background: #34d399; }
.shortcut-dot.purple { background: #a78bfa; }

.bullet-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

.bullet-list li {
  position: relative;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.6;
  color: #475569;
}

.bullet-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3b82f6;
}

.user-stack {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-pill img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
}

.user-pill p {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
}

.user-pill span {
  font-size: 11px;
  color: #64748b;
}

.mood-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 16px;
}

.mood-chip {
  padding: 8px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  border-radius: 8px;
  background: #f1f5f9;
  color: #475569;
}

.mood-note {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: #64748b;
}

@media (max-width: 1180px) {
  .hero-panel,
  .forum-grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    max-width: none;
  }
}

@media (max-width: 768px) {
  .forum-layout {
    padding: 18px 14px 40px;
  }

  .hero-panel,
  .forum-main {
    padding: 18px;
    border-radius: 22px;
  }

  .hero-title {
    font-size: 2.4rem;
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
