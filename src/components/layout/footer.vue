<template>
  <nav items-center w-full border-b-bluegray h-55 sm:h-50 text-gray-300 flex flex-col sm:flex-row justify-center gap-1
    sm:gap-8 select-none absolute bottom-0 left-0 class="dark:bg-gradient-to-dark">
    <img src="./../../assets/icon/cz_ba-style_white.png" alt="logo" h-20 sm:h-25>
    <div text-center sm:text-left>
      <div class="cn" pb-2>
        <span cursor-pointer hover:underline>隐私政策</span> |
        <span cursor-pointer hover:underline>联系我们</span> |
        <span cursor-pointer hover:underline>加入我们</span>
      </div>
      <div>Copyright © 2023-present 创智工作室</div>
      <div>Released under the MIT License.</div>
      <div>吉ICP备2024018770号</div>
      <img src="./../../assets/icon/beihua-remove.png" alt="北华大学" h-4 sm:h-8 mt-2 invisible sm:visible>
    </div>

  </nav>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

</script>
<style lang="scss" scoped>
nav{
    line-height: 24px;
    font-size: 14px;
    font-weight: 400;
    background: #1F2329;
}
.cn{
    font-family: Gilroy-regular, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

</style>
