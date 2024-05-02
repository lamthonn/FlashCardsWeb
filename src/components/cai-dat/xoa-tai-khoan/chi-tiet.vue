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
        title="Xóa tài khoản"
        @ok="handleOk"
        width="700px"
        :centered="true"
      >
        <template #footer>
          <a-button key="back" @click="handleCancel">Đóng</a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
            >Lưu</a-button
          >
        </template>

        <a-form-item :name="['Password']" label="Mật khẩu">
          <a-input v-model:value="formState.Password" />
        </a-form-item>

      </a-modal>
    </a-form>
  </div>
</template>
          
          <script>
import { defineComponent, ref, h, reactive } from "vue";
import {
  UploadOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";
import apiUrl from "@/constants/api";
import { notification } from "ant-design-vue";

export default defineComponent({
  components: {
    UploadOutlined,
    CloseOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
  },
  setup(props, context) {
    const wId = ref("");
    const visible = ref(false);
    const formState = reactive({
      Password: null,
    });
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const rules = {
      Password: [
        {
          required: true,
          message: "Mật khẩu không được để trống!",
          trigger: "blur",
        },
      ],
    };
    const loading = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    // Handle các lỗi trên form
    const onFinish = (values) => {};
    // Lưu
    const handleOk = async () => {
        const userId = sessionStorage.getItem('userId')
        axios.delete(`${apiUrl.DELETE_ACCOUNT}?userId=${userId}`,{
            oldPassword: formState.Password
        })
        .then(res=> {
          notification.open({
            message: 'Thông báo',
            description:`Xóa tài khoảns thành công`,
            icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
          });
          visible.value = false;
        })
        .catch(er => {
            notification.open({
              message: 'Lỗi',
              description:`Có lỗi xảy ra: ${er}`,
              icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
            });
            visible.value = false;
        })
    };
    // Hủy
    const handleCancel = () => {
      visible.value = false;
    };

    return {
      wId,
      visible,
      formState,
      rules,
      layout,
      loading,
      showModal,
      onFinish,
      handleOk,
      handleCancel,
    };
  },
  mounted() {},
});
</script>