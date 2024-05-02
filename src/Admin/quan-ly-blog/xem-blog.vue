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
          title="Xem Blog"
          @ok="handleOk"
          width="700px"
          :centered="true"
        >
          <template #footer>
            <a-button key="back" @click="handleCancel">Đóng</a-button>
          </template>
  
          <a-form-item :name="['title']" label="Tiêu đề">
            <TextBox >{{ formState.title }}</TextBox>
          </a-form-item>
  
          <a-form-item :name="['description']" label="Nội dung">
            <TextBox >{{formState.description}}</TextBox>
          </a-form-item>
  
          <a-form-item :name="['AnhDaiDien']" label="Ảnh Blog">
            <TextBox >{{formState.AnhDaiDien}}</TextBox>
          </a-form-item>
  
          <a-form-item :name="['timeCreated']" label="Ngày đăng tải">
            <TextBox >{{formState.timeCreated}}</TextBox>
          </a-form-item>
  
        </a-modal>
      </a-form>
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
    name:'xemBlog',
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
        title: null,
        description: null,
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
          