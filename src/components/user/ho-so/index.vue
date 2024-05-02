<template>
  <MainLayout>
    <a-row>
      <a-col :flex="1">
          <div class="image-user" style="display: flex; justify-content: center">
            <a-image
              :width="300"
              :style="{ borderRadius: '50%' }"
              :src="link ? link : 'https://cdn4.iconfinder.com/data/icons/profession-avatar-5/64/29-programmer-512.png'"
            />
          </div>

          <div>
            <a-form-item style="text-align:center; margin-top:15px;">
              <a-button @click="handleUpload" >
                <upload-outlined />
                chọn ảnh đại diện
              </a-button>
              <a-button @click="handleOk" v-if="informationUser.anhDaiDien !== null" style="margin-left:10px;">
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
                v-if="informationUser.anhDaiDien && informationUser.anhDaiDien.name"
                class="file-name"
              >
                {{ informationUser.anhDaiDien.name }}
                <close-outlined
                  style="color: black; cursor: pointer"
                  @click="handleRemoveFile"
                />
              </span>
            </a-form-item>
          </div>

        <div style="justify-content: center" class="information-user">
          <a-space style="display: flex; justify-content: center">
            <a-button
              type="primary"
              title="Sửa thông tin người dùng"
              :centered="true"
              @click="showModal"
              ><EditOutlined />Sửa trang cá nhân</a-button
            >
          </a-space>
          <ul
            class="content-infor-user"
            style="list-style-type: none; margin-top: 1rem"
          >
            <li style="display: flex">
              <p class="titleInforUser userName" style="width: 30%">
                Username:
              </p>
              <p class="contentInforUser userName">
                {{ informationUser.username }}
              </p>
            </li>
            <li style="display: flex">
              <p class="titleInforUser tenNguoiDung" style="width: 30%">
                Tên người dùng:
              </p>
              <p class="contentInforUser tenNguoiDung">
                {{ informationUser.tenNguoiDung }}
              </p>
            </li>
            <li style="display: flex">
              <p class="titleInforUser email" style="width: 30%">Email:</p>
              <p class="contentInforUser email">{{ informationUser.email }}</p>
            </li>
            <li style="display: flex">
              <p class="titleInforUser diaChi" style="width: 30%">Địa chỉ:</p>
              <p class="contentInforUser diaChi">
                {{ informationUser.diaChi }}
              </p>
            </li>

            <li style="display: flex">
              <p class="titleInforUser gioiTinh" style="width: 30%">
                Giới tính:
              </p>
              <p class="contentInforUser gioiTinh">
                {{ informationUser.gioiTinh }}
              </p>
            </li>
            <li style="display: flex">
              <p class="titleInforUser ngaySinh" style="width: 30%">
                Ngày sinh:
              </p>
              <p class="contentInforUser ngaySinh">
                {{ informationUser.ngaySinh }}
              </p>
            </li>
            <li style="display: flex">
              <p class="titleInforUser ngaySinh" style="width: 30%">
                Số điện thoại:
              </p>
              <p class="contentInforUser ngaySinh">{{ informationUser.sdt }}</p>
            </li>
          </ul>
        </div>
      </a-col>
      <a-col :flex="4">
        <a-card>
          
        </a-card>
      </a-col>
    </a-row>
    <a-modal
      v-model:open="visible"
      width="40%"
      title="Sửa thông tin người dùng"
      :centered="true"
      @ok="checkAndEditUser"
      class="editInforUser"
    >
      <div>
        <a-form-item>
          <a-input
            addonBefore="Họ và tên"
            v-model:value="informationUser.tenNguoiDung"
            placeholder="Họ và tên"
            allow-clear
          />
        </a-form-item>
        <a-form-item>
          <a-input
            addonBefore="Địa chỉ"
            v-model:value="informationUser.diaChi"
            placeholder="Địa chỉ"
            allow-clear
          />
        </a-form-item>
        <a-form-item>
          <a-input
            addonBefore="Email"
            v-model:value="informationUser.email"
            placeholder="Email"
            allow-clear
          />
        </a-form-item>
        <a-form-item>
          <p>Giới tính:</p>
          <a-radio-group v-model:value="informationUser.gioiTinh">
            <a-radio value="Nam">Nam</a-radio>
            <a-radio value="Nữ">Nữ</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item>
          <a-input
            addonBefore="Ngày sinh"
            v-model:value="informationUser.ngaySinh"
            placeholder="Ngày sinh"
            allow-clear
          />
        </a-form-item>
        <a-form-item>
          <a-input
            addonBefore="Số điện thoại"
            v-model:value="informationUser.sdt"
            placeholder="Số điện thoại"
            allow-clear
          />
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
  ExclamationCircleOutlined,
  CloseOutlined,
  UploadOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
    components:{
      MainLayout,
      EditOutlined,
      ExclamationCircleOutlined,
      CloseOutlined,
      UploadOutlined
    },
    setup(){
      const link = ref("");
      const informationUser = reactive({
        tenNguoiDung: "",
        username:"",
        email:"",
        diaChi:"",
        gioiTinh:"",
        ngaySinh:"",
        sdt:"",
        anhDaiDien:null,
      });
      const visible = ref(false);
      const record = ref(null);
      const uploadRule = ref("image/PNG, image/jpeg")

      const getUserById = async () => {
        try {
          const token = sessionStorage.getItem('Token');
          const id = sessionStorage.getItem('userId');
          
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
                notification.open({
                      message: 'Thông báo',
                      description:'Sửa thông tin thành công',
                      icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
                    });
                visible.value = false;
            })
            .catch(err => {
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
        const handleUpload = () => {
          document.getElementById("upload-phanHoi").click();
        }
        const handleChangeFile =async (e) => {
          const files = e.target.files;

          if (files && files.length > 0) {
            informationUser.anhDaiDien = files[0];
            link.value = URL.createObjectURL(informationUser.anhDaiDien);
          }

          console.log(informationUser.anhDaiDien);

          const file = e.target.files[0];

          document.getElementById("upload-phanHoi").value = "";
        }

        const handleRemoveFile =() => {
          informationUser.anhDaiDien = null;
        }

        const handleOk = async () => {
          const userId = sessionStorage.getItem("userId");
          const reader = new FileReader();
          reader.readAsArrayBuffer(informationUser.anhDaiDien);

          reader.onload = async () => {
            const arrayBuffer = reader.result;
            const base64String = btoa(
                new Uint8Array(arrayBuffer)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

            // Chuẩn bị dữ liệu để gửi đi
            const fileUpload = {
                contentBase64: base64String,
                fileName: informationUser.anhDaiDien.name,
                contentType: informationUser.anhDaiDien.type
            };
            try {
              // Gửi yêu cầu POST đến endpoint của backend để upload file
              await axios.post(apiUrl.UPLOAD_AVATAR, fileUpload)
              .then(async (res) => {
                await axios.put(apiUrl.UPDATE_AVATAR,{
                  id: userId,
                  path: res.data
                })
                .then(resp => {
                  notification.open({
                    message: 'Thông báo',
                    description:'Sửa ảnh đại diện thành công',
                    icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
                  });
                })
                .catch(err=> {
                  notification.open({
                    message: 'Lỗi',
                    description:`Sửa ảnh đại diện không thành công: ${err}`,
                    icon: () => h(ExclamationCircleOutlined, { style: "color: red;" }),
                  });
                })
              })
              .catch(er => {
                notification.open({
                  message: 'Lỗi',
                  description:`Sửa ảnh đại diện không thành công: ${er}`,
                  icon: () => h(ExclamationCircleOutlined, { style: "color: red;" }),
                });
              })

          
          } catch (error) {
              console.error('Error uploading file:', error);
              // Xử lý lỗi tại đây nếu cần
              throw error;
          }
          }
        }

        const getAvt = () => {
          const userId = sessionStorage.getItem("userId");

          axios.get(`${apiUrl.GET_AVATAR}?id=${userId}`, { responseType: 'blob' })
          .then(resa => {
            console.log(resa);
            // const blob = new Blob([resa]);
            var url = URL.createObjectURL(resa.data);
            link.value = url;

            console.log(url);
          })
          .catch(er => {
            console.log(er);
          })
        }

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
        link,
        uploadRule,
        getUserById,
        SuaThongTinUser,
        showModal,
        handleCancel,
        checkAndEditUser,
        handleChangeFile,
        handleUpload,
        handleRemoveFile,
        handleOk,
        getAvt
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
      this.getAvt();
    },
})
</script>

<style>
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