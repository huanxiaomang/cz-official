<template>
    <div class="IndexPage-container">
        <div class="video-container">
            <video autoplay loop muted class="video">
                <source src="../assets/video/main.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="title-container">
                <RandomWord :TextContent = "CN_title"></RandomWord>
                <RandomWord class="title-container-EN"
                            :TextContent = "EN_title"
                            :randomWordCount="3"
                            :IsInterval="false"
                            :relWordTime="50"
                            randomWordColor="#666"
                ></RandomWord>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import RandomWord from './RandomWord.vue';
let CN_title = "智慧在此交汇，创新在此迸发";
let EN_title = "Wisdom converges here, and innovation bursts out here";


</script>

<style scoped lang="scss">
.IndexPage-container{
    position: relative;
    width: 100%;
    user-select: none;
    .video-container{
        position: relative;
        width: 100%; height: 100vh;
        .video{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100vh;
            object-fit: cover;
            min-height: 800px;
            z-index: 1;
        }
        .title-container{
            position: absolute;
            width: 100%; height:100vh;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 3.5rem;
            font-weight: 700;
            flex-direction: column;
            .title-container-EN{
                font-weight: 300;
                font-size: 1rem;
                letter-spacing: 2px;
                color:#666
            }
        }
    }

}

</style>
