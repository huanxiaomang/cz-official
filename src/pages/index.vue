<template>
  <div class="INDEXPAGE" style="padding-top: 0;">
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

