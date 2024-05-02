<template>
  <MainLayout> 
    <a-row>
      <div style="font-family: 'Anta', sans-serif; font-size: 2rem; ">Cài đặt</div>
    </a-row>

    <a-card style="margin:40px 0; padding: 5px 10px; width:60%; margin-left:20%; background-color:black; color: white; cursor: pointer;">
      <div style="font-family: 'Anta', sans-serif; font-size: 20px; text-align:center;">Nâng cấp lên VocaLearn pre+ để có trải nghiệm tốt nhất</div>
    </a-card>

    <div style="margin:40px 0; padding: 5px 20px;">
      <h3>Thông tin cá nhân</h3>
      <a-list size="large" bordered >
        <a-list-item >
          <a-row style="width: 100%;">
            
            <a-col :span="7">
              <div class="image-user" >
                <a-image
                  :loading="loading"
                  :width="200"
                  :style="{ borderRadius: '50%' }"
                  :src="link ? link : 'https://cdn4.iconfinder.com/data/icons/profession-avatar-5/64/29-programmer-512.png'"
                />
              </div>
            </a-col>
            <a-col :span="17">
              <a-row style="width: 100%; height:50%;">
                <a-col :span="8">
                  <p>Tên người dùng</p>
                  <h3>{{ userInfor.ten }}</h3>
                </a-col>

                <a-col :span="8">
                  <p>Username</p>
                  <h3>{{ userInfor.username }}</h3>
                </a-col>

                <a-col :span="8">
                  <p>Email</p>
                  <h3>{{ userInfor.email }}</h3>
                </a-col>

              </a-row>
              <a-row style="display: flex; width: 100%; height:50%;align-content: center; justify-content: center;">
                <a-button type="primary" @click="ChangeInfor">
                  Thay đổi thông tin
                </a-button>
              </a-row>
            </a-col>
          </a-row>
        </a-list-item>
      </a-list>
    </div>

    <div style="margin:40px 0; padding: 5px 20px;">
      <h3>Nhật ký hoạt động</h3>
      <a-list size="large" bordered >
        <a-list-item>
          <a-row style="width: 100%;">
            <a-col :span="24">
              <a-table 
                :pagination="false"
                :columns="columns"
                :loading="loading"
                :dataSource="dataLog"
                bordered
              >
              <template v-slot:bodyCell="{ column,record }">
                <template v-if="column.dataIndex === 'timeStamp'">
                  {{ formatDateToIsoStringHHss(record.timeStamp) }}
                </template>
              </template>
                <template #footer>
                  <a-row>
                    <a-col :span="17"> </a-col>
                    <a-col :span="7">
                      <a-pagination v-model:current="pageNumber" :total="totalRecord" />
                    </a-col>
                  </a-row>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </a-list-item>
      </a-list>
    </div>

    <div style="margin:40px 0; padding: 5px 20px;">
      <h3>Tài khoản và bảo mật</h3>
      <a-list size="large" bordered >
        <a-list-item>
          <a-card style="width: 100%;">
              <a-row>
                <a-col :span="20">Đổi mật khẩu</a-col>
                <a-col :span="4">
                  <a-button type="primary" @click="doiMatKhau">
                    Đổi mật khẩu
                  </a-button>
                </a-col>
              </a-row>
          </a-card>
        </a-list-item>
        <a-list-item>
          <a-card style="width: 100%;">
              <a-row>
                <a-col :span="20">Xóa tài khoản</a-col>
                <a-col :span="4">
                  <a-button type="primary" danger @click="xoaTaiKhoan">
                    Xóa tài khoản
                  </a-button>
                </a-col>
              </a-row>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </MainLayout>
  <DoiMatKhau ref="DoiMatKhauRef"/>
  <XoaTaiKhoan ref="XoaTaiKhoanRef"/>
</template>
  
  <script>
import apiUrl from "@/constants/api";
import MainLayout from "@/layout/main.vue";
import { notification } from "ant-design-vue";
import axios from "axios";
import { defineComponent, reactive, ref ,h, watch } from "vue";
import {
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import { useRouter } from "vue-router";
import moment from "moment"
import DoiMatKhau from './doi-mat-khau/chi-tiet.vue'
import XoaTaiKhoan from './xoa-tai-khoan/chi-tiet.vue'

export default defineComponent({
  components: {
    MainLayout,
    ExclamationCircleOutlined,
    DoiMatKhau,
    XoaTaiKhoan
  },
  setup() {
    const router = useRouter();
    const loading = ref(false)
    const columns = [
      {
        title:'Thao tác',
        dataIndex:'message',
        width:'30%'
      },
      {
        title:'Thời gian',
        dataIndex:'timeStamp',
        width:'20%'
      },
      {
        title:'Level',
        dataIndex:'level',
        width:'20%'
      },
    ]
    //GET LOG
      const dataLog = ref([]);
      const pageSize = ref(10)
      const pageNumber = ref(1)
      const totalRecord = ref(0)

      const getLog =async () => {
        loading.value = true;
        const userId = sessionStorage.getItem('userId')
        axios.get(`${apiUrl.NHAT_KY_HOAT_DONG}?UserId=${userId}&pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`,{
          params:{
            userId: userId,
            pageNumber: pageNumber.value,
            pageSize:pageSize.value
          }
        })
        .then(res => {
          dataLog.value = res.data.items;
          pageNumber.value = res.data.pageNumber;
          totalRecord.value = res.data.totalRecord;
          loading.value = false;

          console.log(dataLog.value);
        })
        .catch(er => {
          // notification.open({
          //   message: 'Lỗi',
          //   description:`Có lỗi xảy ra: ${er}`,
          //   icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
          // });
          loading.value = false;
        })
      }

    //GET USER INFORMATION
    const userInfor = ref({});
    const link = ref();
    const getUserById = async () => {
      loading.value = true;
      const userId = sessionStorage.getItem('userId');
      const token = sessionStorage.getItem('Token');
      await axios.get(`${apiUrl.GET_USER_BY_ID}?id=${userId}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
      .then(res => {
        userInfor.value = res.data;
        loading.value = false;
      })
      .catch(er => {
        notification.open({
          message: 'Lỗi',
          description:`Có lỗi xảy ra: ${er}`,
          icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
        });
        loading.value = false;
      })
    }
    const getAvt = () => {
          const userId = sessionStorage.getItem("userId");

          axios.get(`${apiUrl.GET_AVATAR}?id=${userId}`, { responseType: 'blob' })
          .then(resa => {
            console.log(resa);
            // const blob = new Blob([resa]);
            var url = URL.createObjectURL(resa.data);
            link.value = url;
          })
          .catch(er => {
            console.log(er);
          })
        }

    //Đổi mật khẩu
    const DoiMatKhauRef = ref();
    const doiMatKhau = () => {
      DoiMatKhauRef.value.visible = true;
    }

    //xóa tài khoản
    const XoaTaiKhoanRef = ref();
    const xoaTaiKhoan = () => {
      XoaTaiKhoanRef.value.visible = true;
    }
    //code generate - no change
    const formatDateToIsoStringHHss = (date) => {
      return moment(date).subtract(7, 'h').format('HH:mm:ss DD-MM-yyyy')
    }

    const ChangeInfor =() => {
      router.push('/ho-so')
    }

    watch(pageNumber,async ()=> {
      await getLog();
    })
    return {
      userInfor,
      link,
      router,
      loading,
      columns,
      dataLog,
      pageSize,
      pageNumber,
      totalRecord,
      DoiMatKhauRef,
      XoaTaiKhoanRef,
      getUserById,
      ChangeInfor,
      formatDateToIsoStringHHss,
      getLog,
      getAvt,
      doiMatKhau,
      xoaTaiKhoan
    }
  },
  mounted(){
    this.getUserById();
    this.getAvt();
    this.getLog();
  }
});
</script>
  
  <style scoped>
</style>