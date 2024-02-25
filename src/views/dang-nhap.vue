<template>
  <div class="wrap" style="background: #ececec; padding: 30px">
    <a-card
      title="Đăng Nhập"
      :bordered="false"
      style="width: 100vh;"
    >
      <div class="logo">
        <h1>VocaLearn</h1>
      </div>
      <a-form class="form_dang_nhap" :rules="rules">
        <a-form-item :name="['taiKhoan']" label="Tài khoản">
          <a-input v-model:value="formState.taiKhoan" />
        </a-form-item>
        <a-form-item :name="['matKhau']" label="Mật khẩu">
          <a-input-password v-model:value="formState.matKhau" />
        </a-form-item>

        <div class="btn_dang_nhap">
          <router-link to="/dang-ky">Bạn chưa có tài khoản?</router-link >
          <a-button type="primary" :disabled="disabled" @click="DangNhap" ghost>Đăng Nhập</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import axios from "axios";
import { computed, defineComponent, reactive } from "vue";
import apiUrl from "@/constants/api";
import { jwtDecode } from "jwt-decode";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons-vue';
import { h } from "vue";

export default defineComponent({
  name: "dang-nhap",
  components: {
    ExclamationCircleOutlined,
    CheckCircleOutlined
  },
  setup() {
    const store = useStore();
    const router = useRouter()
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
        router.push("trang-chu")
      })
      .catch(err => {
        console.log(err);
        notification.open({
            message: 'Lỗi',
            description: "Đăng nhập thất bại, kiểm tra lại tên đăng nhập và mật khẩu!!",
            icon: () => h(ExclamationCircleOutlined , { style: 'color: red' }),
        })
      })
    }

    return {
      formState,
      rules,
      disabled,
      store,
      router,
      DangNhap,
      
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