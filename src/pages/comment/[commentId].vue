<template>
  <div class="thread-page">
    <div class="thread-page-layout">
      <main class="thread-main">
        <div class="thread-toolbar">
          <button class="nav-btn" @click="goBack">返回讨论区</button>
          <button v-if="!showCommentForm" class="reply-btn" @click="showCommentForm = true">
            参与讨论
          </button>
        </div>

        <section class="thread-headline">
          <span class="headline-kicker">Thread View</span>
          <div class="headline-chip-row">
            <span v-if="mainComment?.isPinned" class="headline-chip pin">置顶</span>
            <span v-if="mainComment?.isFeatured" class="headline-chip featured">精华</span>
            <span class="headline-chip">{{ mainComment?.category || '综合讨论' }}</span>
            <span v-for="tag in mainComment?.tags || []" :key="tag" class="headline-chip subtle"># {{ tag }}</span>
          </div>
          <h1 class="headline-title">{{ mainComment?.title || '主题详情' }}</h1>
          <p class="headline-meta">
            {{ mainComment?.user?.username || '开发者' }} 发起，
            {{ mainComment?.replyCount || 0 }} 条回复，
            {{ mainComment?.likeCount || 0 }} 个赞同
          </p>
        </section>

        <div class="thread-switches">
          <label class="filter-pill">
            <input v-model="onlyAuthorReplies" type="checkbox">
            <span>只看题主</span>
          </label>
          <span class="filter-note">开启后仅显示题主在讨论中的回复内容</span>

          <!-- 管理员操作区 -->
          <div v-if="isAdmin" class="admin-actions">
            <button class="admin-btn" :class="{ active: mainComment?.isPinned }" @click="togglePin">
              {{ mainComment?.isPinned ? '取消置顶' : '设为置顶' }}
            </button>
            <button class="admin-btn" :class="{ active: mainComment?.isFeatured }" @click="toggleFeature">
              {{ mainComment?.isFeatured ? '取消精华' : '设为精华' }}
            </button>
          </div>
        </div>

        <CommentForm
          v-if="showCommentForm"
          :is-modal="true"
          @submitted="handleCommentSubmitted"
          @cancelled="handleCancelComment"
        />

        <CommentItem
          v-else-if="mainComment"
          :comment="{ ...mainComment, replies: visibleReplies }"
          :current-user-id="currentUserId"
          :current-user-role="currentUserRole"
          :thread-author-id="mainComment.userId"
          :show-replies="true"
          :full-content="true"
          @delete="handleDeleteComment"
          @like="handleLikeComment"
          @update="refreshDetail"
        />
      </main>

      <aside class="thread-sidebar">
        <section class="side-card">
          <div class="side-card-header">
            <h3>主题信息</h3>
            <span>Live</span>
          </div>
          <div class="side-stat-grid">
            <div>
              <strong>{{ mainComment?.likeCount || 0 }}</strong>
              <span>赞同</span>
            </div>
            <div>
              <strong>{{ mainComment?.replyCount || 0 }}</strong>
              <span>回复</span>
            </div>
            <div>
              <strong>{{ visibleReplies.length }}</strong>
              <span>可见内容</span>
            </div>
          </div>
        </section>

        <section class="side-card">
          <div class="side-card-header">
            <h3>阅读提示</h3>
            <span>Tips</span>
          </div>
          <ul class="tip-list">
            <li>主帖为核心问题或见解，下方为开发者的交流与解答。</li>
            <li>题主和管理员会有专属标识，方便识别官方人员与问题发起人。</li>
            <li>如果针对某一条回复有补充或疑问，建议直接点击“引用回复”。</li>
          </ul>
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { getCommentDetail, toggleLike } from '~/api/commentApi';
import { useUserStore } from '~/store/user';
import CommentForm from './CommentForm.vue';
import CommentItem from './CommentItem.vue';

const route = useRoute();
const router = useRouter();
const mainComment = ref<any | null>(null);
const showCommentForm = ref(false);
const onlyAuthorReplies = ref(false);
const userStore = useUserStore();

const currentUserId = computed(() => {
  const userInfo = userStore.getUserInfo;
  return userInfo && 'userId' in userInfo ? parseInt(userInfo.userId) : 0;
});

const currentUserRole = computed(() => {
  const userInfo = userStore.getUserInfo;
  return userInfo && 'role' in userInfo ? String(userInfo.role) : '';
});

const isAdmin = computed(() => currentUserRole.value.toUpperCase() === 'ADMIN');

const visibleReplies = computed(() => {
  if (!mainComment.value?.replies) {
    return [];
  }
  if (!onlyAuthorReplies.value) {
    return mainComment.value.replies;
  }
  return mainComment.value.replies.filter((reply: any) => reply.userId === mainComment.value.userId);
});

onMounted(async () => {
  await refreshDetail();
});

async function refreshDetail() {
  const commentId = Number(route.params.commentId);
  mainComment.value = await getCommentDetail(commentId);
}

async function handleCommentSubmitted() {
  showCommentForm.value = false;
  await refreshDetail();
}

function handleCancelComment() {
  showCommentForm.value = false;
}

async function handleDeleteComment(commentId: number) {
  const { deleteComment } = await import('~/api/commentApi');
  await deleteComment(commentId);
  await refreshDetail();
  message.success('删除成功');
}

async function handleLikeComment(commentId: number) {
  await toggleLike(commentId);
  await refreshDetail();
}

async function togglePin() {
  if (!mainComment.value) return;
  const { updateComment } = await import('~/api/commentApi');
  await updateComment(mainComment.value.id, { isPinned: !mainComment.value.isPinned });
  await refreshDetail();
  message.success(mainComment.value.isPinned ? '已取消置顶' : '已置顶');
}

async function toggleFeature() {
  if (!mainComment.value) return;
  const { updateComment } = await import('~/api/commentApi');
  await updateComment(mainComment.value.id, { isFeatured: !mainComment.value.isFeatured });
  await refreshDetail();
  message.success(mainComment.value.isFeatured ? '已取消精华' : '已加精');
}

function goBack() {
  router.push('/comment');
}
</script>

<style scoped>
.thread-page {
  color: #334155;
  background: #f8fafc;
  min-height: 100vh;
  padding: 24px;
}

.thread-page-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.thread-main,
.side-card {
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.thread-main {
  padding: 22px;
}

.thread-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.nav-btn,
.reply-btn {
  min-height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}

.nav-btn {
  color: #475569;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
}

.nav-btn:hover {
  background: #f1f5f9;
}

.reply-btn {
  color: #fff;
  border: 1px solid transparent;
  background: #2563eb;
}

.reply-btn:hover {
  background: #1d4ed8;
}

.thread-headline {
  margin: 18px 0 22px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.headline-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.headline-chip {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #dfe9ff;
  background: rgba(59, 130, 246, 0.16);
}

.headline-chip.pin {
  color: #ffe5bc;
  background: rgba(249, 115, 22, 0.16);
}

.headline-chip.featured {
  color: #d9fbe9;
  background: rgba(16, 185, 129, 0.16);
}

.headline-chip.subtle {
  color: rgba(214, 224, 246, 0.72);
  background: rgba(255, 255, 255, 0.05);
}

.headline-kicker {
  display: inline-flex;
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #91b8ff;
  background: rgba(46, 93, 214, 0.16);
}

.headline-title {
  margin: 14px 0 10px;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.3;
  color: #0f172a;
}

.headline-meta {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

.thread-switches {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  color: rgba(224, 232, 248, 0.78);
  background: rgba(255, 255, 255, 0.05);
}

.filter-pill input:checked + span {
  color: #fff;
  background: #3b82f6;
  border-color: #3b82f6;
}

.filter-note {
  font-size: 12px;
  color: #64748b;
}

.admin-actions {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

.admin-btn {
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: transparent;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-btn:hover {
  background: #f1f5f9;
}

.admin-btn.active {
  background: #fef9c3;
  border-color: #fde047;
  color: #a16207;
}

.thread-sidebar {
  display: grid;
  gap: 16px;
  align-content: start;
}

.side-card {
  padding: 20px;
}

.side-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.side-card-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
}

.side-card-header span {
  font-size: 12px;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
}

.side-stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.side-stat-grid div {
  padding: 12px;
  border-radius: 12px;
  background: #f8fafc;
  text-align: center;
}

.side-stat-grid strong,
.side-stat-grid span {
  display: block;
}

.side-stat-grid strong {
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
}

.side-stat-grid span {
  font-size: 11px;
  color: #64748b;
}

.tip-list {
  font-size: 12px;
  color: #64748b;
  margin: 14px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 10px;
  line-height: 1.7;
}

@media (max-width: 1120px) {
  .thread-page-layout {
    grid-template-columns: 1fr;
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
