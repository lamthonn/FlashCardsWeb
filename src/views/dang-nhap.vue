<template>
  <div class="wrap" style="background: #ececec; padding: 30px" >
    <a-card
      title="Đăng Nhập"
      :bordered="false"
      style="width: 100vh;"
      :loading="loading"
    >
      <div class="logo">
        <h1>VocaLearn</h1>
      </div>
      <a-form class="form_dang_nhap" :rules="rules">
        <a-form-item :name="['taiKhoan']" label="Tài khoản">
          <a-input v-model:value="formState.taiKhoan" @keyup.enter="DangNhap"/>
        </a-form-item>
        <a-form-item :name="['matKhau']" label="Mật khẩu">
          <a-input-password v-model:value="formState.matKhau" @keyup.enter="DangNhap"/>
        </a-form-item>

        <div class="btn_dang_nhap">
          <router-link to="/dang-ky">Bạn chưa có tài khoản?</router-link >
          <a-button type="primary" :disabled="disabled" @click="DangNhap"  ghost>Đăng Nhập</a-button>
        </div>
        <div id="login" style="font-size:16px; text-align:center; margin-top:15px;">
          <a-button @click="loginWithFacebook" type="primary">
            <FacebookOutlined 
              style="font-size:16px;"
            />
          login with facebook</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import axios from "axios";
import { computed, defineComponent, reactive, ref } from "vue";
import apiUrl from "@/constants/api";
import { jwtDecode } from "jwt-decode";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  FacebookOutlined,
} from '@ant-design/icons-vue';
import { h } from "vue";
import firebaseConfig from '@/constants/firebaseConfig'
import { getAuth, signInWithPopup, FacebookAuthProvider, signOut} from 'firebase/auth';
firebaseConfig
const provider = new FacebookAuthProvider();
const auth = getAuth();


export default defineComponent({
  name: "dang-nhap",
  components: {
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    FacebookOutlined
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);
    const isSignIn = ref(false);
    const formState = reactive({
      taiKhoan: null,
      matKhau: null,
    });
    const disabled = computed(() => {
      return !(formState.taiKhoan && formState.matKhau);
    });

    const rules ={
      taiKhoan: [
        {
          required: true,
          message: "Tài khoản không được để trống",
          trigger: "blur",
        },
      ],
      matKhau: [
        {
          required: true,
          message: "Mật khẩu người dùng không được để trống",
          trigger: "blur",
        },
      ],
    }

    const DangNhap = () => {
      loading.value = true;
      axios.post(apiUrl.DANG_NHAP,{
        "username":formState.taiKhoan,
        "password":formState.matKhau
      })
      .then(res => {
        const token = res.data
        const respone = jwtDecode(token);
        store.commit("LOGIN",token);
        sessionStorage.setItem("Username", respone.Username);
        sessionStorage.setItem("Role", respone.Role)
        sessionStorage.setItem("userId", respone.Id)
        notification.open({
            message: 'Thông Báo',
            description:
              'Đăng nhập thành công!!.',
            icon: () => h(CheckCircleOutlined, { style: 'color: #108ee9' }),
        });
        router.push("trang-chu");
        loading.value = false;
      })
      .catch(err => {
        console.log(err);
        notification.open({
            message: 'Lỗi',
            description: "Đăng nhập thất bại, kiểm tra lại tên đăng nhập và mật khẩu!!",
            icon: () => h(ExclamationCircleOutlined , { style: 'color: red' }),
        });
        loading.value = false;
      })
    }

    const loginWithFacebook = () => {
      loading.value = true;
      signInWithPopup(auth,provider)
      .then((result) =>{
        const token = result.user.accessToken
        const respone = jwtDecode(token);
        console.log(convertTimestampToDateTime(respone.exp));
                                                                          
        axios.post(apiUrl.DANG_KY_FACEBOOK,{
          "id":respone.user_id,
          "username":formState.taiKhoan || "123",
          "password":formState.matKhau|| "123",
          "email":respone.email,
          "ten":respone.name,
          "ngaySinh":Date.now().toString(),
          "gioiTinh":"Chưa có thông tin!",
          "soDienThoai":"Chưa có thông tin!",
          "diaChi":"Chưa có thông tin!",
        })
        .then(res => {
          store.commit("LOGIN",token);
          sessionStorage.setItem("Username", res.data.ten);
          sessionStorage.setItem("Role", 2)
          sessionStorage.setItem("userId", res.data.id)
          router.push("trang-chu");
          notification.open({
              message: 'Thông Báo',
              description:
                'Đăng nhập thành công!!.',
              icon: () => h(CheckCircleOutlined, { style: 'color: #108ee9' }),
          });

          loading.value = false;
        })
        .catch(err => {
          console.log(err);
          notification.open({
              message: 'Lỗi',
              description: "Đăng nhập thất bại, kiểm tra lại tên đăng nhập và mật khẩu!!",
              icon: () => h(ExclamationCircleOutlined , { style: 'color: red' }),
          });
          loading.value = false;
        })
        // sessionStorage.setItem("Token",token);
        // sessionStorage.setItem("userId",respone.user_id);
        // sessionStorage.setItem("Username", respone.name);
        // sessionStorage.setItem("Role", 2);
        // console.log(respone);
      })
      .catch((error) => {
        console.log(error);
      })
    }

    const convertTimestampToDateTime = (timestamp) => {
      // Tạo một đối tượng Date từ timestamp
      const date = new Date(timestamp * 1000);
      
      // Lấy các giá trị ngày, tháng, năm và giờ, phút, giây
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      
      // Trả về ngày và giờ dưới dạng chuỗi
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    return {
      formState,
      rules,
      disabled,
      store,
      router,
      loading,
      DangNhap,
      loginWithFacebook,convertTimestampToDateTime
    };
  },
});
</script>

<style scoped>
.wrap {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form_dang_nhap{
  padding: 20px 60px;
}
.btn_dang_nhap{
  display: flex;
  justify-content: space-around;
}

.logo, .logo h1{
  font-size: 4rem;
  display: flex;
  justify-content: center;
  font-family: "Anta", sans-serif;
  font-style: normal;
  padding: 0;
  margin: 0;
}
</style>