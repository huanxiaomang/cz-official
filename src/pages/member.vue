<template>
  <div p-10>
    <div container m-auto id="memberlist">
      <div v-masonry fit-width="true" transition-duration="0.3s" item-selector=".card" origin-left="false" w-full m-auto
        container>
        <MemberCard v-masonry-tile v-for="user of [...userList, ...userList, ...userList, ...userList]" :userInfo="user"
          class="card"></MemberCard>

      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const userList = ref([]);

onMounted(async () => {
  axios.get('http://1.92.82.236:3000/api/cz').then(({ data }) => {
    userList.value = data.result;
  });


})
</script>

<style lang="scss" scoped>

</style>
