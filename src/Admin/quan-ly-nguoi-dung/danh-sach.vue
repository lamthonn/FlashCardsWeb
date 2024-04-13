<template>
  <MainLayout>
    <a-card>
      
      <a-row>
        <a-col :span="10">
          <a-form>
            <a-form-item label="Từ khóa">
              <a-input></a-input>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="5">
          <a-button type="primary">Tìm kiếm</a-button>
        </a-col>
      </a-row>
    </a-card>

    <a-row style="margin-top:15px;">
      <a-col :span="24">
        <a-card title="Danh sách người dùng">
          <template #extra>
            <a-button type="primary" @click="themThongTinUser()">
              Thêm người dùng
            </a-button>
          </template>
          <a-table 
            :columns="columns" 
            :data-source="listUser" 
            :pagination="false" 
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
                <a href="javascript:void(0)" @click="xemThongTinUser(record.id)" style="padding:0 3px;">
                    <EyeOutlined />
                </a>
                <a href="javascript:void(0)" @click="xemThongTinUser(record.id)" style="padding:0 3px;">
                    <EditOutlined  />
                </a>
                <a href="javascript:void(0)" @click="xemThongTinUser(record.id)" style="padding:0 3px;">
                    <DeleteOutlined   />
                </a>
                <a href="javascript:void(0)" @click="xemThongTinUser(record.id)" style="padding:0 3px;">
                    <SyncOutlined />
                </a>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </MainLayout>
  <!-- <ThemUser ref="themref"/> -->
</template>

<script>
import apiUrl from "@/constants/api";
import MainLayout from "@/layout/main.vue";
import axios from "axios";
import { defineComponent, ref, watch } from "vue";
// import ThemUser from './them-nguoi-dung/chi-tiet.vue'
import { 
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    MainLayout,
    // ThemUser,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    SyncOutlined
  },
  setup(){
    const pageSize = ref(5)
    const pageNumber = ref(1)
    const totalRecord = ref(0)
    const listUser = ref([])
    const themref = ref();
    const columns = [
      {
        title:'Username',
        dataIndex:'username',
        width:'10%'
      },
      {
        title:'Tên người dùng',
        dataIndex:'ten',
        width:'10%'
      },
      {
        title:'Email',
        dataIndex:'email',
        width:'15%'
      },
      {
        title:'Số điện thoại',
        dataIndex:'soDienThoai',
        width:'10%'
      },
      {
        title:'Giới tính',
        dataIndex:'gioiTinh',
        width:'5%'
      },
      {
        title:'Hành động',
        dataIndex:'action',
        width:'6%'
      },
    ]
    const getUser = () => {
      axios.get(`${apiUrl.GET_PAGIN_LIST_USER}?pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`)
        .then(res=> {
          console.log(res.data);
          listUser.value = res.data.items;
          totalRecord.value = res.data.totalRecord;
        })
        .catch(err => {
          console.log(err);
        })
    }

    const themThongTinUser = () => {
      themref.value.visible = true
    }

    const xemThongTinUser = (id) => {
      console.log(id);
    }

    watch(pageNumber, () => {
      getUser();
    })

    return {
      pageSize,
      pageNumber,
      listUser,
      getUser,
      columns,
      totalRecord,
      xemThongTinUser,
      themThongTinUser,
      themref,
    }
  },
  mounted(){
    
    this.getUser();
  }
});
</script>

<style scoped>
</style>