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
        title="Xem chi tiết ý kiến"
        @ok="handleOk"
        width="700px"
        :centered="true"
      >
        <template #footer>
          <a-button key="back" @click="handleCancel">Đóng</a-button>
        </template>

        <a-form-item :name="['noiDung']" label="Nội dung">
          <TextBox>{{ formState.noiDung }}</TextBox>
        </a-form-item>

        <a-form-item :name="['phanHoi']" label="Phản hồi">
          <TextBox>{{ formState.phanHoi }}</TextBox>
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
import TextBox from "@/components/common/text-box.vue";

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
      noiDung: null,
      phanHoi: null,
      
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

    watch(wId, async (newValue, oldValue) => {
      if (newValue) {
        loading.value = true;
        await axios
          .get(`${apiUrl.GET_Y_KIEN_BY_ID}?id=${newValue}`)
          .then((res) => {
            console.log(res.data);
            formState.id = res.data.id,
            formState.noiDung = res.data.noiDung,
            formState.phanHoi = res.data.phanHoi
          })
          .catch((err) => {
            notification.open({
              message: "Lỗi",
              description: `Có lỗi xảy ra:${err}`,
              icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
            });
          });
      }
    });

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
  mounted() {},
});
</script>
          