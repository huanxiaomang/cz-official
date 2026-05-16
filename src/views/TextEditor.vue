<template>
  <div class="editor-wrapper">
    <Toolbar class="editor-toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor class="editor-main" v-model="valueHtml"
      :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
  </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'

import { onBeforeUnmount, ref, shallowRef, watchEffect, watch } from 'vue'
// @ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

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

watchEffect(() => {
  valueHtml.value = props.modelValue || ''
})

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
      server: 'http://1.92.82.236:3000/api/upload/image',
      fieldName: 'file',
      maxFileSize: 2 * 1024 * 1024,
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
  height: 150px;
  overflow-y: auto;
  @apply bg-white dark:bg-gray-900;
}

/* WangEditor responsive overrides */
:deep(.w-e-text-container) {
  @apply text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900;
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
