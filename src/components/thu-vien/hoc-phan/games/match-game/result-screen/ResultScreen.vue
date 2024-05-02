<template>
  <a-result
    status="success"
    title="Chúc mừng bạn đã hoàn thành trò chơi!"
    :sub-title='`Bạn đã hoàn thành trò chơi với thời gian ${time}`'
  >
    <template #extra>
      <a-button type="primary" @click="goBack">Về trang học phần</a-button>
    </template>
  </a-result>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    props:{
        time: String
    },
    setup(){
        const router = useRouter();
        const goBack = () => {
            router.go(-1)
        }

        return{
            router,
            goBack,
        }
    }
})
</script>

<style>

</style>