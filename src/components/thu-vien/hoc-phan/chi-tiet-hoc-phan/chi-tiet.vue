<template>
  <MainLayout >
    <a-card
        class="itemSlice"
        style="width:100%"
    >
    <a-carousel arrows style="width:80%; margin-left:10%;">
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
          <LeftOutlined  />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <RightOutlined  />
        </div>
      </template>
      <div>
        <h1>item</h1>
      </div>
      
      <div>
        <h1>presentations</h1>
      </div>
    </a-carousel>
    </a-card>
  </MainLayout>
</template>

<script>

import { defineComponent } from 'vue';
import MainLayout from "@/layout/main.vue";
import { useRouter } from 'vue-router';
import { RightOutlined ,LeftOutlined   } from "@ant-design/icons-vue"

export default defineComponent({
    name:"chi-tiet-hoc-phan",
    components:{
        MainLayout,
        RightOutlined ,
        LeftOutlined 
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
    /* For demo */
    :deep(.slick-slide) {
      text-align: center;
      height: 320px;
      line-height: 320px;
      background: #a0a0a1;
      overflow: hidden;
    }

    :deep(.slick-arrow.custom-slick-arrow) {
      width: 25px;
      height: 25px;
      font-size: 25px;
      color: #fff;
      background-color: rgba(31, 45, 61, 0.11);
      transition: ease all 0.3s;
      opacity: 0.3;
      z-index: 1;
    }
    :deep(.slick-arrow.custom-slick-arrow:before) {
      display: none;
    }
    :deep(.slick-arrow.custom-slick-arrow:hover) {
      color: #fff;
      opacity: 0.5;
    }

    :deep(.slick-slide h1) {
      color: #fff;
      font-size: 35px;
    }
</style>
