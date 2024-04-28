<template>
  <img :src="useStackIcon(name)" :alt="name" select-none>
</template>

<script setup lang='ts'>
import { PropType } from 'vue';
import { techStack, useStackIcon } from '~/hooks/useStackIcon'


defineProps({
  name: {
    type: String as PropType<typeof techStack[number]>,
    required: true
  }
})



</script>

<style lang="scss" scoped>

</style>
