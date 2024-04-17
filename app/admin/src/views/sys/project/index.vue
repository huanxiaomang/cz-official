<template>
  <PageWrapper title="项目管理">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          以下为创智工作室所有项目。
        </span>
      </div>
    </template>
    <div v-show="Object.keys(projData).length === 0">
      <p>暂无项目</p>
    </div>
    <Card v-show="Object.keys(projData).length > 0" v-for="p of projData" :key="p.id" :title="p.title" class="mb-6">
      <p>{{p.stack}}</p>
      <p>{{p.content}}</p>
      成员: <Avatar v-for="u of p.members.split(',')" :key="u" :userId="u"></Avatar>
      <div class="ml-auto w-fit flex gap-2">
        <Icon icon="uil:edit" size="22" color="#222" class="ml-auto !block cursor-pointer"></Icon>
        <Icon icon="material-symbols:delete" size="24" color="#222" class="ml-auto !block cursor-pointer" @click="handleRemove(p.id)"></Icon>
      </div>
    </Card>

  </PageWrapper>
</template>
<script lang="ts" setup>
import { h, onMounted } from "vue";
import { Tag,Card } from "ant-design-vue";
import { PageWrapper } from "@/components/Page";
import Avatar from "@/components/cz/CZAvatar.vue";
import {
  Description,
  DescItem,
  useDescription,
} from "@/components/Description";
import { GITHUB_URL, SITE_URL, DOC_URL } from "@/settings/siteSetting";
import { getProjApi, createProjApi, updateProjApi, removeProjApi } from '@/api/sys/project'
import { ref } from "vue";
import Icon from "@/components/Icon/Icon.vue";

let projData = ref({});

onMounted(async() => {
  projData.value = (await getProjApi()).data;
})

function handleEdit() {

}

async function handleRemove(id) {
  await removeProjApi(id);
  projData.value = (await getProjApi()).data;

}

function handleAdd() {

}


</script>
<style lang="less" scoped>

</style>
