<template>
  <div class="video-container" h-100vh w-full relative>
    <video autoplay loop muted class="video" h-full w-full object-cover z-1
      poster="../../assets/images/bg-first-frame.jpg">
      <source src="../../assets/video/bg.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div
      class="title-container w-full z-2 absolute flex items-center justify-center flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <RandomWord :TextContent="deviceType === 'mobile' ?'智慧在此交汇，<br>创新在此迸发' : '智慧在此交汇，创新在此迸发'"
         sm:text-5xl text-3xl font-bold></RandomWord>
      <RandomWord class="title-container-EN" :TextContent="EN_title" :randomWordCount="3" :IsInterval="false"
        :relWordTime="50" randomWordColor="#666" font-300 sm:text-xl tracking-wide mt-1></RandomWord>
    </div>
  </div>

</template>

<script setup lang='ts'>
import { useDeviceType } from '~/hooks/useDeviceType'
import RandomWord from '../RandomWord.vue';
const deviceType = useDeviceType();

let EN_title = "Wisdom converges here, and innovation bursts out here";


</script>

