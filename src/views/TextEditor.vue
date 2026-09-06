<template>
  <div class="editor-wrapper">
    <Toolbar class="editor-toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor class="editor-main" v-model="valueHtml" style="height: 360px"
      :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" @customPaste="handleCustomPaste" />
  </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'

import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
// @ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { resolveApiUrl } from '@/utils/env'

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  mode: {
    type: String,
    default: "default"
  },
  placeholder: {
    type: String,
    default: "分享你的参赛经验、题目思路或赛事建议～"
  }
})

const emits = defineEmits(['update:modelValue'])

const editorRef = shallowRef()
const valueHtml = ref('')

// 外部 modelValue 变化时同步到编辑器：
// 父组件（CommentForm）在 onMounted 中回填编辑内容时，子编辑器已挂载完成，
// 这里显式 setHtml 以确保原文能正确回显，避免依赖组件内部 watch 的时序。
watch(
  () => props.modelValue,
  (val) => {
    valueHtml.value = val || ''
    const editor = editorRef.value
    if (editor && editor.getHtml() !== val) {
      editor.setHtml(val)
    }
  },
  { immediate: true }
)

watch(valueHtml, (newHtml) => {
  emits("update:modelValue", newHtml)
})

const toolbarConfig = {
  toolbarKeys: [
    'bold',
    'italic',
    'underline',
    '|',
    'uploadImage',
    'insertLink',
    '|',
    'codeBlock',
    'blockquote',
  ]
}

const editorConfig = {
  placeholder: props.placeholder,
  MENU_CONF: {
    uploadImage: {
      server: resolveApiUrl('upload/image'),
      fieldName: 'file',
      maxFileSize: 5 * 1024 * 1024,
      maxNumberOfFiles: 5,
      autoUpload: true,
      customInsert(res: any, insertFn: (url: string) => void) {
        const url = res.url || (res.result && res.result.url)
        if (url) insertFn(url)
      },
    },
  },
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor
  // 编辑模式回显：编辑器异步创建完成后再写入已有内容，避免时序导致原文丢失
  if (props.modelValue) {
    editor.setHtml(props.modelValue)
  }
}

// 粘贴时清除格式：外部复制的内容统一按纯文本插入，避免带入字体/字号/对齐等杂样式
const handleCustomPaste = (editor: any, event: ClipboardEvent, callback: (val?: any) => void) => {
  const text = event.clipboardData?.getData('text/plain') || ''
  if (text) {
    editor.insertText(text)
  }
  callback(false) // 返回 false 阻止 wangEditor 默认的 HTML 粘贴
}
</script>

<style scoped>
.editor-wrapper {
  @apply bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.editor-toolbar {
  @apply border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800;
}

.editor-main {
  min-height: 300px;
  overflow-y: auto;
  @apply bg-white dark:bg-gray-900;
}

/* WangEditor responsive overrides */
:deep(.w-e-text-container) {
  @apply text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900;
}
:deep(.w-e-text-container [data-slate-editor]) {
  text-align: left !important;
}
:deep(.w-e-text-container [data-slate-editor] p),
:deep(.w-e-text-container [data-slate-editor] div) {
  text-align: left !important;
}
:deep(.w-e-toolbar) {
  @apply bg-transparent border-none !important;
}
:deep(.w-e-bar-item button) {
  @apply text-gray-600 dark:text-gray-400 !important;
}
:deep(.w-e-bar-item button:hover) {
  @apply bg-gray-200 dark:bg-gray-700 !important;
}
</style>
