<template>
  <TresGroup ref="groupRef">
    <TresInstancedMesh ref="meshRef" :args="[null, null, count]" cast-shadow receive-shadow>
      <TresSphereGeometry :args="[0.03, 8, 8]" />
      <TresMeshStandardMaterial
        color="#1DA1F2"
        :roughness="0.15"
        :metalness="0.8"
        emissive="#1DA1F2"
        :emissive-intensity="1.4"
        :transparent="true"
        :opacity="Math.max(0, 1.0 - scatterProgress) * props.introProgress"
      />
    </TresInstancedMesh>
  </TresGroup>
</template>
<script setup lang="ts">
import { shallowRef, computed } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  count: { type: Number, default: 5000 },
  scrollProgress: { type: Number, default: 0 },
  introProgress: { type: Number, default: 1 }
})

const meshRef = shallowRef(null)
const groupRef = shallowRef(null)


const scatterProgress = computed(() => {
  // 当页面向下滑动超过一点点时，开始四散
  return THREE.MathUtils.clamp(props.scrollProgress * 5, 0, 1)
})

const particles = []
const peaks = 6
const peakHeight = 1.8
const baseRadius = 2.2
const flare = 0.8

for (let i = 0; i < props.count; i++) {
  const theta = Math.random() * Math.PI * 2
  let yNorm = Math.random()
  if (Math.random() > 0.5) yNorm = Math.pow(yNorm, 0.5)
  else yNorm = Math.pow(yNorm, 2.0)

  const radius = baseRadius + flare * yNorm
  const wave = (Math.sin(theta * peaks) + 1) / 2
  const sharpWave = Math.pow(wave, 1.5)
  const maxH = 1.0 + peakHeight * sharpWave
  const yA = yNorm * maxH - 1.5

  const scatterDir = new THREE.Vector3(
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2
  ).normalize()

  const jitter = 0.05
  particles.push({
    theta, radius, yA,
    jitterX: (Math.random() - 0.5) * jitter,
    jitterY: (Math.random() - 0.5) * jitter,
    jitterZ: (Math.random() - 0.5) * jitter,
    speed: Math.random() * 2 + 1,
    offset: Math.random() * Math.PI * 2,
    scatterDir,
    random: Math.random()
  })
}

const dummy = new THREE.Object3D()
const vecA = new THREE.Vector3()
const vecScatter = new THREE.Vector3()

import { useLoop } from '@tresjs/core'

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (groupRef.value) {
    groupRef.value.position.y = Math.sin(elapsed * 2) * 0.2 + (1 - props.introProgress) * 0.8
    groupRef.value.scale.setScalar(0.85 + props.introProgress * 0.15)
  }
  if (!meshRef.value) return

  const sp = scatterProgress.value

  for (let i = 0; i < props.count; i++) {
    const particle = particles[i]

    const breathe = Math.sin(elapsed * particle.speed + particle.offset) * 0.03
    const thetaA = particle.theta + elapsed * 0.15

    vecA.set(
      Math.cos(thetaA) * particle.radius + particle.jitterX,
      particle.yA + breathe + particle.jitterY,
      Math.sin(thetaA) * particle.radius + particle.jitterZ
    )

    const scatterDist = sp * (5 + particle.random * 15)
    vecScatter.copy(particle.scatterDir).multiplyScalar(scatterDist)

    dummy.position.addVectors(vecA, vecScatter)

    const scaleA = 1.0 + Math.sin(elapsed * 3 + particle.offset) * 0.2
    dummy.scale.setScalar(scaleA * (1.0 - sp))

    dummy.updateMatrix()
    meshRef.value.setMatrixAt(i, dummy.matrix)
  }
  meshRef.value.instanceMatrix.needsUpdate = true
})
</script>
