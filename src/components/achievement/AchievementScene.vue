<template>
  <div class="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none bg-transparent">
    <TresCanvas
      shadows
      alpha
      clear-color="#000000"
      :clear-alpha="0"
      class="!bg-transparent"
    >
      <TresPerspectiveCamera :position="[0, 0, 10]" />

      <TresAmbientLight :intensity="0.2" />
      <TresSpotLight :position="[0, 8, 0]" :angle="0.6" :penumbra="0.5" :intensity="200" color="#ffffff" cast-shadow :distance="15" />
      <TresPointLight :position="[5, 2, 5]" :intensity="55" color="#38BDF8" />
      <TresPointLight :position="[-5, 2, -5]" :intensity="55" color="#38BDF8" />

      <!-- Float animation for the whole group -->
      <Levioso :speed="2" :rotation-intensity="0.2" :float-intensity="0.5">
        <Suspense>
          <TresGroup>
            <Crown :scrollProgress="scrollProgress" :introProgress="introProgress" />
            <FloatingKeywords :scrollProgress="scrollProgress" :introProgress="introProgress" />
            <ContactShadows :position="[0, -2.5, 0]" :opacity="0.35" :scale="10" :blur="2" :far="4" color="#38BDF8" />
          </TresGroup>
        </Suspense>
      </Levioso>
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { ContactShadows, Levioso } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import Crown from './Crown.vue'
import FloatingKeywords from './FloatingKeywords.vue'

defineProps({
  scrollProgress: {
    type: Number,
    default: 0
  },
  introProgress: {
    type: Number,
    default: 1
  }
})
</script>
