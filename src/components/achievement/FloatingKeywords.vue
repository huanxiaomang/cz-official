<template>
  <TresGroup ref="groupRef">
    <TresGroup
      v-for="(kw, i) in KEYWORDS_DATA"
      :key="i"
      ref="keywordRefs"
    >
      <Html center transform sprite :distance-factor="12">
        <div
          :style="{
            color: kw.color,
            fontSize: `${kw.scale * 1.0}rem`,
            fontWeight: 'bold',
            opacity: opacities[i] ?? 0,
            textShadow: '0 0 10px rgba(56,189,248,0.3)',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.1s',
            fontFamily: '\'Helvetica Neue\', Helvetica, \'PingFang SC\', Arial, sans-serif',
            letterSpacing: '2px',
            filter: `blur(${opacities[i] < 0.4 ? '2px' : '0px'})`,
            pointerEvents: 'none'
          }"
        >
          {{ kw.text }}
        </div>
      </Html>
    </TresGroup>
  </TresGroup>
</template>
<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue'
import { Html } from '@tresjs/cientos'
import * as THREE from 'three'

const props = defineProps({
  scrollProgress: {
    type: Number,
    default: 0
  },
  introProgress: {
    type: Number,
    default: 1
  }
})

// 把关键字分布在一个圆环（轨道）上
const orbitRadius = 4.8;
const KEYWORDS_DATA = [
  { text: "算法之巅", angle: 0, y: 0.8, scale: 1.1, color: "#38BDF8" },
  { text: "极客精神", angle: Math.PI * 2 / 7 * 1, y: -0.5, scale: 0.9, color: "#38BDF8" },
  { text: "卓越代码", angle: Math.PI * 2 / 7 * 2, y: 1.5, scale: 1.0, color: "#38BDF8" },
  { text: "创新突破", angle: Math.PI * 2 / 7 * 3, y: -1.2, scale: 0.8, color: "#38BDF8" },
  { text: "技术先锋", angle: Math.PI * 2 / 7 * 4, y: 0.3, scale: 1.0, color: "#38BDF8" },
  { text: "开源贡献", angle: Math.PI * 2 / 7 * 5, y: 1.2, scale: 0.85, color: "#38BDF8" },
  { text: "最具潜力", angle: Math.PI * 2 / 7 * 6, y: -0.8, scale: 0.95, color: "#38BDF8" },
]

const groupRef = shallowRef(null)
const keywordRefs = ref<any[]>([])
const opacities = ref<number[]>(new Array(7).fill(0))

const vec3 = new THREE.Vector3()

import { useLoop } from '@tresjs/core'
const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (groupRef.value) {
    // 整体绕 Y 轴旋转
    groupRef.value.rotation.y = elapsed * 0.25
    groupRef.value.position.y = (1 - props.introProgress) * 0.6
  }

  const scrollFade = Math.max(0, 1 - props.scrollProgress * 8)

  if (keywordRefs.value && keywordRefs.value.length) {
    keywordRefs.value.forEach((kwGroup, i) => {
      if (kwGroup) {
        const data = KEYWORDS_DATA[i]
        // 设置在轨道上的固定位置，随父级一起旋转
        kwGroup.position.x = Math.cos(data.angle) * orbitRadius
        kwGroup.position.z = Math.sin(data.angle) * orbitRadius
        // 上下轻微浮动
        kwGroup.position.y = data.y + Math.sin(elapsed * 1.5 + i) * 0.25

        // 获取世界坐标来判断是在皇冠前面还是后面
        kwGroup.getWorldPosition(vec3)

        // Z 轴为正表示在靠近屏幕（前面），Z 轴为负表示在皇冠后面
        // 皇冠前面的透明度高，后面的透明度低甚至消失，形成立体遮挡感
        let depthOpacity = vec3.z > 0 ? 0.65 : 0.15;

        // 两侧边缘稍微过渡一下
        if (vec3.z > -1 && vec3.z < 1) {
          depthOpacity = 0.15 + ((vec3.z + 1) / 2) * 0.5;
        }

        opacities.value[i] = depthOpacity * scrollFade * props.introProgress
      }
    })
  }
})
</script>
