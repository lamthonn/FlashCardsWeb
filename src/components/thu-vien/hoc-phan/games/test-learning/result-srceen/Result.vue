<template>
    <a-form :model="formState"
            ref="formRef"
            v-bind="layout"
            :rules="rules">
        <a-modal title="Kết quả kiểm tra" v-model:open="visible" width="700px" >
            <template #footer>
                <a-button key="back"
                    @click="handleCancel">Đóng</a-button>
                <!-- <a-button key="submit"
                    type="primary"
                    :loading="loading"
                    @click="handleOk">Lưu</a-button> -->
            </template>
            <a-result
                status="success"
                title="Chúc mừng bạn đã thành công vượt qua bài kiểm tra học phần này!"
                :sub-title='"Số điểm của bạn trong học phần này là:" + isCorrect +"/"+total'
            >
                <template #extra>
                <a-button key="console" type="primary" @click="goBack">trở về học phần</a-button>
                </template>
            </a-result>
        </a-modal>
    </a-form>
</template>

<script>
import apiUrl from "@/constants/api";
import axios from "axios";
import { defineComponent,h, reactive, ref } from "vue";
import {  
    CheckCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import { notification } from "ant-design-vue";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

export default defineComponent({
    name:"ket-qua-kiem-tra",
    components:{
        CheckCircleOutlined,
        ExclamationCircleOutlined,
    },
    setup(props, context){
        const router = useRouter();
        const visible = ref(false);
        const loading = ref(false);
        const isCorrect = ref(0);
        const total = ref(0);
        const layout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        };
        
        const showModal = () => {
            visible.value = true;
        };

        const handleOk = async () => {
            console.log(isCorrect.value);
            console.log(total.value);
        };
        const handleCancel = () => {
            visible.value = false;
        }

        const goBack =() => {
            router.go(-1);
        }
        return {
            visible,
            loading,
            layout,
            isCorrect,
            total,
            router,
            showModal,
            handleOk,
            handleCancel,
            goBack,
        }
    }
})
</script>

<style>

</style>