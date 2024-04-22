<template>
    <MainLayout>
        <a-card title="Bộ thẻ học" bordered="true" :loading="loading">
            <template #extra>
                <a-button type="dashed" @click="TaoHocPhan">
                    <PlusOutlined />
                    Tạo học phần
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

            <a-row style="margin-top:1.5rem;"  v-for="hocphan in ListHocPhan" :key="hocphan.id">
                <div style="width: 100%" >
                    <a-card class="HocPhan" @click="JoinHocPhan(hocphan.id)">
                        <a-row>
                            <a-col :span="19">
                                <a-row>
                                    <a-col :span="3"> {{ hocphan.soTheHoc }} thẻ học</a-col>
                                    <a-col :span="3" style="display: flex; align-items:center; ">
                                        <a-avatar size="small" style="margin-right: 5px;" :src="link ? link : 'https://cdn4.iconfinder.com/data/icons/profession-avatar-5/64/29-programmer-512.png'"/>  
                                        {{ Username }}
                                    </a-col>
                                </a-row>
                                <h1 class="titleCard">{{ hocphan.tieuDe }}</h1>
                            </a-col>
                            <a-col :span="5" style="color: grey;">
                                <p>Ngày tạo:</p>
                                <p>{{ hocphan.ngayTao.slice(0,10) }}</p>
                            </a-col>
                        </a-row>
                    </a-card>
                </div>
            </a-row>
        </a-card>
    </MainLayout>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { h } from 'vue';
import { useRouter } from "vue-router";
import MainLayout from "@/layout/main.vue";
import {  
    SearchOutlined,
    PlusOutlined 
} from '@ant-design/icons-vue';
import apiUrl from "@/constants/api";
import axios from "axios";
 

export default defineComponent({
    name:"hoc-phan",
    components: {
        MainLayout,
        SearchOutlined ,
        PlusOutlined,
    },
    setup(){
        const router = useRouter();
        const loading = ref(false);
        const ListHocPhan = ref([]);
        const ThuMucId = ref('');
        const Username = ref('');
        const fromState = reactive({
            keySearch:null,
            trangthai:"Gần đây"
        })

        const TaoHocPhan = () => {
            router.push("/tao-hoc-phan");
            loading.value = false;
        }

        const GetHocPhan =async (id) => {
            var token = sessionStorage.getItem("Token")
            const userId = sessionStorage.getItem('userId');
            //get username
            await axios.get(`${apiUrl.GET_ALL_HOC_PHAN}?thuMucId=${id ?? ''}&userId=${userId}`)
            .then(async (res) => {
                ListHocPhan.value = res.data
                console.log(res.data);
                await axios.get(`${apiUrl.GET_USER_BY_ID}?id=${res.data[0].userId}`,{
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    Username.value = res.data.username;
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
        }

        const JoinHocPhan = (id) => {
            router.push(`/chi-tiet-hoc-phan?id=${id}`)
        }

        const link = ref();
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

        return{
            fromState,
            loading,
            router,
            ListHocPhan,
            ThuMucId,
            link,
            Username,
            TaoHocPhan,
            GetHocPhan,
            JoinHocPhan,
            getAvt
        }
    },
    mounted(){
        this.ThuMucId = this.router.currentRoute.value.query.id;
        this.GetHocPhan(this.ThuMucId);
        this.getAvt();
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

    .HocPhan{
        cursor: pointer;
    }
    .HocPhan:active {
        background-color: #f4f4f4;
    }
</style>