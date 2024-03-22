<template>
  <MainLayout >
    <a-card
        class="itemSlice"
        
    >

    </a-card>
  </MainLayout>
</template>

<script>
import { defineComponent } from 'vue';
import MainLayout from "@/layout/main.vue";
import { useRouter } from 'vue-router';

export default defineComponent({
    name:"chi-tiet-hoc-phan",
    components:{
        MainLayout
    },
    setup(){
        const router = useRouter();

        return {
          router
        }
    }
})
</script>

<style scoped>
    .itemSlice{
       width: 80%; 
    }
</style>