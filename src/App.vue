<template>
  <main font-sans text="center" w-full class=" min-h-[100vh]" relative>
    <Header></Header>
    <RouterView sm:pt-20 pb-80 v-slot="{ Component }" v-if="isRouterActive">
      <KeepAlive>
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </KeepAlive>
    </RouterView>
    <Footer />
    <div class="bg pointer-events-none fixed inset-0 z-[-1] select-none bg-top bg-repeat"></div>

  </main>
</template>
<script setup lang="ts">
import { usePageStore } from "./store/page";
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
