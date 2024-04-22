<template>
  <div class="header w-full h-20 flex" flex="items-center row" gap-5 fixed z-10>
    <img src="./../../assets/icon/cz_ba-style.png" alt="logo" h-15>
    <div class="item">主页</div>
    <div class="item">项目</div>
    <div class="item">通知</div>
    <a i-carbon-logo-github icon-btn rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank"
      title="GitHub" />
  </div>
</template>

<script setup lang='ts'>

</script>

<style lang="scss" scoped>
.header{
  -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
