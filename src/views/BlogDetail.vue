<template>
  <div class="blog-container">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-spinner">
      <Spin />
    </div>

    <!-- 错误处理 -->
    <div v-if="error" class="error-message">
      {{ error.message || '加载失败，请检查网络连接' }}
      <button @click="retry" v-if="!loading">重试</button>
    </div>

    <!-- 正常内容 -->
    <template v-else-if="data">
      <h1>{{ data.title }}</h1>
      <div class="meta">
        <span>作者: {{ data.author }}</span>
        <time>发布日期: {{ formatDate(data.createTime) }}</time>
      </div>
      <article v-html="data.content"></article>
      
      <!-- 传递有效的 blogId，避免 NaN -->
      <CommentSection :blog-id="validBlogId" />
    </template>

    <!-- 路由参数无效提示 -->
    <div v-else-if="isRouteParamInvalid" class="error-message">
      博客 ID 无效，请检查链接是否正确
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Spin from '@/components/Spin.vue'
import CommentSection from '@/components/CommentSection.vue'
import { formatDate } from '@/utils/date'
import axios from 'axios'

// 路由参数处理
const route = useRoute()
const rawBlogId = ref(route.params.id) // 原始参数（字符串或 undefined）
const validBlogId = ref(0) // 有效数字 ID，默认 0
const isRouteParamInvalid = ref(false) // 参数是否无效

// 监听路由参数变化
watch(
  () => route.params.id,// 监听路由中的 id 参数

  (newId) => {
    rawBlogId.value = newId
    
    updateValidBlogId()
  },
  { immediate: true }
)

// 更新有效 ID
const updateValidBlogId = () => {
  const num = Number(rawBlogId.value)
  validBlogId.value = isNaN(num) ? 0 : num
  isRouteParamInvalid.value = isNaN(num) && rawBlogId.value !== undefined // 排除未传递参数的情况
}

// 数据状态
const loading = ref(false)
const error = ref(null)
const data = ref(null)

// 获取数据（添加参数有效性校验）
const fetchData = async () => {
  if (isRouteParamInvalid.value) return // 无效参数时不请求

  try {
    loading.value = true
    error.value = null
    // 使用 validBlogId 确保为数字
    const res = await axios.get(`/api/blogs/${validBlogId.value}`)
   // if (!res.ok) throw new Error(`HTTP 错误！状态码：${res.status}`)
    data.value = await res.json()
  } catch (err) {
     error.value = err.response?.data?.message || '请求失败，请重试'
  } finally {
    loading.value = false
  }
}

// 重试机制
const retry = () => {
  fetchData()
}

// 初始化加载
onMounted(fetchData)
</script>

<style scoped>
/* 可选：添加加载样式 */
.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 20px;
  color: #999;
}

.error-message {
  color: red;
  margin: 10px 0;
  text-align: center;
}
</style>