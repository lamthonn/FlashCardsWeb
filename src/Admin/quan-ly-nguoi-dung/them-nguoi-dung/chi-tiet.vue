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
        title="Thêm thông tin người dùng"
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

        <a-form-item :name="['username']" label="Username">
          <a-input v-model:value="formState.username" />
        </a-form-item> 

        <a-form-item :name="['ten']" label="Tên người dùng">
          <a-input v-model:value="formState.ten" />
        </a-form-item> 

        <a-form-item :name="['email']" label="Email">
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item :name="['password']" label="Password">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :name="['ngaySinh']" label="Ngày sinh">
            <a-date-picker v-model:value="formState.ngaySinh" />
        </a-form-item>
        
        <a-form-item :name="['gioiTinh']" label="Giới tính">
            <a-radio-group v-model:value="formState.gioiTinh" :options="plainOptions" />
        </a-form-item>

        <a-form-item :name="['soDienThoai']" label="Số điện thoại">
          <a-input v-model:value="formState.soDienThoai" />
        </a-form-item>

        <a-form-item :name="['diaChi']" label="Địa chỉ">
          <a-input v-model:value="formState.diaChi" />
        </a-form-item>

        <a-form-item :name="['role']" label="Quyền">
          <a-select v-model:value="formState.role" >
            <a-select-item v-for="item in RoleUser" :key="item.id" :value="item.name">
                {{ item.name }}
            </a-select-item>
          </a-select>
        </a-form-item>
      </a-modal>
    </a-form>
  </div>
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
    const plainOptions = ['Nam', 'Nữ']
    const RoleUser = ref([])
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
      role:null
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
        username:[
            {
            required: true,
            message: "Username không được để trống!",
            trigger: "blur",
            },
        ],
        password:[
            {
            required: true,
            message: "Password không được để trống!",
            trigger: "blur",
            },
        ],
        ten:[
            {
            required: true,
            message: "Tên người dùng không được để trống!",
            trigger: "blur",
            },
        ],
        email:[
            {
            required: true,
            message: "Tên người dùng không được để trống!",
            trigger: "blur",
            },
        ],
        gioiTinh:[
            {
            required: true,
            message: "Tên người dùng không được để trống!",
            trigger: "blur",
            },
        ],
        ngaySinh:[
            {
            required: true,
            message: "Tên người dùng không được để trống!",
            trigger: "blur",
            },
        ],
        role:[
            {
            required: true,
            message: "Quyền không được để trống!",
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
      const values = {
        id:'0',
        username: formState.username,
        ten:formState.ten,
        password:formState.password,
        email:formState.email,
        ngaySinh:formState.ngaySinh,
        gioiTinh:formState.gioiTinh,
        soDienThoai:formState.soDienThoai,
        diaChi:formState.diaChi,
        role:formState.role,
        userId: userId
      }

      await axios.post(apiUrl.ADD_USER,values)
      .then(res=> {
        notification.open({
            message: 'Thông báo',
            description:'Sửa thông tin thành công',
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

    const getRole = async () => {
        axios.get(apiUrl.GET_ALL_ROLE)
        .then(res => {
            console.log(res.data);
            RoleUser.value = res.data
        })
        .catch(err => {
            console.log(err);
        })
    }
    

    return {
      wId,
      visible,
      formState,
      rules,
      layout,
      loading,
      RoleUser,
      showModal,
      onFinish,
      handleOk,
      handleCancel,
      getRole,
      plainOptions,
    };
  },
  mounted(){
    this.getRole();
  }
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