<template>
  <div class="header w-full h-20 flex" flex="items-center row" fixed z-10>
    <img src="./../../assets/icon/cz_ba-style.png" alt="logo" h-15 ml-10>
    <div flex gap-30 flex-1 justify-center>
      <div class="item" cursor-pointer>主页</div>
      <div class="item" cursor-pointer>项目</div>
      <div class="item" cursor-pointer>通知</div>
      <div class="item" cursor-pointer>成员</div>
    </div>
    <a i-carbon-logo-github icon-btn rel="noreferrer" href="https://github.com/huanxiaomang/cz-official" target="_blank"
      title="GitHub" text-black text-5 ml-auto mr-8 />
  </div>
</template>

<script setup lang='ts'>

</script>

<style lang="scss" scoped>
.header{
  -webkit-backdrop-filter: saturate(180%) blur(20px);
    backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: #7b7e81;
}
</style>
