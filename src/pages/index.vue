<template>
  <div class="INDEXPAGE" style="padding-top: 0;">
    <h1 class="page-title">创智工作室官网</h1>
    <IndexVideo/>
  </div>
</template>

<script setup lang="ts">
import IndexVideo from "../components/view/IndexVideo.vue"
import { useRouter } from 'vue-router';
const router= useRouter();
defineOptions({
  name: 'IndexPage',
}) //Ugar-biolian

</script>

<style scoped>
.page-title {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
