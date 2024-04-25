<template>
  <main font-sans text="center" w-full class=" min-h-[100vh]" relative>
    <Header></Header>
    <RouterView pt-20 pb-50 />
    <Footer />
    <div class="pointer-events-none fixed inset-0 z-[-1] select-none bg-top bg-repeat bg"></div>

  </main>
</template>
<style lang="scss">
.bg {
  background-image: url(grid-black.svg);
}
</style>
