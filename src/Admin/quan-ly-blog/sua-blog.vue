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
            title="Xem thông tin Blog"
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
                <a-input v-model:value="formState.description" />
            </a-form-item> 
    
            <a-form-item :name="['AnhDaiDien']" label="Ảnh Blog">
                <a-input v-model:value="formState.AnhDaiDien" />
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
        id: null,
        title: null,
        description: null,
        AnhDaiDien: null,
      });
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
        const userId = sessionStorage.getItem('userId')
        const values = {
          id: formState.id,
          title: formState.title,
          description:formState.description,
          AnhDaiDien:formState.AnhDaiDien,
        }
          await axios.put(`${apiUrl.SUA_BLOG}?id=${formState.id}`,values)
          .then(res => {
              notification.open({
                  message: 'Thông báo',
                  description:'Sửa thông tin thành công',
                  icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
              });
              visible.value = false;
              context.emit('lamMoiBang')
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
            .get(`${apiUrl.GET_USER_BY_ID}?id=${newValue}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              (formState.id = res.data.id),
                (formState.diaChi = res.data.diaChi),
                (formState.email = res.data.email),
                (formState.gioiTinh = res.data.gioiTinh),
                (formState.username = res.data.username),
                (formState.ten = res.data.ten),
                (formState.role = res.data.role),
                (formState.soDienThoai = res.data.soDienThoai);
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
        rules,
        showModal,
        onFinish,
        handleCancel,
        handleOk,
      };
    },
    mounted() {},
  });
  </script>