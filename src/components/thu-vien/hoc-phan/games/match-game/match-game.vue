<template>
  <mainVue >
    <BeforeStartVue 
      v-if="stateGame === 'default'"
      @goPlay="onHandleBeforeStart"
    />
    <StartGame 
      v-if="stateGame === 'match'"
      @winGame="winGame"
    />

    <ResultScreenVue 
      v-if="stateGame === 'win'"
      :time="time"
    />
  </mainVue>
</template>

<script>
import mainVue from '@/layout/main.vue';
import { defineComponent, ref } from 'vue';
import BeforeStartVue from './before-start/BeforeStart.vue';
import ResultScreenVue from './result-screen/ResultScreen.vue';
import StartGame from './start-game/index.vue';
export default defineComponent({
    components:{
        StartGame,
        BeforeStartVue,
        mainVue,
        ResultScreenVue,
    },
    setup(){
      const time = ref('')
      const stateGame = ref('default')
      const onHandleBeforeStart =() => {
        stateGame.value = 'match'
      }

      const winGame = (timeWin) => {
        stateGame.value = 'win';
        time.value = timeWin;
      }
      return{
        stateGame,
        onHandleBeforeStart,
        winGame,
        time
      }
    }
})
</script>

<style>

</style>