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
        title="Đổi mật khẩu"
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

        <a-form-item :name="['oldPassword']" label="Mật khẩu hiện tại">
          <a-input v-model:value="formState.oldPassword" />
        </a-form-item>

        <a-form-item :name="['newPassword']" label="Mật khẩu mới">
          <a-input-password v-model:value="formState.newPassword" />
        </a-form-item>

        <a-form-item :name="['newPasswordRepeat']" label="Nhập lại mật khẩu">
          <a-input v-model:value="formState.newPasswordRepeat" />
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
      oldPassword: null,
      newPasswordRepeat: null,
      newPassword: null,
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
      oldPassword: [
        {
          required: true,
          message: "Mật khẩu hiện tại không được để trống!",
          trigger: "blur",
        },
      ],
      newPasswordRepeat: [
        {
          required: true,
          message: "Chưa nhập lại mật khẩu!",
          trigger: "blur",
        },
      ],
      newPassword: [
        {
          required: true,
          message: "Mật khẩu mới không được để trống!",
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
      try {
        if(formState.newPassword === formState.newPasswordRepeat){
        axios.put(`${apiUrl.CHANGED_PASSWORD}?userId=${userId}`,{
          userId: userId,
          oldPassword: formState.oldPassword,
          newPassword: formState.newPassword
        })
        .then(res=> {
          notification.open({
            message: 'Thông báo',
            description:`Đổi mật khẩu thành công`,
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
      }
      else{
        notification.open({
          message: 'Lỗi',
          description:`mật khẩu chưa trùng nhau`,
          icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
        });
        visible.value = false;
      }
      } catch (error) {
        notification.open({
          message: 'Lỗi',
          description:`Mật khẩu không đúng`,
          icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
        });
      }
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