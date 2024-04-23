<script setup lang="ts" generic="T extends any, O extends any">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MemberCard from '~/components/MemberCard.vue';

defineOptions({
  name: 'IndexPage',
})

const name = ref('')

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
const userList = ref([]);

onMounted(async() => {
  axios.get('http://1.92.82.236:3000/api/cz').then(({data}) => {
    console.log(data);
    userList.value = data;
  })
})

</script>

<template>
  <div>
    <div i-carbon-campsite inline-block text-4xl />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <TheInput v-model="name" placeholder="What's your name?" autocomplete="false" @keydown.enter="go" />

    <div>
      <button class="m-3 text-sm btn" :disabled="!name" @click="go">
        Go
      </button>
    </div>
    <MemberCard v-for="user of userList" :userInfo="user"></MemberCard>
    <div h-500>
    </div>
  </div>
</template>
