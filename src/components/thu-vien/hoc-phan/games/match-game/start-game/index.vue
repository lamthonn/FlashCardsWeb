<template>
   <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :title="hocPhan.tieuDe"
        @back="backPage"
    />
    <div style="margin:10px 0; text-align:center;">
        Thời gian 1:12
    </div>
    <a-card class="Maingame">
        <div style="display: flex;width: 100%;flex-wrap: wrap;">
            <a-card class="flashCard" v-for="(item, index) in listTheHoc1" @click="handleSelect(item)" :key="index">
                <p style="font-size:20px;">{{ item.ngonNgu1 }}</p>
            </a-card>
            <a-card class="flashCard" v-for="(item, index) in listTheHoc2" @click="handleSelect(item)" :key="index">
                <p style="font-size:20px;">{{ item.ngonNgu2 }}</p>
            </a-card>
        </div>
    </a-card>
</template>

<script>
import apiUrl from '@/constants/api';
import { Modal, notification } from 'ant-design-vue';
import axios from 'axios';
import { createVNode, defineComponent, ref, h, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    ExclamationCircleOutlined
}  from "@ant-design/icons-vue"
export default defineComponent({
    name:'start-game',
    components:{
        ExclamationCircleOutlined
    },
    setup(){
        const open = ref(true)
        const loading = ref(false)
        const router = useRouter();
        const hocPhan = ref({});
        const isSelected = ref([])
        const listTheHoc1 = ref([])
        const listTheHoc2 = ref([])

        const backPage = () => {
            router.go(-1);
        }

        const getRandom = async () => {
            const id = router.currentRoute.value.query.id;
            await axios.get(`${apiUrl.GET_RANDOM_THE_HOC}?id=${id}`)
            .then(res => {
                listTheHoc1.value = res.data;
                listTheHoc2.value = res.data;

                console.log(listTheHoc1.value);
            })
            .catch(err => {
                notification.open({
                    message: "Lỗi",
                    description: "Có lỗi xảy ra!",
                    icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
                });
            })
        }

        const handleSelect = (item) => {
            isSelected.value.push(item.id)
            checkRule([...isSelected.value]);
        }

        const checkRule =(item) =>{
            if(item.length === 2){
                if(item[0] === item[1]){
                    //xử lý khi ghép thẻ thành công
                    console.log("huhu");
                }
                isSelected.value = []
            }

            // console.log(listTheHoc1.value.length);
            // console.log(listTheHoc2.value.length);
        }

        const getHocPhanName = async () =>{
            const id = router.currentRoute.value.query.id; 
            await axios.get(`${apiUrl.GET_HOC_PHAN_BY_ID}?id=${id}`)
            .then(res => {
                hocPhan.value = res.data;
            })
            .catch(er => {
                console.log(er);
            })
        }

        return {
            open,
            backPage,
            getRandom,
            getHocPhanName,
            loading,
            router,
            hocPhan,
            isSelected,
            listTheHoc1,
            listTheHoc2,
            handleSelect,
            checkRule
        }
    },
    mounted(){
        this.getHocPhanName();
        // Modal.confirm({
        //     title: 'Bạn đã sẵn sàng?',
        //     content: createVNode('div', { style: 'color:black;' }, 'Hãy ghép tất cả thuật ngữ với định nghĩa của chúng nhanh nhất có thể.'),
        //     onOk() {
        //         console.log('OK');
        //     },
        //     onCancel() {
        //         console.log('Cancel');
        //     },
        // })  
        this.getRandom();
    }
})
</script>

<style scoped>
    .Maingame{
        /* height: 90vh; */
        width: 80%;
        margin-left: 10%;
        margin-top: 15px;
        background-color: rgb(214, 214, 214);
    }
    .flashCard{
        background-color: rgb(255, 255, 255);
        width: 18%;
        margin:5px 1%;
        height: 90px;
        text-align: center;
        cursor: pointer;
    }

    .isChoose{
        background-color: rgb(107, 171, 228);
    }
</style>