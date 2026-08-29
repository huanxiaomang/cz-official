<template>
  <div>
    <h1 class="page-title">创智工作室成员列表</h1>
    <div container m-auto id="memberlist">
      <div v-masonry fit-width="true" transition-duration="0s" origin-left="false" w-full m-auto gap-10
        container>
        <MemberCard v-masonry-tile v-for="user of userList" :userInfo="user"
          class="card" w-80 mx-auto md:mx-6></MemberCard>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { getAllUser } from '~/api/user'
import { UserInfo } from "#/data";

const userList = ref<UserInfo[]>([]);

onMounted(async () => {
  const res = await getAllUser();
  userList.value = res.filter((u: UserInfo) => u.role === 'ADMIN' || u.role === 'CZ_MEMBER');


})
</script>

<style lang="scss" scoped>
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
