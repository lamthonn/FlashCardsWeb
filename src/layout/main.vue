<template>
  <a-layout-header class="header">
    
    <div class="logo" />
    <a-menu theme="light" mode="horizontal" :style="{ lineHeight: '60px' }">
      <a-menu-item
        key="1"
        style="font-family: 'Anta', sans-serif; font-size: 2rem;"
        @click="returnToTrangChu"
        >VocaLearn</a-menu-item
      >
    </a-menu>
  </a-layout-header>
  <a-layout>
    <a-layout-sider width="230" style="background: #fff">
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        v-model:openKeys="state.openKeys"
        :inline-collapsed="state.collapsed"
        mode="inline"
        :style="{ height: '100vh', borderRight: 0 }"
        :items="menu"
        @click="handleClick"
      ></a-menu>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item v-if="breadcrumbs[0].title !== 'Trang chủ'">Trang chủ</a-breadcrumb-item>
        <a-breadcrumb-item v-for="crumb in breadcrumbs" :key="crumb.path">
            {{ crumb.title }}
        </a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content
        :style="{
          background: '#fff',
          padding: '24px',
          margin: 0,
          minHeight: '280px',
        }"
      >
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
  
  <script>
import { defineComponent, reactive, ref } from "vue";
import menuDefaut from "@/constants/menu.js";

import { 
  UserOutlined,
 } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "main-layout",
  components: {
    UserOutlined,
  },
  setup() {
    const loading = ref(false);
    const router = useRouter();
    const menu = ref(menuDefaut);
    const state = reactive({
      collapsed: false,
      selectedKeys: [''],
      openKeys: [''],
    });

    const handleClick = (val) => {
      loading.value = true;
      if(val.key === "TrangChu"){
        router.push("/trang-chu")
        loading.value = false;
      }
      if(val.key === "HoSo"){
        router.push("/ho-so");
        loading.value = false;
      }
      if(val.key === "DangXuat"){
        sessionStorage.removeItem("Token");
        sessionStorage.removeItem("Role");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("Username");

        router.push("/dang-nhap")
        loading.value = false;
      }

    }

    const returnToTrangChu = () => {
      router.push("/trang-chu");
    }

    return {
      state,
      menu,
      loading,
      router,
      handleClick,
      returnToTrangChu
    };
  },
  computed:{
    breadcrumbs() {
        return this.$route.matched.map(route => ({
            title: route.meta.breadcrumb,
            path: route.path
        }))
    }
  }
});
</script>
  
  <style>
</style>