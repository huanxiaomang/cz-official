<template>
  <div class="video-container" h-100vh w-full relative>
    <video autoplay loop muted class="video" h-full w-full object-cover z-1>
      <source src="../../assets/video/main.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div
      class="title-container z-2 absolute flex items-center justify-center flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <RandomWord :TextContent="CN_title" text-5xl font-bold></RandomWord>
      <RandomWord class="title-container-EN" :TextContent="EN_title" :randomWordCount="3" :IsInterval="false"
        :relWordTime="50" randomWordColor="#666" font-300 text-xl tracking-wide mt-1></RandomWord>
    </div>
  </div>

</template>

<script setup lang='ts'>
import RandomWord from '../RandomWord.vue';
let CN_title = "智慧在此交汇，创新在此迸发";
let EN_title = "Wisdom converges here, and innovation bursts out here";


</script>

