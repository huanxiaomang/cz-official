<template>
    <div class="w-screen h-full">
        <div class="h-screen lg:flex lg:flex-col lg:justify-center lg:items-center">
            <div class="h-40 space-y-2 text-center flex flex-col justify-center lg:h-50 top">
                <div class="text-3xl font-bold lg:font-normal">{{ title }}</div>
                <div class="text-sm text-gray-500">{{ subtitle }}</div>
            </div>
            <div class="h-[740px] lg:flex lg:h-[100%] lg:w-[80%]">
                <div class="px-5 h-1/2 lg:h-[100%] relative lg:px-0 lg:w-3/5">
                    <div w-full h-full>
                        <video autoplay loop muted class="video" h-full w-full object-cover z-1
                        poster="">
                            <source :src="videoLeftPoster" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full px-10 py-4 lg:px-7">
                        <img :src="companyLogo" alt="" class="w-[70px] h-[34px] lg:w-[40%] lg:h-[14%]">
                        <div class="text-white font-bold flex mt-[110px] leading-[2.75rem] text-[1.25rem] lg:mt-[210px] lg:text-[1.5rem]">
                            {{ companyName }}
                        </div>
                        <div class="text-white text-xs [text-align:justify] font-sans font-medium leading-6 tracking-wide mt-2 lg:text-[1rem] lg:mt-[20px]">
                            {{ companyDescription }}
                        </div>
                        <div class="flex items-center mt-3">
                            <div class="text-white text-xs font-sans font-medium leading-6 tracking-wide lg:text-[1rem]">
                                {{ learnMoreText }}
                            </div>
                            <button
                                class="rounded-full bg-[#ffffff] w-[12px] h-[12px] ml-1 flex items-center justify-center active:rounded-full active:w-[20px]">
                                <SvgIconG name="arrowRight" class="w-[90%] h-[90%]"></SvgIconG>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="px-5 py-0 h-1/2 lg:w-full lg:h-full lg:px-0">
                    <video autoplay loop muted class="video" h-full w-full object-cover z-1
                        poster="">
                        <source :src="videoPoster" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { withDefaults } from 'vue';
withDefaults(defineProps<{
    title: string,
    subtitle?: string,
    videoPoster?: string,
    videoLeftPoster?: string,
    companyLogo: string,
    companyName: string,
    companyDescription?: string,
    learnMoreText?: string,
}>(), {
    subtitle: "创智工作室为创新加速",
    companyDescription: "创立于2023年，是全球领先的云计算及人工智能科技工作室，为200多个国家和地区的企业、开发者和政府机构提供服务。创智工作室致力于以在线公共服务的方式，提供安全、可靠的计算和数据处理能力，让计算和人工智能成为普惠科技。",
    learnMoreText: "了解更多",
})



</script>

<style scoped lang="scss">


</style>
