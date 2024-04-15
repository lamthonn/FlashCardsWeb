<template>
  <div>
    <a-form
      :model="formState"
      ref="formRef"
      v-bind="layout"
      name="nest-messages"
      :rules="rules"
      @finish="onFinish"
    >
      <a-modal
        v-model:visible="visible"
        title="Xem thông tin người dùng"
        @ok="handleOk"
        width="700px"
        :centered="true"
      >
        <template #footer>
          <a-button key="back" @click="handleCancel">Đóng</a-button>
        </template>

        <a-form-item :name="['username']" label="Username">
          <TextBox >{{ formState.username }}</TextBox>
        </a-form-item>

        <a-form-item :name="['ten']" label="Tên người dùng">
          <TextBox >{{formState.ten}}</TextBox>
        </a-form-item>

        <a-form-item :name="['email']" label="Email">
          <TextBox >{{formState.email}}</TextBox>
        </a-form-item>

        <a-form-item :name="['ngaySinh']" label="Ngày sinh">
          <TextBox >{{formState.ngaySinh}}</TextBox>
        </a-form-item>

        <a-form-item :name="['gioiTinh']" label="Giới tính">
          <TextBox>{{ formState.gioiTinh }}</TextBox>
        </a-form-item>

        <a-form-item :name="['soDienThoai']" label="Số điện thoại">
          <TextBox>{{ formState.soDienThoai }}</TextBox>
        </a-form-item>

        <a-form-item :name="['diaChi']" label="Địa chỉ">
          <TextBox >{{ formState.diaChi }}</TextBox>
        </a-form-item>

        <a-form-item :name="['role']" label="Quyền">
          <TextBox >{{ formState.role }}</TextBox>
        </a-form-item>
      </a-modal>
    </a-form>
  </div>
</template>
        
        <script>
import { defineComponent, ref, h, reactive, watch } from "vue";
import {
  UploadOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";
import apiUrl from "@/constants/api";
import { notification } from "ant-design-vue";
import TextBox from '@/components/common/text-box.vue';

export default defineComponent({
  components: {
    TextBox,
    UploadOutlined,
    CloseOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
  },
  setup(props, context) {
    const wId = ref("");
    const visible = ref(false);
    const formState = reactive({
      id: "",
      username: null,
      email: null,
      password: null,
      ten: null,
      ngaySinh: null,
      gioiTinh: null,
      soDienThoai: null,
      diaChi: null,
      role: null,
    });
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };
    
    const loading = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    // Handle các lỗi trên form
    const onFinish = (values) => {};
    // Lưu
    
    // Hủy
    const handleCancel = () => {
      visible.value = false;
    };

    watch(wId,async(newValue, oldValue) => {
      if (newValue){
        const token = sessionStorage.getItem('Token');
        loading.value = true;
        await axios.get(`${apiUrl.GET_USER_BY_ID}?id=${newValue}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        .then(res => {
          console.log(res.data);
          formState.id = res.data.id,
          formState.diaChi = res.data.diaChi,
          formState.email = res.data.email,
          formState.gioiTinh = res.data.gioiTinh,
          formState.ngaySinh = res.data.ngaySinh,
          formState.username = res.data.username,
          formState.ten = res.data.ten,
          formState.role = res.data.role,
          formState.soDienThoai = res.data.soDienThoai
        })
        .catch(err => {
          notification.open({
              message: "Lỗi",
              description: `Có lỗi xảy ra:${err}`,
              icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
          });
        })
      }
    })

    return {
      wId,
      visible,
      formState,
      layout,
      loading,
      showModal,
      onFinish,
      handleCancel,
    };
  },
  mounted() {
  },
});
</script>
        