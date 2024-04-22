<template>
    <a-form :model="formState"
            ref="formRef"
            v-bind="layout"
            :rules="rules">
        <a-modal v-model:open="visible" @ok="handleOk" width="700px" >
            <template #footer>
                <a-button key="back"
                    @click="handleCancel">Đóng</a-button>
                <a-button key="submit"
                    type="primary"
                    :loading="loading"
                    @click="handleOk">Lưu</a-button>
            </template>
            <h1 style="font-family: 'Anta', sans-serif; font-size:2rem;">Thêm thư mục</h1>
           
            <!-- content -->
            <a-form-item :name="['tieuDe']" label="Tiêu đề" style="margin-top: 10px;">
                <a-input v-model:value="formState.tieuDe" />
            </a-form-item>

            <a-form-item :name="['moTa']" label="Mô tả">
                <a-textarea v-model:value="formState.moTa" />
            </a-form-item>
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

export default defineComponent({
    name:"tao-thu-muc",
    components:{
        CheckCircleOutlined,
        ExclamationCircleOutlined,
    },
    setup(props, context){
        const visible = ref(false);
        const loading = ref(false);
        const layout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const rules = {
            tieuDe: [
            {
                required: true,
                message: "Tiêu đề không được để trống!",
                trigger: "blur",
            },
      ],
        }
        const showModal = () => {
            visible.value = true;
        };

        const formState = reactive({
            id:null,
            tieuDe:null,
            moTa:null
        });

        

        const handleOk = async () => {
            var token = sessionStorage.getItem("Token");
            var decode = jwtDecode(token);
            const userId = sessionStorage.getItem('userId')
            console.log(token);
            await axios.post(apiUrl.THEM_THU_MUC,{
                'id': '0',
                'tieuDe':formState.tieuDe,
                'moTa': formState.moTa,
                'createdBy': decode.ten,
                'lastModifiedBy': decode.ten,
                'userId': userId
            })
            .then((res) => {
                notification.open({
                    message: "Thông Báo",
                    description: "Thêm thư mục thành công!",
                    icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
                });
                context.emit('lamMoiBang');
                visible.value = false;
            })
            .catch((err) => {
                notification.open({
                    message: "Lỗi",
                    description: "Có lỗi xảy ra!",
                    icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
                });
                visible.value = false;
            })
        };
        const handleCancel = () => {
            visible.value = false;
        }
        return {
            visible,
            formState,
            loading,
            rules,
            layout,
            showModal,
            handleOk,
            handleCancel,
        }
    }
})
</script>

<style>

</style>