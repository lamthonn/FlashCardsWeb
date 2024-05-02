<template>
  <a-result
    title="Trò chơi ghép thẻ!"
    sub-title="Bạn phải ghép hết những cặp thẻ có thuật ngữ và giải thích giống nhau trong thời gian ngắn nhất"
  >
    <template #extra>
      <a-button key="console" type="primary" @click="goPlay">Chơi</a-button>
      <a-button key="buy" @click="goBackPage">Hủy</a-button>
    </template>
  </a-result>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    setup(props,context){
        const router = useRouter();
        const goBackPage = () =>{
            router.go(-1);
        }

        const goPlay = () => {
            context.emit('goPlay')
        }
        return{
            router,
            goBackPage,
            goPlay
        }
    }
})
</script>

<style>

</style>