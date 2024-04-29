<template>
  <div p-10 class="INDEXPAGE">
    <IndexPage></IndexPage>
  </div>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import IndexPage from "../components/IndexPage.vue"

defineOptions({
  name: 'IndexPage',
})


</script>

<style scoped>
.INDEXPAGE{
  padding: 0;
}
</style>
