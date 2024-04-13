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
        title="Sửa thông tin bài giới thiệu"
        @ok="handleOk"
        width="90%"
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

        <a-form-item :name="['tenBai']" label="Tên bài">
          <a-input v-model:value="formState.tenBai" />
        </a-form-item>

        <a-form-item label="Loại" :name="['loai']">
          <a-select v-model:value="formState.loai">
            <a-select-option value="Tin chuyên ngành"
              >Tin chuyên ngành</a-select-option
            >
            <a-select-option value="Thông tin chung"
              >Thông tin chung</a-select-option
            >
            <a-select-option value="Văn bản pháp lý"
              >Văn bản pháp lý</a-select-option
            >
            <a-select-option value="Nghiên cứu trao đổi"
              >Nghiên cứu trao đổi</a-select-option
            >
          </a-select>
        </a-form-item>

        <!-- ảnh -->
        <a-form-item :name="['anhDaiDien']" label="Ảnh đại diện">
          <a-button @click="handleUpload">
            <upload-outlined />
            chọn tệp
          </a-button>
          <input
            type="file"
            :accept="rulesUpload"
            @change="handleChangeFile"
            id="upload-phanHoi"
            class="class-input-hide"
          />
          <span
            v-if="formState.anhDaiDien && formState.anhDaiDien.name"
            class="file-name"
          >
            {{ formState.anhDaiDien.name }}
            <close-outlined
              style="color: black; cursor: pointer"
              @click="handleRemoveFile"
            />
          </span>
        </a-form-item>

        <a-form-item :name="['mota']" label="Mô tả">
          <a-textarea v-model:value="formState.mota" />
        </a-form-item>

      </a-modal>
    </a-form>
  </div>
</template>
      
      <script>
import { defineComponent, ref, reactive } from "vue";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons-vue";
import { auth } from "~/stores/auth";

export default defineComponent({
  components: {
    UploadOutlined,
    CloseOutlined,
  },
  setup(props, context) {
    const { $spaFetch, $apiUrl, $showToast } = useNuxtApp();
    const { $parseFileAndUpload, $toBinary } = useNuxtApp();
    const wId = ref("");
    const visible = ref(false);
    const formState = reactive({
      id: "",
      tenBai: null,
      mota: null,
      loai: null,
      noiDung: null,
      trangThai: null,
      anhDaiDien: null,
      vitri: null,
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
      tenBai: [
        {
          required: true,
          message: "Tên bài không được để trống!",
          trigger: "blur",
        },
      ],
      loai: [
        {
          required: true,
          message: "loại tin tức không được để trống!",
          trigger: "blur",
        },
      ],
      mota: [
        {
          required: true,
          message: "Mô tả không được để trống!",
          trigger: "blur",
        },
      ],
      noiDung: [
        {
          required: true,
          message: "Nội dung không được để trống!",
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
      const values = await formRef.value.validateFields();
      if (values && formState.anhDaiDien !== null) {
        $parseFileAndUpload(
          values.anhDaiDien,
          (res) => {
            loading.value = true;
            $spaFetch($apiUrl.ADD_TIN_TUC, {
              method: "POST",
              body: {
                ...values,
                id: formState.id,
                anhDaiDien: $toBinary(res.lstUrl[0].linkFile) || " ",
                lastModifiedBy: authStore.$state.token.userName || "admin",
                tenAnhDaiDien: values.anhDaiDien.name,
              },
            })
              .then(() => {
                loading.value = false;
                console.log("thanh cong");
                $showToast("Thêm mới thành công", "success");
                context.emit("lamMoiBang");
                visible.value = false;
              })
              .catch((e) => {
                loading.value = false;
                $showToast("Có lỗi xảy ra", "error");
              });
          },
          "",
          "api/QuanLyTinTuc/UploadFile",
          "",
          progressList
        );
      } else {
        $spaFetch($apiUrl.ADD_TIN_TUC, {
          method: "POST",
          body: formState,
        })
          .then(() => {
            loading.value = false;
            console.log("thanh cong");
            $showToast("Thêm mới thành công", "success");
            context.emit("lamMoiBang");
            visible.value = false;
          })
          .catch((e) => {
            loading.value = false;
            $showToast("Có lỗi xảy ra", "error");
          });
      }
    };
    // Hủy
    const handleCancel = () => {
      visible.value = false;
    };

    //upload ảnh
    const link = ref("");
    const formRef = ref(null);
    const authStore = auth();
    const progressList = ref([]);
    const rulesUpload = ref("image/PNG, image/jpeg");
    const handleUpload = () => {
      document.getElementById("upload-phanHoi").click();
    };

    const handleChangeFile = (e) => {
      const files = e.target.files;

      if (files && files.length > 0) {
        formState.anhDaiDien = files[0];
        link.value = URL.createObjectURL(formState.anhDaiDien);
      }

      document.getElementById("upload-phanHoi").value = "";
    };

    const handleRemoveFile = () => {
      formState.anhDaiDien = null;
    };

    return {
      editor,
      wId,
      visible,
      formState,
      layout,
      rules,
      loading,
      rulesUpload,
      link,
      formRef,
      authStore,
      progressList,
      showModal,
      onFinish,
      handleOk,
      handleCancel,
      handleUpload,
      handleChangeFile,
      handleRemoveFile,
    };
  },
});
</script>
      
  <style scoped>
.class-input-hide {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}

.file-name {
  font-weight: 600;
  color: var(--ant-primary-color);
  margin-left: 10px;
}
</style>