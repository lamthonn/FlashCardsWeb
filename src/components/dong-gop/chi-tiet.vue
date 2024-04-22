<template>
  <MainLayout> 
    <a-card title="Đặt câu hỏi cho chúng tôi" >
        <div style="text-align:center;">
            <h1  style="font-family: 'Anta', sans-serif; font-size: 2rem; ">Câu hỏi của bạn là gì?</h1>
            <a-form>
                <a-form-item >
                    <a-input style="width: 500px;" v-model:value="noiDung"></a-input>
                </a-form-item>
                <a-form-item >
                    <a-button type="primary" @click="handleOk">Gửi</a-button>
                </a-form-item>
            </a-form>
        </div>
    </a-card>
    <a-card title="Danh sách câu hỏi của bạn" >
        <a-table 
            :columns="columns" 
            :pagination="false"
            :dataSource="YKiens"
            bordered
        >
            <template #footer>
                <a-row>
                    <a-col :span="17"> </a-col>
                    <a-col :span="7">
                        <a-pagination v-model:current="pageNumber" :total="totalRecord" />
                    </a-col>
                </a-row>
            </template>
            <template v-slot:bodyCell="{ column,record }">
              <template v-if="column.dataIndex === 'action'">
                <a href="javascript:void(0)" @click="xemYKien(record.id)" style="padding:0 3px;">
                    <EyeOutlined style="margin: 0 10px;"/>
                </a>
                <a href="javascript:void(0)"  style="padding:0 3px;">
                <a-popconfirm
                    title="bạn có chắc chắn muốn xáo ý kiến này?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="xoaYKien(record.id)"
                    @cancel="cancel"
                >
                    <DeleteOutlined  style="margin: 0 10px;" />
                </a-popconfirm>
                </a>
              </template>
              <template v-if="column.dataIndex === 'created'">
                    {{ record.created.slice(0,10) }}
                </template>
            </template>
        </a-table>
    </a-card>
  </MainLayout>
  <XemYKien ref="xemref"/>
</template>
  
  <script>
import apiUrl from "@/constants/api";
import MainLayout from "@/layout/main.vue";
import { notification } from "ant-design-vue";
import axios from "axios";
import { defineComponent, ref ,h, watch } from "vue";
import {
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined

} from "@ant-design/icons-vue";
import XemYKien from './xem-y-kien/chi-tiet.vue'
export default defineComponent({
  components: {
    MainLayout,
    XemYKien,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined
  },
  setup() {
    const noiDung = ref('');
    const pageSize = ref(5)
    const pageNumber = ref(1)
    const totalRecord = ref(0)
    const YKiens = ref([])
    const xemref = ref()
    const columns =[
        {
            title:'Nội dung góp ý',
            dataIndex:'noiDung',
            width:'30%'
        },
        {
            title:'Phản hồi',
            dataIndex:'phanHoi',
            width:'30%'
        },
        {
            title:'Ngày tạo',
            dataIndex:'created',
            width:'15%'
        },
        {
            title:'Hoạt động',
            dataIndex:'action',
            width:'10%'
        },
    ]

    const GetAllYKien = async () => {
        const userId = sessionStorage.getItem('userId')
        await axios.get(`${apiUrl.GET_Y_KIEN}?UserId=${userId}&pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`)
        .then(res => {
            YKiens.value = res.data.items;
            totalRecord.value = res.data.totalRecord;
        })
        .catch(er => {
            notification.open({
                message: "Lỗi",
                description: `Có lỗi xảy ra:${er}`,
                icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
            });
        })
    }
    const handleOk =async () => {
        const userId = sessionStorage.getItem('userId');
        const vaule = {
            id:'0',
            noiDung: noiDung.value,
            userId: userId
        }
        await axios.post(apiUrl.THEM_Y_KIEN, vaule)
        .then(res => {
            notification.open({
                message: 'Thông báo',
                description:'Gửi câu hỏi thành công',
                icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
            });
            GetAllYKien()
            noiDung.value = ''
        })
        .catch(er => {
            notification.open({
                message: "Lỗi",
                description: `Có lỗi xảy ra:${er}`,
                icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
            });
        })
    }

    const xemYKien = async (id) => {
        xemref.value.visible = true;
        xemref.value.wId = id;
    }

    const xoaYKien = async (id) => {
        await axios.delete(`${apiUrl.DELETE_Y_KIEN}?id=${id}`)
        .then(res => {
            notification.open({
                message: 'Thông báo',
                description:'Xóa câu hỏi thành công',
                icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
            });
            GetAllYKien();
        })
        .catch(er => {
            notification.open({
                message: "Lỗi",
                description: `Có lỗi xảy ra:${er}`,
                icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
            });
        })
    }

    watch(pageNumber,()=> {
        GetAllYKien()
    })

    return {
        noiDung,
        columns,
        pageSize,
        pageNumber,
        totalRecord,
        YKiens,
        handleOk,
        GetAllYKien,
        xemref,
        xemYKien,
        xoaYKien,
    }
  },
  mounted(){
    this.GetAllYKien()
  }
});
</script>
  
  <style scoped>
</style>