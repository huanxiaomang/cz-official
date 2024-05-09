<template>
  <div class="INDEXPAGE" style="padding-top: 0;">
    <IndexVideo/>
  </div>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import IndexVideo from "../components/view/IndexVideo.vue"

defineOptions({
  name: 'IndexPage',
})
</script>

