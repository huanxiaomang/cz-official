<template>
  <main font-sans text="center" w-full class=" min-h-[100vh]" relative>
    <Header></Header>
    <RouterView sm:pt-20 pb-80 v-slot="{ Component }">
      <KeepAlive>
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </KeepAlive>
    </RouterView>
      <Footer />

    <div class="pointer-events-none fixed inset-0 z-[-1] select-none bg-top bg-repeat bg"></div>

  </main>
</template>
<style lang="scss">
.bg {
  background-image: url(grid-black.svg);
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
