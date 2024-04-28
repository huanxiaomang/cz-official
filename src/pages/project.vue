<template>
  <div>
    <div container m-auto mt-6>
      <div v-for="proj in projList" :key="proj.id" mt-4 w-full sm:w-3xl m-auto
        class=" bg-white p-8 rounded-sm shadow-md whitespace-pre-wrap text-left">
        <div text-xl font-bold pb-3>{{ proj.title }}</div>
        <div flex gap-1 flex-wrap>
          <StackIcon :name="s" v-for="s of proj.stack.split('+') "></StackIcon>
        </div>
        <div text-sm mt-4 w-full break-words>{{ proj.content }}</div>
        <div mt-4>
          <CZAvatar v-for="u of proj.members.split(',')  " :key="u" :userId="u"></CZAvatar>
        </div>
        <div text-xs pt-4 text-gray-800>{{ splitDate(proj.createdAt).fullDate }}</div>
      </div>
    </div>

  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { getProjApi } from '~/api/project'
import { ProjInfo } from "#/data";
import { splitDate } from '~/utils/splitDate'

const projList = ref<ProjInfo[]>([]);

onMounted(async () => {
  const projs = (await getProjApi() as any).data;
  projList.value = projs.toSorted((a: ProjInfo, b: ProjInfo) => {
    return splitDate(b.createdAt).timestamp - splitDate(a.createdAt).timestamp
  });
    console.log(projList.value);



})
</script>

<style lang="scss" scoped></style>
