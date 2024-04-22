<template>
  <MainLayout>
    <a-card title="Thư mục" bordered="true" :loading="loading" >
            <template #extra>
                <a-button type="dashed" @click="ThemThuMuc">
                    <PlusOutlined />
                    Tạo thư mục
                </a-button>
            </template>
            <a-row style="margin-bottom:2rem;">
                <a-col :span="12">
                    <a-select v-model:value="fromState.trangthai">
                        <a-select-option value="Gần đây" defaultOpen>Gần đây</a-select-option>
                        <a-select-option value="Đã tạo">Đã tạo</a-select-option>
                        <a-select-option value="Đã học">Đã học</a-select-option>
                        <a-select-option value="Đãhọc">Gần đây</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="12">
                    <a-row>
                        <a-col :span="18">
                            <a-input placeholder="Từ khóa...">
                                <template #suffix>
                                    <a-tooltip title="Extra information">
                                        <SearchOutlined  style="color: rgba(0, 0, 0, 0.45)" />
                                    </a-tooltip>
                                </template>
                            </a-input>
                        </a-col>
                        <a-col :span="4" style="text-align: end;">
                            <a-button type="primary">Tìm kiếm</a-button>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>


            <a-row style="margin-top:1.5rem;" v-for="thumuc in dsThuMuc" :key="thumuc.id">
                <div style="width: 100%">
                    <a-card @click="handleChoose(thumuc.id)" class="folder">
                        <a-row>
                            <a-col :span="19">
                                <a-row>
                                    <a-col :span="3">3 học phần</a-col>
                                    <a-col :span="3" style="display: flex; align-items:center; ">
                                        <!-- <a-avatar size="small" style="margin-right: 5px;" src="https://cdn4.iconfinder.com/data/icons/profession-avatar-5/64/29-programmer-512.png"/>  
                                        lamvu123 -->
                                    </a-col>
                                </a-row>
                                <h1 class="titleCard" style="display:flex;align-items: center;"><FolderOutlined style="color: grey; margin-right:5px;"/> {{ thumuc.tieuDe }}</h1>
                            </a-col>
                            <a-col :span="5" style="color: grey;">
                                <p>Ngày tạo:</p>
                                <p>{{ thumuc.created.slice(0,10) }}</p>
                            </a-col>
                        </a-row>
                    </a-card>
                </div>
            </a-row>
        </a-card>
  </MainLayout>
  <TaoThuMuc ref="themRef" @lamMoiBang="resetList"/>
</template>

<script>
import MainLayout from "@/layout/main.vue";
import { defineComponent, reactive, ref } from "vue";
import { h } from 'vue';
import { useRouter } from "vue-router";
import {  
    SearchOutlined,
    PlusOutlined,
    FolderOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import TaoThuMuc from "@/components/thu-vien/thu-muc/tao-thu-muc/chi-tiet.vue"
import axios from "axios";
import apiUrl from "@/constants/api";
import { notification } from "ant-design-vue";

export default defineComponent({
    name:"thu-muc",
    components: {
        MainLayout,
        TaoThuMuc,
        SearchOutlined ,
        PlusOutlined,
        FolderOutlined,
        ExclamationCircleOutlined,
    },
    setup(){
        const router = useRouter();
        const loading = ref(false);
        const dsThuMuc = ref([])
        const fromState = reactive({
            keySearch:null,
            trangthai:"Gần đây"
        })
        const themRef = ref();

        const ThemThuMuc = () => {
            themRef.value.visible = true
        }

        const resetList = async () => {
            await GetData()
        }

        const handleChoose = (id) => {
            router.push(`/hoc-phan?id=${id}`)
        }

        const GetData = async () => {
            const userId = sessionStorage.getItem('userId')
            await axios.get(`${apiUrl.GET_ALL_THU_MUC}?id=${userId}&keySearch=${fromState.keySearch ?? ''}`,{
                params:{
                    'userId':userId,
                    'keySearch':fromState.keySearch ?? ''
                }
            })
            .then(res => {
                dsThuMuc.value = res.data;
            })
            .catch((err)=> {
                notification.open({
                    message: "Lỗi",
                    description: "Có lỗi xảy ra!",
                    icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
                });
            })
        }

        return{
            fromState,
            loading,
            router,
            themRef,
            dsThuMuc,
            ThemThuMuc,
            resetList,
            GetData,
            handleChoose
        }
    },
    mounted() {
        this.GetData();
    }
})
</script>

<style scoped>
    .titleCard{
        font-size: 1.4rem;
        display: flex;
        margin: 0;
        margin-top: 7px;
    }

    .folder{
        cursor: pointer;
    }
    .folder:active{
        background-color: #f1f1f1;
    }
</style>