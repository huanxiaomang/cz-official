<template>
  <div class="INDEXPAGE" style="padding-top: 0;">
    <IndexVideo/>
  </div>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
import IndexVideo from "../components/view/IndexVideo.vue"
import { useRouter } from 'vue-router';
const router= useRouter();
defineOptions({
  name: 'IndexPage',
})

const a = undefined;
console.log(a);


</script>

