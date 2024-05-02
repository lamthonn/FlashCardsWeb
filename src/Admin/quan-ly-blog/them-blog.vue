<template>
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
          title="Thêm Blog"
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

          <a-form-item :name="['title']" label="Tiêu đề">
            <a-input v-model:value="formState.title" />
          </a-form-item> 

          <a-form-item :name="['description']" label="Nội dung">
            <a-textarea v-model:value="formState.description" />
          </a-form-item> 
  
          <div>
            <a-form-item style="text-align:center; margin-top:15px;">
              <a-button @click="handleUploadImage" >
                <upload-outlined />
                Chọn ảnh Blog
              </a-button>
              <a-button @click="handleOkSubmitImage" v-if="formState.AnhDaiDien !== null" style="margin-left:10px;">
                Lưu
              </a-button>
              <input
                type="file"
                @change="handleChangeFile"
                id="upload-phanHoi"
                :accept="uploadRule"
                class="class-input-hide"
              />
              <span
                v-if="formState.AnhDaiDien && formState.AnhDaiDien.name"
                class="file-name"
              >
                {{ formState.AnhDaiDien.name }}
                <close-outlined
                  style="color: black; cursor: pointer"
                  @click="handleRemoveFile"
                />
              </span>
            </a-form-item>
          </div>
        </a-modal>
      </a-form>
  </template>
        
        <script>
  import { defineComponent, ref,h, reactive } from "vue";
  import { UploadOutlined, 
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
        id: "",
        title: null,
        description: null,
        timeCreated: null,
        AnhDaiDien: null,
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
          title:[
              {
              required: true,
              message: "Tiêu đề không được để trống!",
              trigger: "blur",
              },
          ],
          description:[
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
        const values = {
          id:'0',
          title: formState.title,
          description:formState.description,
          AnhDaiDien:formState.AnhDaiDien,
        }
  
        await axios.post(apiUrl.THEM_BLOG,values)
        .then(res=> {
          notification.open({
              message: 'Thông báo',
              description:'Thêm thông tin thành công',
              icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
          });
          visible.value = false;
          context.emit('lamMoiBang')
        })
        .catch(err=> {
          notification.open({
              message: "Lỗi",
              description: `Có lỗi xảy ra:${err}`,
              icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
          });
        })
      };
      // Hủy
      const handleCancel = () => {
        visible.value = false;
      };
      const handleUploadImage = () => {
          document.getElementById("upload-phanHoi").click();
        }

      const handleOkSubmitImage = async () => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(formState.AnhDaiDien);

        reader.onload = async () => {
          const arrayBuffer = reader.result;
          const base64String = btoa(
              new Uint8Array(arrayBuffer)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );

          // Chuẩn bị dữ liệu để gửi đi
          const fileUpload = {
              contentBase64: base64String,
              fileName: formState.AnhDaiDien.name,
              contentType: formState.AnhDaiDien.type
          };
          try {
            // Gửi yêu cầu POST đến endpoint của backend để upload file
            await axios.post(apiUrl.UPDATE_BLOG, fileUpload)
            .then(async (res) => {
              await axios.put(apiUrl.UPDATE_BLOG,{
                id: formState,id,
                path: res.data
              })
              .then(resp => {
                notification.open({
                  message: 'Thông báo',
                  description:'Sửa ảnh Blog thành công',
                  icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
                });
              })
              .catch(err=> {
                notification.open({
                  message: 'Thông báo',
                  description:`Sửa ảnh Blog không thành công: ${err}`,
                  icon: () => h(ExclamationCircleOutlined, { style: "color: #108ee9" }),
                });
              })
            })
            .catch(er => {
              notification.open({
                message: 'Thông báo',
                description:`Sửa ảnh đại diện không thành công: ${er}`,
                icon: () => h(ExclamationCircleOutlined, { style: "color: #108ee9" }),
              });
            })

        
        } catch (error) {
            console.error('Error uploading file:', error);
            // Xử lý lỗi tại đây nếu cần
            throw error;
        }
        }          
      }

      const handleChangeFile =async (e) => {
        const files = e.target.files;

        if (files && files.length > 0) {
          formState.AnhDaiDien = files[0];
          link.value = URL.createObjectURL(formState.AnhDaiDien);
          console.log("link.value"+link.value);
        }

        console.log(formState.AnhDaiDien);

        const file = e.target.files[0];

        document.getElementById("upload-phanHoi").value = "";
      }
      const handleRemoveFile =() => {
        formState.AnhDaiDien = null;
        }
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
        handleUploadImage,
        handleOkSubmitImage,
        handleChangeFile,
        handleRemoveFile,
      };
    },
    // mounted(){
    //   this.getRole();
    // }
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

  .information-user {
  background-color: #f0f0f0; /* Màu xám */
  border-radius: 10px; /* Góc bo tròn */
  padding: 10px; /* Khoảng cách nội dung và viền */
}
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