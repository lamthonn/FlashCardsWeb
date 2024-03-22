<template>
  <MainLayout >
    <a-row>
      <a-col :flex="1">
        <div class="image-user" style="display: flex; justify-content: center;">
          <a-image  :width="300" :style="{ borderRadius: '50%'}" src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
        </div>
        
        <div style=" justify-content: center;" class="information-user">
          <a-space style="display: flex;justify-content: center; ">
            <a-button type="primary" title="Sửa thông tin người dùng" :centered="true" @click="showModal"><EditOutlined />Sửa trang cá nhân</a-button>   
          </a-space>    
          <ul class="content-infor-user" style="list-style-type: none; margin-top:1rem">
            <li style="display: flex;">
              <p class="titleInforUser userName" style="width: 30%;">Username:</p>
              <p class="contentInforUser userName">{{ informationUser.username }}</p>
            </li>
            <li style="display: flex;">
              <p class="titleInforUser tenNguoiDung" style="width: 30%;">Tên người dùng:</p>
              <p class="contentInforUser tenNguoiDung">{{ informationUser.tenNguoiDung }}</p>
            </li>
            <li style="display: flex;">
              <p class="titleInforUser email" style="width: 30%;">Email:</p>
              <p class="contentInforUser email">{{ informationUser.email }}</p>
            </li>
            <li style="display: flex;">
              <p class="titleInforUser diaChi" style="width: 30%;">Địa chỉ:</p>
              <p class="contentInforUser diaChi">{{ informationUser.diaChi }}</p>
            </li>
            
            <li style="display: flex;">
              <p class="titleInforUser gioiTinh" style="width: 30%;">Giới tính:</p>
              <p class="contentInforUser gioiTinh">{{ informationUser.gioiTinh }}</p>
            </li>
            <li style="display: flex;">
              <p class="titleInforUser ngaySinh " style="width: 30%;">Ngày sinh:</p>
              <p class="contentInforUser ngaySinh">{{ informationUser.ngaySinh }}</p>
            </li>
            <li style="display: flex;">
              <p class="titleInforUser ngaySinh" style="width: 30%;">Số điện thoại:</p>
              <p class="contentInforUser ngaySinh">{{ informationUser.sdt }}</p>
            </li>
          </ul>
        </div>
      </a-col>
      <a-col :flex="4">3 / 5</a-col>
    </a-row>
    <a-modal v-model:open="visible" width="40%" title="Sửa thông tin người dùng" :centered="true" @ok="checkAndEditUser" class="editInforUser">
    <div>
        <a-form-item>
            <a-input addonBefore="Họ và tên" v-model:value="informationUser.tenNguoiDung" placeholder="Họ và tên" allow-clear />
        </a-form-item>
        <a-form-item>
            <a-input addonBefore="Địa chỉ" v-model:value="informationUser.diaChi" placeholder="Địa chỉ" allow-clear />
        </a-form-item>
        <a-form-item>
            <a-input addonBefore="Email" v-model:value="informationUser.email" placeholder="Email" allow-clear />
        </a-form-item>
        <a-form-item>
            <p>Giới tính:</p>
            <a-radio-group v-model:value="informationUser.gioiTinh">
                <a-radio value="Nam">Nam</a-radio>
                <a-radio value="Nữ">Nữ</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item>
            <a-input addonBefore="Ngày sinh" v-model:value="informationUser.ngaySinh" placeholder="Ngày sinh" allow-clear />
        </a-form-item>           
        <a-form-item>
            <a-input addonBefore="Số điện thoại" v-model:value="informationUser.sdt" placeholder="Số điện thoại" allow-clear />
        </a-form-item>
    </div>
</a-modal>

    

  </MainLayout>
</template>

<script>
import MainLayout from "@/layout/main.vue";
import { defineComponent, reactive , ref,watch,h } from "vue";
import apiUrl from "@/constants/api";
import axios from "axios";
import { notification  } from 'ant-design-vue';

import {  
  EditOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
    components:{
      MainLayout,
      EditOutlined,
      ExclamationCircleOutlined
    },
    setup(){
      const informationUser = reactive({
        tenNguoiDung: "",
        username:"",
        email:"",
        diaChi:"",
        gioiTinh:"",
        ngaySinh:"",
        sdt:"",
      });
      const visible = ref(false);
      const record = ref(null);

      const getUserById = async () => {
        try {
          const token = sessionStorage.getItem('Token');
          const id = sessionStorage.getItem('userId');
          console.log("id:",id);
          const response = await axios.get(`${apiUrl.GET_USER_BY_ID}?id=${id}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = response.data;
          informationUser.tenNguoiDung = data.ten;
          informationUser.username = data.username;
          informationUser.email = data.email;
          informationUser.diaChi = data.diaChi;
          informationUser.gioiTinh = data.gioiTinh;
          informationUser.ngaySinh = data.ngaySinh;
          informationUser.sdt = data.sdt;
        } catch (error) {
          console.error(error);
        }
      };
      const checkAndEditUser= async() =>{
                var email = informationUser.email;
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(email)) {
                    alert('Hãy nhập địa chỉ email hợp lệ.\nVí dụ: example@gmail.com');
                    return;
                } else {
                    // Gọi hàm SuaThongTinUser() chỉ khi email hợp lệ
                    await SuaThongTinUser();
                }
            }
      const SuaThongTinUser = async () => {
            const token = sessionStorage.getItem('Token');
            const id = sessionStorage.getItem('userId');
            await axios.put(`${apiUrl.EDIT_INFOR_USER}?id=${id}`,{
                  id:"0",
                  username: informationUser.username,
                  email: informationUser.email,
                  ten: informationUser.tenNguoiDung,
                  ngaySinh: informationUser.ngaySinh,
                  gioiTinh: informationUser.gioiTinh,
                  diaChi: informationUser.diaChi,
                  soDienThoai: informationUser.sdt,
            })  
            .then(res => {
              console.log("hihi");
                notification.open({
                      message: 'Thông báo',
                      description:'Sửa thông tin thành công',
                      icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
                    });
                visible.value = false;
            })
            .catch(err => {
                console.log(err);
                notification.open({
                      message: 'Thông báo',
                      description:'Sửa thông tin không thành công',
                      icon: () => h(ExclamationCircleOutlined, { style: "color: #108ee9" }),
                    });
            })
        }
        const showModal = () => {
            visible.value = true;
        };
        // Hủy
        const handleCancel = () => {
            visible.value = false;
        };
        watch(record, (newValue, oldValue) => {
            if (newValue) {
              informationUser.tenNguoiDung = newValue.tenNguoiDung,
              informationUser.diaChi = newValue.diaChi,
              informationUser.email = newValue.email,
              informationUser.gioiTinh = newValue.gioiTinh
              informationUser.ngaySinh = newValue.ngaySinh;
              informationUser.sdt = newValue.sdt
            }

        });
      return {
        informationUser,
        visible,
        record,
        getUserById,
        SuaThongTinUser,
        showModal,
        handleCancel,
        checkAndEditUser
      };
    },
    computed:{
      breadcrumbs() {
          return this.$route.matched.map(route => ({
              title: route.meta.breadcrumb,
              path: route.path,
          }))
      }
    },
    mounted(){
      const UserId = sessionStorage.getItem("userId");
      this.getUserById(UserId);
    },
})
</script>

<style>
.information-user {
  background-color: #f0f0f0; /* Màu xám */
  border-radius: 10px; /* Góc bo tròn */
  padding: 10px; /* Khoảng cách nội dung và viền */
}
</style>