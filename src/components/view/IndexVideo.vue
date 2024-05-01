<template>
  <div class="video-container" h-100vh w-full relative>
    <video autoplay loop muted class="video" h-full w-full object-cover z-1
      poster="../../assets/images/bg-first-frame.jpg">
      <source src="../../assets/video/bg.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div
      class="title-container w-full z-2 absolute flex items-center justify-center flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div flex flex-col gap-1>
        <RandomWord class="title-cn" :TextContent="deviceType === 'mobile' ? CN_titleWithBR : CN_title" sm:text-5xl
          text-3xl font-bold>
        </RandomWord>
        <RandomWord class="title-en" :TextContent="deviceType === 'mobile' ? EN_titleWithBR : EN_title"
          :randomWordCount="3" :IsInterval="false" :relWordTime="50" randomWordColor="#666" font-300 sm:text-xl
          tracking-wide >
        </RandomWord>
      </div>

    </div>
  </div>

</template>

<script setup lang='ts'>
import { useDeviceType } from '~/hooks/useDeviceType'
import RandomWord from '../RandomWord.vue';
const deviceType = useDeviceType();

const CN_title = "智慧在此交汇，创新在此迸发";
const CN_titleWithBR = "智慧在此交汇，<br>创新在此迸发";
const EN_title = "Wisdom converges here, and innovation bursts out here";
const EN_titleWithBR = "Wisdom converges here, <br>and innovation bursts out here";


</script>
<style lang="scss" scoped>
.title-cn {
  color: transparent;
  background-clip: text !important;
  background: -webkit-linear-gradient(to right, #1d2836 0%,
    #384e6c 100%);
  background: linear-gradient(to right, #1d2836 0%, #384e6c 100%);
}

.title-en{
  font-family: Gilroy-regular, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
