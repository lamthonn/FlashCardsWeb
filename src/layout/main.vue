<template>
  <a-layout-header class="header">
    <a-row style="display:flex; align-items:center;">
      <a-col :span="1"></a-col>
      <a-col theme="light" mode="horizontal" :style="{ lineHeight: '60px' }" :span="6">
        <div
          key="1"
          style="font-family: 'Anta', sans-serif; font-size: 2rem;"
          @click="returnToTrangChu"
          >VocaLearn</div
        >
      </a-col>
      <a-col :span="9" >
        <a-input placeholder="Tìm kiếm nhanh ...">
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
      </a-col>

      <a-col :span="1" style="margin-left:2rem">
        <!-- <a-badge count="5">
          <a-avatar shape="square" size="large" >
            <template #icon>
              <BellOutlined />
            </template>
          </a-avatar>
        </a-badge> -->
      </a-col>
      <a-col :span="4">
        <a-button type="primary" style="background-color:#ffcd1f; color:black; width:100%;font-weight: bold;"  :loading="loading">Nâng cấp: VocaLearn Premium</a-button>
      </a-col>
    </a-row>
  </a-layout-header>
  <a-layout>
    <a-layout-sider width="230" style="background: #fff">
      <a-card style="text-align:center;">
        <template #cover >
          <div style="text-align:center; margin-top:1rem;">
            <a-avatar :size="64" :src="link ? link : 'https://cdn4.iconfinder.com/data/icons/profession-avatar-5/64/29-programmer-512.png'">
            </a-avatar>
          </div>
        </template>
        <a-card-meta :title="formState.tenNguoiDung">
          <template #description>{{ formState.username || formState.email }}</template>
        </a-card-meta>
      </a-card>
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        v-model:openKeys="state.openKeys"
        :inline-collapsed="state.collapsed"
        mode="inline"
        :style="{ height: '100vh', borderRight: 0 }"
        :items="menu"
        @click="handleClick"
      >
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
        <slot></slot>
        
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Voca Learn ©2024 Created by Lam Vu, Dinh Hai
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
  
  <script>
import { defineComponent, reactive, ref,h } from "vue";
import menuDefaut from "@/constants/menu.js";
import menuAdminDefaut from "@/constants/menuAdmin";
import { 
  UserOutlined,
  SearchOutlined ,
  BellOutlined ,
  CheckCircleOutlined,
  ExclamationCircleOutlined
 } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import axios from "axios";
import apiUrl from "@/constants/api";
import firebaseConfig from '@/constants/firebaseConfig'
import { getAuth, FacebookAuthProvider, signOut} from 'firebase/auth';
firebaseConfig
const provider = new FacebookAuthProvider();
const auth = getAuth();
import { notification } from "ant-design-vue";


export default defineComponent({
  name: "main-layout",
  components: {
    UserOutlined,
    SearchOutlined ,
    BellOutlined ,
    CheckCircleOutlined,
    ExclamationCircleOutlined
  },
  setup() {
    const link = ref("");
    const role = ref('');
    const loading = ref(false);
    const router = useRouter();
    const menu = ref([]);
    const state = reactive({
      collapsed: false,
      selectedKeys: [''],
      openKeys: [''],
    });

    const formState = reactive({
      tenNguoiDung: "",
      username:"",
      email:""
    })

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
      if(val.key === "QuanLyUser"){
        router.push("/quan-ly-nguoi-dung");
        loading.value = false;
      }
      if(val.key === "DongGop"){
        router.push("/dong-gop");
        loading.value = false;
      }
      if(val.key === "HocPhan"){
        router.push("/hoc-phan");
        loading.value = false;
      }
      if(val.key === "ThuMuc"){
        router.push("/thu-muc");
        loading.value = false;
      }
      if(val.key === "LienHe"){
        router.push("/lien-he");
        loading.value = false;
      }
      if(val.key === "CaiDat"){
        router.push("/cai-dat");
        loading.value = false;
      }
      if(val.key === "QuanLyYKienDongGop"){
        router.push("/quan-ly-y-kien-dong-gop");
        loading.value = false;
      }
      
      if(val.key === "DangXuat"){
        sessionStorage.removeItem("Token");
        sessionStorage.removeItem("Role");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("Username");
        signOut(auth);

        router.push("/dang-nhap")
        loading.value = false;
      }

    }

    const returnToTrangChu = () => {
      router.push("/trang-chu");
    }

    const getUserById = async (id) => {
      const token = sessionStorage.getItem('Token');

      await axios.get(`${apiUrl.GET_USER_BY_ID}?id=${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then( res => {
          formState.tenNguoiDung = res.data.ten;
          formState.username = res.data.username;
          formState.email = res.data.email;
        })
        .catch(err => {
          notification.open({
              message: "Lỗi",
              description: "Có lỗi xảy ra!",
              icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
          });
        })
    }

    const validateAccessToken = async (token) => {
      try {
        const response = await axios.post(apiUrl.CHECK_TOKEN_FACEBOOK, {
          accessToken: token
        });

        return response.data.isValid;
      } catch (error) {
        console.error('Error validating access token:', error);
        return false;
      }
    }

    const getAvt = () => {
      const userId = sessionStorage.getItem("userId");
      const role_User = sessionStorage.getItem("Role");
      if(role_User === "User")
      {
        axios.get(`${apiUrl.GET_AVATAR}?id=${userId}`, { responseType: 'blob' })
        .then(resa => {
          var url = URL.createObjectURL(resa.data);
          link.value = url;

          console.log(link.value);
        })
        .catch(er => {
          // notification.open({
          //     message: "Lỗi",
          //     description: "Có lỗi xảy ra!",
          //     icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
          // });
          console.log(er);
        })
      }
    }
    // const getAvt = () => {
    //       const userId = sessionStorage.getItem("userId");

    //       axios.get(`${apiUrl.GET_AVATAR}?id=${userId}`, { responseType: 'blob' })
    //       .then(resa => {
    //         console.log(resa);
    //         // const blob = new Blob([resa]);
    //         var url = URL.createObjectURL(resa.data);
    //         link.value = url;

    //         console.log(url);
    //       })
    //       .catch(er => {
    //         console.log(er);
    //       })
    //     }

    const getRole = () => {
      role.value = sessionStorage.getItem('Role')
    }

    const getMenu = async () => {
      if(role.value === "User"){
        menu.value = menuDefaut;
      }
      if(role.value === "Admin")
      {
        menu.value = menuAdminDefaut;
      }
    }
    return {
      state,
      menu,
      loading,
      router,
      link,
      role,
      formState,
      handleClick,
      returnToTrangChu,
      getUserById,
      validateAccessToken,
      getAvt,
      getRole,
      getMenu
    };
  },
  computed:{
    breadcrumbs() {
        return this.$route.matched.map(route => ({
            title: route.meta.breadcrumb,
            path: route.path
        }))
    }
  },
  mounted(){
    const UserId = sessionStorage.getItem("userId");
    this.getUserById(UserId);
    this.getAvt();
    this.getRole();
    this.getMenu();
  }
});
</script>
  
  <style scoped>
  .avata{
    width: 100%;
    max-height: 200px;
  }
</style>