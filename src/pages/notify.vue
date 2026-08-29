<template>
  <div>
    <div container m-auto mt-6>
      <div v-for="(v,k,i) in msgList" :key="k" w-full sm:w-3xl m-auto>
        <div text-2xl font-bold sm:text-left m-5 :class="i === 0 ? 'text-blue-500' : 'text-gray-700'">{{ k }}</div>
        <div v-for="msg in v" :key="msg.id" m-5
          class=" bg-white p-8 rounded-sm shadow-md whitespace-pre-line text-left dark:bg-transparent">
          <div text-xl font-bold pb-3>{{ msg.title }}</div>
          <div text-sm>{{ msg.content }}</div>
          <div text-xs pt-4 text-gray-800 class="dark:text-gray-5">{{ getMessageDateInfo(msg.createdAt).fullDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { getMsgApi } from '~/api/message'
import { MsgInfo } from "#/data";
import { splitDate } from '~/utils/splitDate'

const msgList = ref<Record<string,MsgInfo[]>>({});

function getMessageDateInfo(createdAt: string) {
  return splitDate(createdAt) ?? {
    year: 'unknown',
    month: 'unknown',
    day: '00',
    hour: '00',
    minute: '00',
    second: '00',
    millisecond: '000',
    fullDate: createdAt,
    timestamp: 0,
  };
}

onMounted(async () => {
  const msgs = await getMsgApi();
  msgs
    .toSorted((a: MsgInfo, b: MsgInfo) => {
      return getMessageDateInfo(b.createdAt).timestamp - getMessageDateInfo(a.createdAt).timestamp
    })
    .map((m: MsgInfo) => {
    const { year, month } = getMessageDateInfo(m.createdAt);
    if(!msgList.value[`${year}-${month}`]){
      msgList.value[`${year}-${month}`] = []
    }
    msgList.value[`${year}-${month}`].push(m);
  })



})
</script>

<style lang="scss" scoped></style>
