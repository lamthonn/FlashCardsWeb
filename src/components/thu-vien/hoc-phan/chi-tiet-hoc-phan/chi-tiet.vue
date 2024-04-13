<template>
  <MainLayout >
    <a-card
        class="itemSlice"
        style="width:100%; padding:0;"
        :title="'HỌC PHẦN: ' + hocPhanData.tieuDe"
    >
    <template #extra>
      <a-dropdown-button>
        <!-- <SmallDashOutlined /> -->
        <template #overlay>
          <a-menu >
            <a-menu-item @click="deleteHocPhan(hocPhanData.id)"><DeleteOutlined /> Xóa học phần</a-menu-item>
            <a-menu-item @click="editHocPhan(hocPhanData.id)"><EditOutlined /> Sửa học phần</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown-button>
    </template>
    <a-row :gutter="24" style="width:80%; margin-left:10%;margin-bottom:15px; display: flex; justify-content: space-between;">
        <!-- <a-button type="primary" class="btn-options"><CopyOutlined/> FlashCards</a-button> -->
        <a-button type="primary" class="btn-options"><ContainerOutlined/> Learn</a-button>
        <a-button type="primary" class="btn-options"><FormOutlined /> Test</a-button>
        <a-button type="primary" class="btn-options" @click="matchGame"><SwitcherFilled/> Match</a-button>

      
    </a-row>
    
    <a-row>
      <a-carousel arrows style="width:80%; margin-left:10%;">
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
            <LeftOutlined  />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <RightOutlined  />
          </div>
        </template>

        <!-- content -->
        <div 
          v-for="thehoc in listTheHoc"
          :key="thehoc.id"
          style="position: relative; font-size:19px;" 
          class="card__inner"
          :class="{ 'is-flipped': isFlipped }"
          @click="onToggleFlipCard"
        >
          <div class="card__face card__face--front">
            <div class="SoundOutlined" >
              <SoundOutlined @click="SoundOutlined(thehoc.ngonNgu1)" style="margin: 0 7px;"/>
              <EditOutlined @click="EditOutlined(thehoc.id)" style="margin: 0 7px;"/> 
              <StarFilled @click="StarFilled(thehoc.id)" style="margin: 0 7px;"/> 
            </div>
            <h1>{{ thehoc.ngonNgu1 }}</h1>
          </div>

          <div class="card__face card__face--back">
            <h1>{{ thehoc.ngonNgu2 }}</h1>
          </div>
        </div>
      </a-carousel>
    </a-row>

    <a-row :gutter="24" style="width:80%; margin-left:10%; margin-top:35px;">
      <a-col :span="2">
        <a-avatar 
          :size="50" 
          :src="link ? link : 'https://cdn4.iconfinder.com/data/icons/profession-avatar-5/64/29-programmer-512.png'"
          style="border: 1px solid grey;"
        >
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </a-col>
      <a-col :span="10" style="padding:0; margin:0;">
          <p style="margin: 0;">create by</p>
          <h2 style="margin: 0;">Vũ Vương Lâm</h2>
      </a-col>
      <a-col :span="12" style="text-align: end; font-size:20px;">
        <EditOutlined @click="editHocPhan" style="margin:0 10px; cursor: pointer;"/>
        <SmallDashOutlined  style="margin:0 10px; cursor: pointer;"/>
      </a-col>
    </a-row>

    <a-row :gutter="24" style="width:80%; margin-left:10%; margin-top:35px; display: flex; justify-content: space-between;">
      <h2>Bộ thẻ học (15)</h2>
      <a-select style="width:15%" v-model:value="sortCard">
        <a-select-option value="Original">Original</a-select-option>
        <a-select-option value="Alphabetical">Alphabetical</a-select-option>
      </a-select>
    </a-row>

    
    <a-row :gutter="24" 
      class="TermsInSet" 
      style="width:80%; margin-left:10%; margin-top:15px;"
      v-for="thehoc in listTheHoc"
      :key="thehoc.id"
    >
      <a-col :span="6" style="font-size: 20px;">{{ thehoc.ngonNgu1 }}</a-col>
      <a-col :span="5" style="font-size: 20px;"> {{ thehoc.ngonNgu2 }}</a-col>
      <a-col :span="6" style="font-size: 20px;"></a-col>
      <a-col :span="3"></a-col>
      <a-col style="font-size: 20px;">
        <div>
          <SoundOutlined @click="SoundOutlined2(thehoc.ngonNgu1)" style="margin: 0 7px;"/>
          <StarFilled @click="StarFilled2(thehoc.id)" style="margin: 0 7px;"/> 
        </div>
      </a-col>
    </a-row>
    
    
    </a-card>
  </MainLayout>
</template>

<script>

import { defineComponent, h, ref } from 'vue';
import MainLayout from "@/layout/main.vue";
import { useRouter } from 'vue-router';
import { 
  RightOutlined,
  LeftOutlined,
  CopyOutlined,
  ContainerOutlined,
  FormOutlined,
  SwitcherFilled,
  SoundOutlined,
  EditOutlined,
  StarFilled,
  UserOutlined,
  SmallDashOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined
} from "@ant-design/icons-vue"
import axios from 'axios';
import apiUrl from '@/constants/api';
import { notification } from 'ant-design-vue';

export default defineComponent({
    name:"chi-tiet-hoc-phan",
    components:{
        MainLayout,
        RightOutlined ,
        LeftOutlined,
        CopyOutlined,
        ContainerOutlined,
        FormOutlined,
        SwitcherFilled,
        SoundOutlined,
        EditOutlined,
        StarFilled,
        UserOutlined,
        SmallDashOutlined,
        ExclamationCircleOutlined,
        DeleteOutlined,
        CheckCircleOutlined
    },
    setup(){
        const router = useRouter();
        const loading = ref(false)
        const isFlipped = ref(false);
        const sortCard = ref("Original");
        const listTheHoc = ref([]);
        const onToggleFlipCard = () => {
          isFlipped.value = !isFlipped.value
        }
        const hocPhanData = ref({});

        const GetHocPhanByID= async () => {
          const id = router.currentRoute.value.query.id;
          await axios.get(`${apiUrl.GET_THE_HOC}?id=${id}`)
          .then(res => {
            listTheHoc.value = res.data;
          })
          .catch(err => {
            notification.open({
              message: "Lỗi",
              description: "Có lỗi xảy ra!",
              icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
            });
          })
        }

        const getHocPhan = async () => {
          const id = router.currentRoute.value.query.id;
          await axios.get(`${apiUrl.GET_HOC_PHAN_BY_ID}?id=${id}`)
          .then(res => {
            hocPhanData.value = res.data;
          })
          .catch(err => {
            notification.open({
              message: "Lỗi",
              description: `Có lỗi xảy ra:${err}`,
              icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
            });
          })
        }
        

        const SoundOutlined = (text) => {
          onToggleFlipCard()
          const msg = new SpeechSynthesisUtterance();
            msg.lang = 'en-US';
            msg.text = text;
            window.speechSynthesis.speak(msg);
        }
        const SoundOutlined2 = (text) => {
          const msg = new SpeechSynthesisUtterance();
            msg.lang = 'en-US';
            msg.text = text;
            window.speechSynthesis.speak(msg);
        }

        const EditOutlined =() => {
          onToggleFlipCard()
        }
        const EditOutlined2 =() => {
        }

        const StarFilled =() => {
          onToggleFlipCard()
        }
        const StarFilled2 =() => {
        }

        const deleteHocPhan = () =>{
          axios.delete(`${apiUrl.DELETE_HOC_PHAN}?id=${hocPhanData.value.id}`)
          .then(res => {
            notification.open({
              message: 'Thông báo',
              description:'Xóa học phần thành công',
              icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
            });
            router.push("hoc-phan")
          })
          .catch(er=> {
            notification.open({
              message: "Lỗi",
              description: `Có lỗi xảy ra:${er}`,
              icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
            });
          })
        }

        const editHocPhan=()=> {
          router.push(`sua-hoc-phan?id=${hocPhanData.value.id}`)
        }

        const link = ref("");
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

        const matchGame = () => {
          router.push(`match-game?id=${hocPhanData.value.id}`)
        }

        return {
          router,
          loading,
          hocPhanData,
          isFlipped,
          sortCard,
          link,
          listTheHoc,
          onToggleFlipCard,
          SoundOutlined,
          SoundOutlined2,
          EditOutlined,
          EditOutlined2,
          StarFilled,
          StarFilled2,
          GetHocPhanByID,
          getHocPhan,
          deleteHocPhan,
          editHocPhan,
          getAvt,
          matchGame,
        }
    },
    mounted(){
      this.GetHocPhanByID();
      this.getHocPhan();
      this.getAvt();
    }
})
</script>

<style scoped>
    .TermsInSet{
      border: 1px solid rgb(160, 160, 160);
      padding: 15px 20px;
      border-radius:15px ;
    }
    .itemSlice{
       width: 80%; 
    }
    /* For demo */
    :deep(.slick-slide) {
      text-align: center;
      height: 320px;
      line-height: 320px;
      background: #eeeeee;
      overflow: hidden;
    }

    :deep(.slick-arrow.custom-slick-arrow) {
      width: 25px;
      height: 25px;
      font-size: 25px;
      color: #262626;
      background-color: rgba(78, 75, 75, 0.763)000;
      transition: ease all 0.3s;
      opacity: 0.3;
      z-index: 1;
    }
    :deep(.slick-arrow.custom-slick-arrow:before) {
      display: none;
    }
    :deep(.slick-arrow.custom-slick-arrow:hover) {
      color: #fff;
      opacity: 0.5;
    }

    :deep(.slick-slide h1) {
      color: rgba(78, 75, 75, 0.763)000;
      font-size: 35px;
      font-family: 'Nunito', sans-serif;
    }

    .btn-options{
      font-family: 'Nunito', sans-serif;
      font-weight:200;
      width: 23%;
      height: 50px;
      font-size: 18px;
    }

    .SoundOutlined{
      position: absolute;
      padding: 140px 0px 0px 15px;
    }
    
    .card__inner {
      font-size: 15px;
      transition: transform 1s;
      transform-style: preserve-3d;
      cursor: pointer;
    }

    .card__face--back{
      transform: rotateX(-180deg);
    } 

    .is-flipped {
      transform: rotateX(-180deg);
    }
</style>
