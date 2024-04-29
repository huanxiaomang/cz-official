<template>
  <div>
    <div container m-auto id="memberlist">
      <div v-masonry fit-width="true" transition-duration="0s" origin-left="false" w-full m-auto
        container>
        <MemberCard v-masonry-tile v-for="user of userList" :userInfo="user"
          class="card"></MemberCard>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { getAllUser } from '~/api/user'
import { UserInfo } from "#/data";
import { loginApi } from '~/api/user';
import { useUserStore } from '~/store/user';

const userList = ref<UserInfo[]>([]);

onMounted(async () => {
  const res = await getAllUser();
  userList.value = res;
  // const u = await useUserStore().login({
  //   email: 'atri2022@163.com',
  //   password: '123456'
  // })
  // console.log(u);
  const i = useUserStore();

  console.log(i);

})
</script>

<style lang="scss" scoped>

</style>
