import { defineStore } from "pinia";
import { nextTick, ref } from "vue";

export const usePageStore = defineStore('page', () => {
  const isRouterActive = ref(true);
  const reload = () => {
    isRouterActive.value = false;
    nextTick(() => {
      isRouterActive.value = true;
    });
  };
  return {
    isRouterActive,
    reload
  }
})
