<template>
  <main font-sans text="center" w-full class="min-h-screen flex flex-col" relative>
    <Header></Header>
    <div class="flex-1 flex flex-col" sm:pt-20>
      <RouterView v-slot="{ Component }" v-if="isRouterActive">
        <KeepAlive>
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </KeepAlive>
      </RouterView>
    </div>
    <Footer class="relative z-30" />
    <MobileActivityCalendar />
    <ActivityCalendar />
    <div class="bg pointer-events-none fixed inset-0 z-[-1] select-none bg-top bg-repeat"></div>

  </main>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { usePageStore } from "./store/page";
import { useUserStore } from "./store/user";
import MobileActivityCalendar from "./components/MobileActivityCalendar.vue";
import ActivityCalendar from "./components/ActivityCalendar.vue";

const pageStore = usePageStore();
const isRouterActive = pageStore.isRouterActive;
</script>
<style lang="scss">
.bg {
  background-image: url('./assets/images/grid-black.svg');
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>
