<template>
  <a-layout-header class="header">
    <div class="logo" />
    <a-menu theme="light" mode="horizontal" :style="{ lineHeight: '60px' }">
      <a-menu-item
        key="1"
        style="font-family: 'Anta', sans-serif; font-size: 2rem"
        >VocaLearn</a-menu-item
      >
    </a-menu>
  </a-layout-header>
  <a-layout>
    <a-layout-sider width="230" style="background: #fff">
      <a-menu
        v-model:selectedKeys="selectedKeys2"
        v-model:openKeys="openKeys"
        mode="inline"
        :style="{ height: '100vh', borderRight: 0 }"
      >
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              subnav 1
            </span>
          </template>
          <a-menu-item key="1">option1</a-menu-item>
          <a-menu-item key="2">option2</a-menu-item>
          <a-menu-item key="3">option3</a-menu-item>
          <a-menu-item key="4">option4</a-menu-item>
        </a-sub-menu>
      </a-menu>
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
        <!-- Content -->
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
  
  <script>
import { defineComponent } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "main-layout",
  components: {
    UserOutlined,
  },
  setup() {

    return {
      
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