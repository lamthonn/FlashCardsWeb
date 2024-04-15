<template>
  <MainLayout> 
    <a-card>
      
      <a-row>
        <a-col :span="8">
          <a-form>
            <a-form-item label="Từ khóa">
              <a-input v-model:value="formState.keySearch"></a-input>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="5">
          <a-form>
            <a-form-item label="Username">
              <a-select v-model:value="formState.userId">
                <a-select-item v-for="item in listUser" :key="item.id" :value="item.username">
                    {{ item.username }}
                </a-select-item>
              </a-select>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="5">
          <a-button type="primary" @click="SearchTable">Tìm kiếm</a-button>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="Danh sách ý kiến góp ý" style="margin-top:15px;">
        <a-table :columns="columns" :dataSource="listYKien" :pagination="false" bordered >
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
                    <a href="javascript:void(0)" @click="xemYKien(record.id)">
                        <EyeOutlined style="padding:0 15px;"/>
                    </a>
                    <a href="javascript:void(0)" @click="phanHoi(record.id)" >
                        <SendOutlined style="padding:0 5px;" />
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
  <PhanHoiYKien ref="phanhoiref"/>
</template>
  
  <script>
import apiUrl from "@/constants/api";
import MainLayout from "@/layout/main.vue";
import { notification } from "ant-design-vue";
import axios from "axios";
import { defineComponent, reactive, ref, watch } from "vue";

import { 
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SendOutlined 
} from "@ant-design/icons-vue";
import XemYKien from './xem-y-kien/chi-tiet.vue';
import PhanHoiYKien from './phan-hoi/chi-tiet.vue';

export default defineComponent({
  name: "trang-chu-admin",
  components: {
    MainLayout,
    XemYKien,
    PhanHoiYKien,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    SendOutlined 
  },
  setup() {
    const listUser = ref([]);
    
    const columns = [
        {
            title:'Nội dung',
            dataIndex:'noiDung',
            width:'30%'
        },
        {
            title:'Username',
            dataIndex:'username',
            width:'20%'
        },
        {
            title:'Phản hồi',
            dataIndex:'phanHoi',
            width:'30%'
        },
        {
            title:'Ngày tạo',
            dataIndex:'created',
            width:'10%'
        },
        {
            title:'Hành động',
            dataIndex:'action',
            width:'10%'
        },
    ]
    const formState = reactive({
        keySearch:'',
        userId:''
    }) 
    const getUser = async () => {
        await axios.get(apiUrl.GET_ALL_USER)
        .then(res=> {
            console.log(res.data);
            listUser.value = res.data;
        })
        .catch( er => {
            notification.open({
                message: 'Lỗi',
                description:`Có lỗi xảy ra: ${er}`,
                icon: () => h(ExclamationCircleOutlined, { style: "color: red;" }),
            });
        })
    }


    const pageSize = ref(5)
    const pageNumber = ref(1)
    const totalRecord = ref(0)
    const listYKien = ref([])
    const getYKienGopY = async () => {
        axios.get(`${apiUrl.GET_ALL_Y_KIEN}?UserId=${formState.userId}&keySearch=${formState.keySearch}&pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`)
        .then(res => {
            console.log(res.data.items);
            listYKien.value = res.data.items
            totalRecord.value = res.data.totalRecord
        })
        .catch(er => {
            console.log(er);
        })
    }


    const xemref = ref()
    const xemYKien = (id) => {
        xemref.value.visible = true;
        xemref.value.wId = id;
    }

    const SearchTable = () => {
        getYKienGopY();
    }

    const phanhoiref =ref();
    const phanHoi=(id) =>{
        phanhoiref.value.visible = true
        phanhoiref.value.wId = id
    }

    watch(pageNumber,()=> {
        getYKienGopY()
    })

    return {
        listUser,
        getUser,
        formState,
        columns,
        getYKienGopY,
        pageSize,
        pageNumber,
        totalRecord,
        listYKien,
        xemYKien,
        xemref,
        SearchTable,
        phanhoiref,
        phanHoi
    }
  },
  mounted(){
    this.getUser();
    this.getYKienGopY();
  }
});
</script>
  
  <style scoped>
</style>