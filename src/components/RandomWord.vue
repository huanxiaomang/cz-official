<template>
  <span class="text" whitespace-pre-line text-left sm:text-center select-none>
    {{ text }}

    <span class="point" w-10 inline-block>{{ point }}
      <span :class="randomWordClass" :style="{color: mainValue.randomWordColor}" v-if="mainValue.randomWordCount === 1">
        {{ randomWord }}
      </span>
      <span :class="randomWordClass" :style="{color: mainValue.randomWordColor}" v-else v-for="i in randomWordCount"
        :key="i">
        {{ randomWord === "end" ? "": randomList[Math.floor(Math.random() * randomList.length)] }}
      </span>
    </span>
  </span>
</template>

<script setup lang='ts'>
import { ref , withDefaults } from 'vue';
let mainValue = withDefaults(defineProps<{
    randomWordTime?: number,
    relWordTime?: number,
    TextContent: string,
    IsInterval?: boolean,
    randomWordCount?: number,
  randomWordColor?: string,
}>(),{
    randomWordTime: 50,
    relWordTime: 150,
    IsInterval: true,
    randomWordCount: 1,
  randomWordColor: "#FF6C05",
})
/////只要不动下面的屎山，那它就是好代码  ----hakurei77
let randomList = "!@#$%^&*()_+-=[]{}|;':\",.<>/?~`";//随机字列表    (不用动这一段代码)
/////
let text = ref("");
let point = ref(".");
let randomWord = ref();
let randomWordClass = ref("randomWord")
/**
 * @param random_word_time 随机字每秒闪烁次数
 * @param rel_word_time 真实字每秒显示次数
 * @param underline_presistent_time 随机字闪烁持续时间
 * @param random_persistent_time 真实字闪烁持续时间
 */
let randomDisplay = ( random_word_time:number , rel_word_time:number , underline_presistent_time = 4500 , random_persistent_time = 1000) => {
    let index = 0;
    let wordTimer = setInterval(() => { //随机抽字函数
        if(mainValue.randomWordCount === 1){
            randomWord.value = randomList[Math.floor(Math.random() * randomList.length)];
        }
        else{
            randomWord.value = "";
        }
    }, random_word_time)
    let textTimer = setInterval(() => {
      if (index < mainValue.TextContent.length) {
          let letter = mainValue.TextContent[index];
          if (letter + mainValue.TextContent.slice(index + 1, index + 4) === `<br>`){
              text.value += `\n`;
              index += 4;
          } else {
            text.value += letter;
            index++;
          }
        } else {
            randomWordClass.value = "randomWord underline";
            clearInterval(wordTimer);
            clearInterval(textTimer);
            point.value = ""
            mainValue.randomWordCount === 1 ? randomWord.value = "" : randomWord.value = "end"
            if(mainValue.IsInterval){
                randomWord.value = "_"
                setInterval(() => {
                    randomWordClass.value = "randomWord";
                    let wordTimer = setInterval(() => {
                        randomWord.value = randomList[Math.floor(Math.random() * randomList.length)];
                    },50)
                    setTimeout(() => {
                        clearInterval(wordTimer);
                        randomWordClass.value = "randomWord underline";
                        randomWord.value = "_"
                    },random_persistent_time)
                },underline_presistent_time)
            }
        }
    }, rel_word_time);    //字刷新事件
};
// 开始逐个显示字母
randomDisplay(mainValue.randomWordTime, mainValue.relWordTime);
</script>

<style scoped lang="scss">
.letter{

}

.underline {
    animation: blink 1.5s steps(1) infinite;
}
@keyframes blink {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
