<template>
  <div class="wrap" style="background: #ececec; padding: 30px">
    <a-card title="Đăng Ký" :bordered="false" style="width: 100vh" :loading="loading">
      <div class="logo">
        <h1>VocaLearn</h1>
      </div>
      <a-form class="form_dang_nhap" :rules="rules">
        <a-form-item :name="['tenNguoiDung']" label="Tên người dùng">
          <a-input v-model:value="formState.tenNguoiDung" @keyup.enter="DangKy"/>
        </a-form-item>
        <a-form-item :name="['taiKhoan']" label="Tài khoản">
          <a-input v-model:value="formState.taiKhoan" @keyup.enter="DangKy"/>
        </a-form-item>
        <a-form-item :name="['matKhau1']" label="Mật khẩu">
          <a-input-password v-model:value="formState.matKhau1" @keyup.enter="DangKy"/>
        </a-form-item>
        <a-form-item :name="['matKhau2']" label="Nhập lại mật khẩu">
          <a-input-password v-model:value="formState.matKhau2" @keyup.enter="DangKy"/>
        </a-form-item>

        <div class="btn_dang_nhap">
          <router-link to="/dang-nhap">Bạn đã có tài khoản?</router-link>
          <a-button type="primary" :disabled="disabled" @click="DangKy"  ghost>Đăng Ký</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>
  
  <script>
import apiUrl from "@/constants/api";
import { h, ref } from "vue";
import { computed, defineComponent, reactive } from "vue";
import axios from "axios";
import { notification } from "ant-design-vue";
import { 
  CheckCircleOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons-vue';
import { useRouter } from "vue-router";

export default defineComponent({
  name: "dang-ky",
  components: {
    CheckCircleOutlined,
    ExclamationCircleOutlined 
  },
  setup() {
    const loading = ref(false);
    const formState = reactive({
      tenNguoiDung: null,
      taiKhoan: null,
      matKhau1: null,
      matKhau2: null,
    });
    const router = useRouter()
    const disabled = computed(() => {
      return !(formState.tenNguoiDung && formState.taiKhoan && formState.matKhau1 && formState.matKhau2);
    });

    const rules = {
      tenNguoiDung: [
        {
          required: true,
          message: "Tên người dùng không được để trống!",
          trigger: "blur",
        },
      ],
      taiKhoan: [
        {
          required: true,
          message: "Tài khoản dùng không được để trống!",
          trigger: "blur",
        },
      ],
      matKhau1: [
        {
          required: true,
          message: "Mật khẩu người dùng không được để trống!",
          trigger: "blur",
        },
      ],
      matKhau2: [
        {
          required: true,
          message: "Chưa nhập lại mật khẩu!",
          trigger: "blur",
        },
      ],
    };

    const DangKy =() => {
      loading.value = true;
        if(formState.matKhau1 === formState.matKhau2){
          axios.post(apiUrl.DANG_KY,{
            "id":"0",
            "username": formState.taiKhoan,
            "password": formState.matKhau1,
            "ten": formState.tenNguoiDung,
            "roleIds": [
                2
            ]
          })
          .then(() => {
            notification.open({
              message: 'Thông Báo',
              description:
              'Đăng ký thành công!!.',
              icon: () => h(CheckCircleOutlined, { style: 'color: #108ee9' }),
            });
            router.push("/dang-nhap");
            loading.value = false;
          })
          .catch((err)=> {
            console.log(err);
            notification.open({
                message: 'Lỗi',
                description: "Tài khoản đã tồn tại!!",
                icon: () => h(ExclamationCircleOutlined , { style: 'color: red' }),
            })
            loading.value = false;
          })
        }
        else{
          notification.open({
              message: 'Lỗi',
              description:
                'Mật khẩu không giống nhau!!.',
              icon: () => h(ExclamationCircleOutlined, { style: 'color: red' }),
          });
        }
    }

    return {
      formState,
      rules,
      disabled,
      router,
      loading,
      DangKy,
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
.form_dang_nhap {
  padding: 20px 60px;
}
.btn_dang_nhap {
  display: flex;
  justify-content: space-around;
}

.logo,
.logo h1 {
  font-size: 4rem;
  display: flex;
  justify-content: center;
  font-family: "Anta", sans-serif;
  font-style: normal;
  padding: 0;
  margin: 0;
}
</style>