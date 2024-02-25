<template>
  <!-- <DangNhap /> -->
  <router-view/>
</template>

<script>
  import dangNhapVue from "./views/dang-nhap.vue";
  import { defineComponent } from "vue";

  export default defineComponent({
    components:{
      DangNhap:dangNhapVue,
      
    },
  })
</script>
