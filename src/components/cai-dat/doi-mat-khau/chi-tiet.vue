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

        <a-form-item :name="['oldPasswordRepeat']" label="Nhập lại mật khẩu">
          <a-input v-model:value="formState.oldPasswordRepeat" />
        </a-form-item>

        <a-form-item :name="['newPassword']" label="Mật khẩu mới">
          <a-input v-model:value="formState.newPassword" />
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
      oldPasswordRepeat: null,
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
      username: [
        {
          required: true,
          message: "Username không được để trống!",
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