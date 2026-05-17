<template>
  <div class="winner-list-container">
    <div class="winner-list">
      <div class="winner-item" v-for="winner in winners" :key="winner.id" :class="getAwardClass(winner.award)">
        <div class="winner-avatar">
          <img :src="getImageUrl(winner.avatar)" :alt="winner.name">
          <div class="award-badge" :class="getAwardClass(winner.award)">
            {{ winner.award }}
          </div>
        </div>
        <div class="winner-info">
          <h4>{{ winner.name }}</h4>
          <p>{{ winner.competition }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'  // 添加onBeforeUnmount导入
import axios from 'axios'

const props = defineProps({
  winners: {
    type: Array,
    default: () => []
  }
})

const getImageUrl = (avatar) => {
  // 如果是完整的URL，直接返回
  if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
    return avatar;
  }
  // 否则从本地资源加载
  return new URL(`../assets/images/${avatar}`, import.meta.url).href;
}

const getAwardClass = (award) => {
  if (award.includes('金') || award.includes('一等')) return 'gold'
  if (award.includes('银') || award.includes('二等')) return 'silver'
  if (award.includes('铜') || award.includes('三等')) return 'bronze'
  return 'other'
}

const getSparkleStyle = (index) => {
  const delay = index * 0.2
  const size = Math.random() * 6 + 4
  return {
    '--delay': `${delay}s`,
    '--size': `${size}px`,
    'left': `${Math.random() * 100}%`,
    'top': `${Math.random() * 100}%`
  }
}

const sparkleTimer = ref(null)  // 添加定时器引用

onBeforeUnmount(() => {
  // 确保清理所有定时器和异步操作
  if (sparkleTimer.value) {
    clearInterval(sparkleTimer.value)
  }
})
</script>



<style scoped>
.winner-list-container {
  width: 70%;
  margin: 0 auto;
  overflow-x: auto;
  white-space: nowrap;
  padding: 1rem 0;
  scrollbar-color: rgba(0,0,0,0.3) rgba(255,255,255,0.3);
}

.winner-list-container::-webkit-scrollbar {
  height: 8px;
}

.winner-list-container::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.3);
  border-radius: 4px;
}

.winner-list-container::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.1);
}

.winner-list {
  display: inline-flex;
  gap: 1.5rem;
  padding: 0 1rem;
  min-width: 100%;
}

.winner-item {
  min-width: 200px;
  padding: 1rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.winner-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.winner-item.gold {
  border-left: 4px solid #FFD700;
  background: rgba(255, 215, 0, 0.05);
}

.winner-item.silver {
  border-left: 4px solid #C0C0C0;
  background: rgba(192, 192, 192, 0.05);
}

.winner-item.bronze {
  border-left: 4px solid #CD7F32;
  background: rgba(205, 127, 50, 0.05);
}

.winner-item.other {
  border-left: 4px solid #4CAF50;
  background: rgba(76, 175, 80, 0.05);
}

.winner-rank {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 1.5rem;
  min-width: 30px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

.winner-item.gold .winner-rank {
  color: #FFD700;
}

.winner-item.silver .winner-rank {
  color: #C0C0C0;
}

.winner-item.bronze .winner-rank {
  color: #CD7F32;
}

.winner-avatar {
  position: relative;
  margin-right: 1.5rem;
}

.winner-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.1);
}

.winner-item.gold .winner-avatar img {
  border-color: rgba(255, 215, 0, 0.3);
}

.winner-item.silver .winner-avatar img {
  border-color: rgba(192, 192, 192, 0.3);
}

.winner-item.bronze .winner-avatar img {
  border-color: rgba(205, 127, 50, 0.3);
}

.award-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: bold;
}

.award-badge.gold {
  background: #FFD700;
  color: #333;
}

.award-badge.silver {
  background: #C0C0C0;
  color: #333;
}

.award-badge.bronze {
  background: #CD7F32;
  color: white;
}

.award-badge.other {
  background: #4CAF50;
  color: white;
}

.winner-info h4 {
  margin: 0 0 0.3rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.98);
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  letter-spacing: 0.8px;
}

.winner-info p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.winner-item.gold .winner-info p {
  color: #FFEEB5;
}

.winner-item.silver .winner-info p {
  color: #E6E6E6;
}

.winner-item.bronze .winner-info p {
  color: #FFD8A8;
}

.winner-item.other .winner-info p {
  color: #C8F7C5;
}

.winner-item.gold .winner-info h4 {
  color: #FFF8C9;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.winner-item.silver .winner-info h4 {
  color: #FFFFFF;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.winner-item.bronze .winner-info h4 {
  color: #FFE8B0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.winner-item.other .winner-info h4 {
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.winner-item.other .winner-info p {
  color: rgba(255, 255, 255, 0.85);
}

.winner-sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: sparkle 2s infinite;
  animation-delay: var(--delay);
  width: var(--size);
  height: var(--size);
}

.winner-item.gold .sparkle {
  background: #FFD700;
}

.winner-item.silver .sparkle {
  background: #C0C0C0;
}

.winner-item.bronze .sparkle {
  background: #CD7F32;
}

@keyframes sparkle {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}
</style>
