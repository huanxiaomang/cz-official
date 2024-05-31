<template>
    <svg :style="{ width , height }">
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang='ts'>
defineProps({
    name: {
        type: String,
    },
    width: {
        type: String,
    },
    height: {
        type: String,
    },
    color: {
        type: String,
        default: '#333'
    },
    prefix: {
        type: String,
        default: '#icon-'
    }
})

defineOptions({
  name:'SvgIconG',
})

</script>

<style scoped lang="scss">

</style>
