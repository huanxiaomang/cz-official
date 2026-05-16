<template>
  <article class="floor-card" :class="{ 'is-reply': isReplyComment, 'is-thread': !isReplyComment }">
    <div v-if="!showReplyForm" class="floor-layout">
      <aside class="floor-aside">
        <div class="floor-mark">{{ floorMark }}</div>
        <img :src="avatarUrl" class="avatar" :alt="comment.user?.username || '未知用户'">
        <span class="author-role" :class="{ admin: isAdmin, author: isThreadAuthor }">
          {{ roleLabel }}
        </span>
      </aside>

      <div class="floor-body">
        <div class="floor-header">
          <div class="floor-author-block">
            <div class="floor-author-line">
              <strong class="author-name">{{ comment.user?.username || '未知用户' }}</strong>
              <span v-if="comment.user?.badge" class="author-custom-badge">{{ comment.user.badge }}</span>
              <span class="author-level">Lv.{{ Math.floor((comment.user?.score || 0) / 100) + 1 }}</span>
              <span class="author-badge">{{ floorIdentity }}</span>
            </div>
            <div class="floor-meta">
              <span>{{ formatDate(comment.createdAt) }}</span>
              <span>{{ isReplyComment ? '参与回复' : '发起讨论' }}</span>
              <span>UID {{ comment.userId }}</span>
            </div>
          </div>
          <div class="floor-stats">
            <span>{{ comment.likeCount }} 赞同</span>
            <span>{{ comment.replyCount || comment.replies?.length || 0 }} 回复</span>
          </div>
        </div>

        <div v-if="comment.title && !isReplyComment" class="thread-title-row">
          <div class="thread-heading">
            <div class="thread-chip-row">
              <span v-if="comment.isPinned" class="thread-badge pin">置顶</span>
              <span v-if="comment.isFeatured" class="thread-badge featured">精华</span>
              <span class="thread-badge hot">{{ comment.category || '综合讨论' }}</span>
            </div>
            <h1 class="thread-title">{{ comment.title }}</h1>
          </div>
          <div class="thread-badges">
            <span v-for="tag in comment.tags || []" :key="tag" class="thread-badge plain"># {{ tag }}</span>
            <span v-if="comment.replyCount >= 5" class="thread-badge plain">高活跃</span>
          </div>
        </div>

        <div v-if="comment.quote" class="quote-box">
          <span class="quote-box-label">引用 {{ comment.quote.user?.username || `UID ${comment.quote.userId}` }} 的观点</span>
          <p>{{ quoteExcerpt }}</p>
        </div>

        <div
          class="comment-content"
          :class="{ teaser: !props.fullContent }"
          @click="handleContentClick"
        >
          <div v-html="safeContent"></div>
        </div>

        <div class="comment-actions">
          <button class="action-btn like-btn" :class="{ liked: isLiked }" @click="handleLike">
            <span>赞同</span>
            <strong>{{ comment.likeCount }}</strong>
          </button>
          <button class="action-btn reply-btn" @click="showReplyForm = true">
            {{ isReplyComment ? '引用回复' : '回复主题' }}
          </button>
          <button v-if="!isReplyComment && !props.fullContent" class="action-btn" @click="goToDetail">
            查看全文
          </button>
          <button v-if="canDelete" class="action-btn danger-btn" @click="handleDelete">
            删除
          </button>
        </div>

        <div v-if="props.showReplies && comment.replies && comment.replies.length > 0" class="reply-stack">
          <CommentItem
            v-for="(reply, index) in comment.replies"
            :key="reply.id"
            :comment="reply"
            :current-user-id="currentUserId"
            :current-user-role="currentUserRole"
            :thread-author-id="resolvedThreadAuthorId"
            :floor-label="`#${index + 2}`"
            :show-replies="true"
            @delete="emit('delete', $event)"
            @like="emit('like', $event)"
            @update="emit('update', $event)"
          />
        </div>
      </div>
    </div>

    <div v-else class="reply-composer">
      <CommentForm
        :parent-id="comment.id"
        :quote-id="comment.id"
        :reply-to-user="comment.user?.username || '开发者'"
        :quote-preview="plainContent"
        @submitted="handleReplySubmitted"
        @cancelled="handleReplyCancelled"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { MainComment } from '~/types/comment';
import { useRoute, useRouter } from 'vue-router';
import DOMPurify from 'dompurify';
import defaultAvatar from '~/assets/icon/default-avatar.png';
import CommentForm from './CommentForm.vue';

const props = defineProps<{
  comment: MainComment;
  currentUserId: number;
  currentUserRole?: string;
  threadAuthorId?: number;
  floorLabel?: string;
  showReplies?: boolean;
  fullContent?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update', comment: MainComment): void;
  (e: 'delete', commentId: number): void;
  (e: 'like', commentId: number): void;
}>();

const router = useRouter();
const route = useRoute();
const showReplyForm = ref(false);

const safeContent = computed(() => DOMPurify.sanitize(props.comment.content));
const plainContent = computed(() => props.comment.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
const quoteExcerpt = computed(() => {
  const text = (props.comment.quote?.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > 90 ? `${text.slice(0, 90)}...` : text;
});
const isReplyComment = computed(() => props.comment.parentId !== null && props.comment.parentId !== undefined);
const isAuthor = computed(() => props.comment.userId === props.currentUserId);
const isAdmin = computed(() => (props.currentUserRole || '').toUpperCase() === 'ADMIN');
const canDelete = computed(() => isAuthor.value || isAdmin.value);
const isLiked = computed(() => props.comment.likes?.some(like => like.userId === props.currentUserId));
const avatarUrl = computed(() => props.comment.user?.avatar || defaultAvatar);
const resolvedThreadAuthorId = computed(() => props.threadAuthorId || props.comment.userId);
const isThreadAuthor = computed(() => props.comment.userId === resolvedThreadAuthorId.value);
const floorMark = computed(() => props.floorLabel || '题主');
const floorIdentity = computed(() => {
  if (isAdmin.value)
    return '管理员';
  if (isThreadAuthor.value)
    return isReplyComment.value ? '题主补充' : '题主';
  return isReplyComment.value ? '参与者' : '发起人';
});
const roleLabel = computed(() => {
  if (isAdmin.value)
    return 'ADMIN';
  if (isThreadAuthor.value)
    return 'AUTHOR';
  return 'USER';
});

function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60)
    return '刚刚';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} 分钟前`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} 小时前`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} 天前`;

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function handleDelete() {
  if (!confirm('确定删除这层内容吗？')) {
    return;
  }
  emit('delete', props.comment.id);
}

function handleLike() {
  emit('like', props.comment.id);
}

function handleContentClick() {
  if (props.fullContent) {
    return;
  }
  goToDetail();
}

function goToDetail() {
  if (route.path === `/comment/${props.comment.id}`) {
    return;
  }
  router.push(`/comment/${props.comment.id}`);
}

function handleReplySubmitted() {
  showReplyForm.value = false;
  emit('update', props.comment);
}

function handleReplyCancelled() {
  showReplyForm.value = false;
}
</script>

<style scoped>
.floor-card {
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.floor-card.is-thread {
  border-radius: 26px;
}

.floor-card.is-reply {
  margin-top: 14px;
  border-radius: 20px;
}

.floor-layout {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 20px;
  padding: 20px;
}

.floor-aside {
  display: grid;
  align-content: start;
  justify-items: center;
  gap: 10px;
}

.floor-mark {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  color: #64748b;
  background: #f1f5f9;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
}

.author-role {
  min-width: 58px;
  padding: 5px 8px;
  border-radius: 999px;
  text-align: center;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: rgba(211, 221, 245, 0.66);
  background: rgba(255, 255, 255, 0.05);
}

.author-role.admin {
  color: #ffe1b1;
  background: rgba(249, 115, 22, 0.18);
}

.author-role.author {
  color: #dbe7ff;
  background: rgba(59, 130, 246, 0.18);
}

.floor-body {
  min-width: 0;
}

.floor-header,
.comment-actions,
.thread-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.floor-author-line {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-name {
  font-size: 15px;
  font-weight: 800;
  color: #0f172a;
}

.author-badge {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 800;
  color: #64748b;
  background: #f1f5f9;
}

.author-custom-badge {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 800;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.author-level {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 800;
  font-style: italic;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.floor-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #94a3b8;
}

.floor-stats {
  display: flex;
  gap: 14px;
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
}

.thread-title-row {
  margin-top: 16px;
  align-items: flex-start;
}

.thread-heading {
  display: grid;
  gap: 10px;
}

.thread-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.thread-title {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.4;
  color: #0f172a;
}

.thread-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.thread-badge {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.thread-badge.hot {
  color: #dfe9ff;
  background: rgba(59, 130, 246, 0.16);
}

.thread-badge.pin {
  color: #ffe5bc;
  background: rgba(249, 115, 22, 0.16);
}

.thread-badge.featured {
  color: #d9fbe9;
  background: rgba(16, 185, 129, 0.16);
}

.thread-badge.plain {
  color: rgba(210, 220, 243, 0.66);
  background: rgba(255, 255, 255, 0.06);
}

.comment-content {
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.6;
  color: #334155;
  word-wrap: break-word;
  word-break: break-word;
}

.quote-box {
  margin: 16px 0;
  padding: 12px 16px;
  border-left: 3px solid #cbd5e1;
  background: #f8fafc;
  border-radius: 0 8px 8px 0;
}

.quote-box-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 4px;
}

.quote-box p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #64748b;
}

.comment-content.teaser {
  max-height: 240px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.comment-content.teaser::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(transparent, #ffffff);
}

:deep(.comment-content p) {
  margin-bottom: 12px;
}

:deep(.comment-content p:last-child) {
  margin-bottom: 0;
}

:deep(.comment-content img) {
  max-width: 100%;
  border-radius: 14px;
  margin-top: 8px;
}

:deep(.comment-content a) {
  color: #8db3ff;
  text-decoration: underline;
}

:deep(.comment-content code) {
  padding: 2px 6px;
  border-radius: 8px;
  color: #dbe7ff;
  background: rgba(255, 255, 255, 0.08);
}

:deep(.comment-content pre) {
  padding: 14px;
  border-radius: 16px;
  overflow-x: auto;
  background: rgba(7, 12, 22, 0.72);
}

:deep(.comment-content blockquote) {
  padding: 12px 14px;
  border-radius: 14px;
  color: rgba(220, 228, 245, 0.76);
  background: rgba(255, 255, 255, 0.05);
}

.comment-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: #f1f5f9;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #e2e8f0;
}

.like-btn.liked {
  color: #ef4444;
  background: #fef2f2;
}

.danger-btn {
  color: #ef4444;
}

.danger-btn:hover {
  background: #fef2f2;
}

.reply-stack {
  display: grid;
  gap: 12px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid rgba(129, 150, 198, 0.12);
}

.reply-composer {
  padding: 18px;
}

@media (max-width: 768px) {
  .floor-layout {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .floor-aside {
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
  }

  .thread-title-row,
  .floor-header {
    flex-direction: column;
    align-items: flex-start;
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
