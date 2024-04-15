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
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
            >Lưu</a-button
          >
        </template>

        <a-form-item :name="['noiDung']" label="Nội dung">
          <a-input v-model:value="formState.noiDung" disabled/>
        </a-form-item> 
        <a-form-item :name="['phanHoi']" label="Phản hồi">
          <a-textarea v-model:value="formState.phanHoi" />
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
      username: null,
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
    const handleOk = async () => {
        await axios.put(`${apiUrl.PHAN_HOI}?id=${wId.value}&data=${formState.phanHoi}`,{
            id: wId.value,
            data: formState.phanHoi
        })
        .then(res => {
            notification.open({
                message: 'Thông báo',
                description:'Sửa thông tin thành công',
                icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
            });
            visible.value = false;
        })
        .catch(er => {
            notification.open({
                message: "Lỗi",
                description: `Có lỗi xảy ra:${er}`,
                icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
            });
        })
    }
    // Hủy
    const handleCancel = () => {
      visible.value = false;
    };

    watch(wId, async (newValue, oldValue) => {
      if (newValue) {
        const token = sessionStorage.getItem("Token");
        loading.value = true;
        await axios
          .get(`${apiUrl.GET_Y_KIEN_BY_ID}?id=${newValue}`)
          .then((res) => {
            console.log(res.data);
            (formState.id = res.data.id),
              (formState.noiDung = res.data.noiDung),
              (formState.phanHoi = res.data.phanHoi),
              (formState.username = res.data.username);
              loading.value = false;
          })
          .catch((err) => {
            loading.value = false;
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
      handleOk,
    };
  },
  mounted() {},
});
</script>
    