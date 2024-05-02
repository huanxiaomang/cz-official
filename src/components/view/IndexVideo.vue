<template>
  <div class="video-container" h-100vh w-full relative>
    <video autoplay loop muted class="video" h-full w-full object-cover z-1
      poster="../../assets/video/bg-first-frame.jpg">
      <source src="../../assets/video/bg.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="title-container w-full z-2 absolute flex items-center justify-center flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div flex flex-col gap-1>
        <RandomWord class="title-cn" :TextContent="deviceType === 'mobile' ? CN_titleWithBR : CN_title" sm:text-5xl
          text-3xl font-bold>
        </RandomWord>
        <RandomWord class="title-en" :TextContent="deviceType === 'mobile' ? EN_titleWithBR : EN_title"
          :randomWordCount="3" :IsInterval="false" :relWordTime="50" randomWordColor="#666" font-300 sm:text-xl
          tracking-wide>
        </RandomWord>
      </div>
    </div>
  </div>
  <div w-full relative class="mainContent-container">
    <div class="mainContent">
      <RandomWord class="mainContent-title" :TextContent="mainContentTitle"
          :randomWordCount="3" :IsInterval="false" :relWordTime="50" randomWordColor="#666" :startY="500" font-300 sm:text-xl
          tracking-wide>
      </RandomWord>
      <RandomWord class="mainContent-text" v-for="item in mainContent" :TextContent="item"
          :randomWordCount="3" :IsInterval="false" :relWordTime="50" randomWordColor="#666" :startY="500" font-300 sm:text-xl
          tracking-wide>
      </RandomWord>
    </div>
    <div class="mainVideo">
      <video autoplay loop muted class="video" h-full w-full object-cover z-1
        poster="../../assets/video/bg-first-frame.jpg">
        <source src="../../assets/video/font.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
  <div h-100vh w-full relative class="SecContent-container">
    <div class="title">
      为什么加入我们
    </div>
    维护中QAQ
  </div>

</template>

<script setup lang='ts'>
import { useDeviceType } from '~/hooks/useDeviceType'
import RandomWord from '../RandomWord.vue';
import { onMounted } from "vue"
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
gsap.registerPlugin(ScrollTrigger);

const deviceType = useDeviceType();

const CN_title = "智慧在此交汇，创新在此迸发";
const CN_titleWithBR = "智慧在此交汇，<br>创新在此迸发";
const EN_title = "Wisdom converges here, and innovation bursts out here";
const EN_titleWithBR = "Wisdom converges here, <br>and innovation bursts out here";

const mainContentTitle = "## Created on 2023 by Professor Wang"
const mainContent = [
  '创智实验室',
  '培养创新思维和智能化技术应用能力的软件工程师',
  '专注前后端开发，实践驱动教学，覆盖编程、数据库、网络等核心领域',
  '强化创新与问题解决能力，培养IT行业多面手。',
  '课程设置涵盖编程基础、数据结构与算法、数据库原理、网络编程、Web前后端开发、移动应用开发等核心领域',
  '学生将掌握HTML、CSS、JavaScript等前端技术，',
  '以及Java、Python、Node.js等后端编程语言，学习构建可扩展、高可用的系统。',
]

//以下代码均为gsap动画
onMounted(()=>{
  //--!!!!!!!--//别动，能跑就行
  gsap.fromTo(
  '.mainContent-title', 
  { 
    fontSize: '40rem',
    letterSpacing: "500px",
    opacity:0,
  } , 
  {
    fontSize: '20rem',
    letterSpacing: "100px",
    opacity:1,
    scrollTrigger: {
      trigger:".mainContent-container",
      scrub: true, 
      start: "top center",
      end: "top top", // 到底部再往下滚动100px结束动画
    }
  });
  gsap.fromTo(
  '.mainContent', 
  { 
    opacity:0,
  } , 
  {
    opacity:1,
    scrollTrigger: {
      trigger:".mainContent-container",
      scrub: true, 
      start: "top center",
      end: "top top", // 到底部再往下滚动100px结束动画
    }
  });
  ///第一阶段动画
  gsap.fromTo(
  '.mainContent', 
  {},
  {
    y:"60vh",
    scrollTrigger: {
      trigger:".mainContent",
      scrub: true, 
      start: "top top",
      end: "bottom center", // 到底部再往下滚动100px结束动画
    }
  },
);
  gsap.fromTo(
  '.mainContent-title', 
  { 
    fontSize: '20rem',
    letterSpacing: "100px",
  } , 
  {
    fontSize: '1rem',
    letterSpacing: "0px",
    scrollTrigger: {
      trigger:".mainContent",
      scrub: true, 
      start: "top top",
      end: "bottom center", // 到底部再往下滚动100px结束动画
    }
  });
  ///第二阶段动画
  gsap.fromTo(
  '.mainContent', 
  {
  },
  {
    y:"110vh",
    scrollTrigger: {
      trigger:".mainVideo",
      scrub: true, 
      start: "top center",
      end: "top top", // 到底部再往下滚动100px结束动画
    }
  });
  //第四阶段动画
  gsap.fromTo(
  '.mainContent', 
  {},
  {
    y:"200vh",
    scrollTrigger: {
      trigger:".mainVideo",
      scrub: true, 
      start: "top top",
      end: "bottom top", // 到底部再往下滚动100px结束动画
    }
  });
  //--!!!!!!!--//别动，能跑就行
})


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

.mainContent-container{
  background-color: white;
  height: 220vh;
  overflow: hidden;
  .mainContent{
    position: relative;
    z-index: 2;
    width: 100%; 
    padding-top: 30vh; height: 120vh;
    display: flex;
    flex-direction: column;
    .mainContent-title{
      white-space: nowrap;
      font-weight: 600;
    }
    .mainContent-text{
      font-size: 16px;
      margin-top: 10px; margin-bottom: 10px;
      text-align: left;
      margin-left: 35%;
    }
  }
  .mainVideo{
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: 100%; height: 100vh;
  }
}
.SecContent-container{
  width: 100%; height: 100vh;
  background-color: white;
  .title{
    font-size: 40px; 
    padding-top: 30px;
  }
}
</style>
