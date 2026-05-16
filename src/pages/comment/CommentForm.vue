<template>
  <div>
    <div v-if="showModal" class="comment-form-modal-mask" @click="cancelReply"></div>
    <div v-if="showModal" class="comment-form-modal">
      <div class="modal-content">
        <div class="modal-header">
          <div class="heading-group">
            <span class="eyebrow">{{ isReply ? 'Reply' : 'New Topic' }}</span>
            <h3>{{ isReply ? '添加回复' : '发起技术讨论' }}</h3>
          </div>
          <button class="close-btn" @click="cancelReply">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="isReply && (props.replyToUser || quotePreviewText)" class="quote-preview">
            <span class="quote-label">引用</span>
            <strong>{{ props.replyToUser || '该楼层' }}</strong>
            <p>{{ quotePreviewText }}</p>
          </div>
          <div v-if="!isReply" class="meta-grid">
            <label class="meta-field">
              <span>分类</span>
              <select v-model="discussionCategory" class="meta-select">
                <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
              </select>
            </label>
            <label class="meta-field">
              <span>标签</span>
              <input
                v-model.trim="tagInput"
                class="meta-input"
                maxlength="50"
                placeholder="例如：Vue, 架构, 报错信息"
              />
            </label>
          </div>
          <div v-if="!isReply && isAdmin" class="switch-row">
            <label class="switch-item">
              <input v-model="isPinned" type="checkbox">
              <span>置顶</span>
            </label>
            <label class="switch-item">
              <input v-model="isFeatured" type="checkbox">
              <span>精华</span>
            </label>
          </div>
          <input
            v-if="!isReply"
            v-model.trim="discussionTitle"
            class="title-input"
            maxlength="120"
            placeholder="用一句话简明扼要地描述你的主题"
          />
          <div class="composer-tip-row">
            <span class="composer-tip">{{ isReply ? '友好交流，理性探讨。' : '建议提供充分的上下文信息或复现步骤。' }}</span>
          </div>
          <TextEditor v-model="commentContent" :placeholder="placeholder" class="editor-input" />
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="cancelReply">取消</button>
          <button class="submit-btn" :disabled="isSubmitting" @click="submitComment">
            {{ isSubmitting ? '提交中...' : '提交' }}
          </button>
        </div>
      </div>
    </div>
    <div v-else class="comment-form">
      <div class="form-header">
        <div class="heading-group">
          <span class="eyebrow">{{ isReply ? 'Reply' : 'New Topic' }}</span>
          <h3>{{ isReply ? '添加回复' : '发起技术讨论' }}</h3>
        </div>
        <button @click="cancelReply" class="cancel-btn">取消</button>
      </div>

      <div class="form-content">
        <div v-if="isReply && (props.replyToUser || quotePreviewText)" class="quote-preview">
          <span class="quote-label">引用</span>
          <strong>{{ props.replyToUser || '该楼层' }}</strong>
          <p>{{ quotePreviewText }}</p>
        </div>
        <div v-if="!isReply" class="meta-grid">
          <label class="meta-field">
            <span>分类</span>
            <select v-model="discussionCategory" class="meta-select">
              <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
            </select>
          </label>
          <label class="meta-field">
            <span>标签</span>
            <input
              v-model.trim="tagInput"
              class="meta-input"
              maxlength="50"
              placeholder="例如：Vue, 架构, 报错信息"
            />
          </label>
        </div>
        <div v-if="!isReply && isAdmin" class="switch-row">
          <label class="switch-item">
            <input v-model="isPinned" type="checkbox">
            <span>置顶</span>
          </label>
          <label class="switch-item">
            <input v-model="isFeatured" type="checkbox">
            <span>精华</span>
          </label>
        </div>
        <input
          v-if="!isReply"
          v-model.trim="discussionTitle"
          class="title-input"
          maxlength="120"
          placeholder="用一句话简明扼要地描述你的主题"
        />
        <div class="composer-tip-row">
          <span class="composer-tip">{{ isReply ? '友好交流，理性探讨。' : '建议提供充分的上下文信息或复现步骤。' }}</span>
        </div>
        <TextEditor v-model="commentContent" :placeholder="placeholder" class="editor-input" />
      </div>
      <div class="form-footer">
        <button class="cancel-btn" @click="cancelReply">取消</button>
        <button class="submit-btn" :disabled="isSubmitting" @click="submitComment">
          {{ isSubmitting ? '提交中...' : '提交' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useCommentStore } from '~/store/commentStore'
import { useUserStore } from '~/store/user'
import TextEditor from '~/views/TextEditor.vue'

const commentStore = useCommentStore()
const userStore = useUserStore()

const props = defineProps<{
  parentId?: number
  quoteId?: number
  replyToUser?: string
  quotePreview?: string
  isModal?: boolean
}>()

const emit = defineEmits<{
  submitted: [comment: any]
  cancelled: []
}>()

const discussionTitle = ref('')
const discussionCategory = ref('综合讨论')
const tagInput = ref('')
const commentContent = ref('')
const isPinned = ref(false)
const isFeatured = ref(false)
const isSubmitting = ref(false)
const categories = ['综合讨论', '技术求助', '赛事交流', '经验复盘', '资源分享']
const placeholder = computed(() => isReply.value
  ? '补充你的观点、追问或解决方案'
  : '展开描述背景、问题细节和你的观点，方便大家高效参与讨论')
const showModal = computed(() => !!props.isModal)

const isReply = computed(() => !!props.parentId)
const isAdmin = computed(() => (userStore.getUserInfo && 'role' in userStore.getUserInfo)
  ? String(userStore.getUserInfo.role).toUpperCase() === 'ADMIN'
  : false)
const quotePreviewText = computed(() => {
  const text = (props.quotePreview || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (!text) return ''
  return text.length > 60 ? `${text.slice(0, 60)}...` : text
})

const submitComment = async () => {
  if (!isReply.value && !discussionTitle.value.trim()) {
    message.warning('请先填写讨论标题')
    return
  }
  if (!commentContent.value.trim()) {
    message.warning(isReply.value ? '回复内容不能为空' : '讨论内容不能为空')
    return
  }

  const currentUser = userStore.getUserInfo
  if (!currentUser || !('userId' in currentUser)) {
    message.warning('请先登录')
    return
  }

  isSubmitting.value = true

  try {
    const tags = tagInput.value
      .split(/[，,]/)
      .map(tag => tag.trim())
      .filter(Boolean)
      .slice(0, 5)
    const newComment = await commentStore.submitComment({
      title: discussionTitle.value,
      category: isReply.value ? undefined : discussionCategory.value,
      tags: isReply.value ? undefined : tags,
      content: commentContent.value,
      parent_id: props.parentId,
      quote_id: props.quoteId,
      isPinned: isReply.value ? undefined : isPinned.value,
      isFeatured: isReply.value ? undefined : isFeatured.value,
    })
    discussionTitle.value = ''
    discussionCategory.value = '综合讨论'
    tagInput.value = ''
    commentContent.value = ''
    isPinned.value = false
    isFeatured.value = false
    emit('submitted', newComment)
  } catch (error) {
    message.error('提交失败，请重试')
  } finally {
    isSubmitting.value = false
  }
}

const cancelReply = () => {
  discussionTitle.value = ''
  discussionCategory.value = '综合讨论'
  tagInput.value = ''
  commentContent.value = ''
  isPinned.value = false
  isFeatured.value = false
  emit('cancelled')
}
</script>

<style scoped>
.comment-form-modal-mask {
  position: fixed;
  z-index: 1999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
}

.comment-form-modal {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* Let clicks pass through to mask */
}

.modal-content {
  pointer-events: auto;
  position: relative;
  width: 90%;
  max-width: 640px;
  max-height: 90vh;
  margin: auto;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(129, 150, 198, 0.12);
}

.heading-group {
  display: grid;
  gap: 6px;
}

.eyebrow {
  display: block;
  font-size: 11px;
  font-weight: 800;
  color: #3b82f6;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.heading-group h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f1f5f9;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.modal-body {
  padding: 20px;
  background: transparent;
  overflow-y: auto;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}

.meta-field {
  display: grid;
  gap: 8px;
}

.meta-field span {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
}

.meta-select,
.meta-input,
.title-input {
  width: 100%;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  background: #f8fafc;
  color: #0f172a;
  font-size: 14px;
  transition: all 0.2s;
}

.meta-select,
.meta-input {
  padding: 10px 14px;
}

.switch-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 14px;
}

.switch-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 14px;
  color: rgba(224, 232, 248, 0.78);
  background: rgba(255, 255, 255, 0.04);
}

.switch-item span {
  font-size: 13px;
  font-weight: 700;
  color: #334155;
}

.quote-preview {
  margin-bottom: 20px;
  padding: 12px 16px;
  border-left: 3px solid #cbd5e1;
  background: #f8fafc;
  border-radius: 0 8px 8px 0;
}

.quote-label {
  font-size: 11px;
  font-weight: 800;
  color: #3b82f6;
  text-transform: uppercase;
  margin-right: 8px;
}

.quote-preview strong {
  font-size: 12px;
  color: #0f172a;
}

.quote-preview p {
  margin: 6px 0 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

.title-input {
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}

.meta-select:focus,
.meta-input:focus,
.title-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: #ffffff;
}

.composer-tip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}

.composer-tip {
  font-size: 12px;
  color: #94a3b8;
}

.modal-footer {
  padding: 16px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}

/* Base Form styles */
.comment-form {
  padding: 24px;
  margin-top: 16px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

/* Shared Button Styles */
.cancel-btn {
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  background: #f1f5f9;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: #e2e8f0;
}

.submit-btn {
  padding: 10px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background: #2563eb;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background: #1d4ed8;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 720px) {
  .meta-grid {
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
