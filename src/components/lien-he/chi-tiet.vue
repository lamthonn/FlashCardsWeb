<template>
  <MainLayout> 
    <div class="contact">
      <div class="contact-icon">
        <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col class="gutter-row" :span="6">
            <div class="icon-contact"><EnvironmentOutlined class="icon-detail" /></div>          
            <p >234 Hoàng Quốc Việt, Cổ Nhuế, Bắc Từ Liêm, Hà Nội</p>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="icon-contact"><PhoneOutlined class="icon-detail" /></div>          
            <p style="color: black;">0395041229</p>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="icon-contact"><MailOutlined class="icon-detail" /></div>          
            <p style="color: black;">vocablearncontact@gmail.com</p>
          </a-col>
          <a-col class="gutter-row" :span="6">
            <div class="icon-contact"><FundProjectionScreenOutlined class="icon-detail" /></div>          
            <p style="color: black;">http://localhost:8080/trang-chu</p>
          </a-col>
        </a-row>
      </div>
      <div class="form-contact">
        <a-form
        >
          <a-form-item :name="['user', 'name']" label="Tên" :rules="[{ required: true }]">
            <a-input />
          </a-form-item>
          <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
            <a-input />
          </a-form-item>
          <a-form-item :name="['user', 'numberPhone']" label="Số điện thoại" :rules="[{ type: 'number', min: 0, max: 99 }]">
            <a-input-number/>
          </a-form-item>
          <a-form-item :name="['user', 'message']" label="Tin nhắn">
            <a-input/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">Gửi</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    </MainLayout>
</template>
  
  <script>
import MainLayout from "@/layout/main.vue";
import { defineComponent } from "vue";
import {
  MailOutlined,
  FundProjectionScreenOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    MainLayout,
    MailOutlined,
    FundProjectionScreenOutlined,
    EnvironmentOutlined,
    PhoneOutlined
  },
  setup() {},
});
</script>
  
<style scoped>
.contact{
  /* background-image: url("https://i1-vnexpress.vnecdn.net/2021/08/09/Language-6470-1628476085.png?w=0&h=0&q=100&dpr=2&fit=crop&s=Os4nGiOjxfL9nopK_07gLQ"); */
  height: 39rem;
  width: 100%;
  background-size: cover; /* Phủ toàn bộ kích thước của phần nền */
  background-position: center; /* Canh giữa hình ảnh */
  background-repeat: no-repeat;
  opacity: 0.5;
}
.icon-contact {
    position: relative;
    text-align: center;
}
.icon-contact .icon-detail{
  font-size: 50px;
    font-weight: bold;
    padding: 12px;
    border-radius: 60px;
    background-color: #1926b9;
    color: #fff;
}
.gutter-row p{
  position: relative;
    text-align: center;
    padding-top: 15px;
    font-size: 20px;
}
.form-contact {
    margin: 20px 200px;
}
</style>