<template>
    <MainLayout>
      <a-card>
      <a-row>
        <a-col :span="8">
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
        <a-card title="Danh sách Blog">
          <template #extra>
            <a-button type="primary" @click="themBlog()">
              Thêm Blog
            </a-button>
          </template>
          <a-table 
            :columns="columns" 
            :data-source="listBlog" 
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
                <a href="javascript:void(0)" @click="xemBlog(record.id)" style="padding:0 3px;">
                    <EyeOutlined />
                </a>
                <a href="javascript:void(0)" @click="suaBlog(record.id)" style="padding:0 3px;">
                    <EditOutlined  />
                </a>
                  <a-popconfirm
                      title="Bạn có chắc chắn muốn xóa Blog này"
                      ok-text="Yes"
                      cancel-text="No"
                      @confirm="xoaBlog(record.id)"
                      @cancel="cancel"
                  >
                    <a href="javascript:void(0)"><DeleteOutlined   /></a>
                  </a-popconfirm>
                  
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>

    <ThemBlog ref="themref" @lamMoiBang="getBlog()"/>
    <XemBlog ref="xemref"/>
    <SuaBlog ref="suaref" @lamMoiBang="getBlog()"/>
    </MainLayout>
</template>
<script>
import apiUrl from "@/constants/api";
import MainLayout from "@/layout/main.vue";
import axios from "axios";
import { defineComponent, ref, h, watch } from "vue";
import ThemBlog from './them-blog.vue';
import SuaBlog from './sua-blog.vue';
import { 
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import XemBlog from "@/Admin/quan-ly-blog/xem-blog.vue";

export default defineComponent({
  components: {
    MainLayout,
    ThemBlog,
    XemBlog,
    SuaBlog,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    SyncOutlined
  },
  setup(){
    const pageSize = ref(10)
    const pageNumber = ref(1)
    const totalRecord = ref(0)
    const listBlog = ref([])
    const themref = ref();
    const xemref = ref();
    const suaref = ref();
    const columns = [
      {
        title:'Tiêu đề',
        dataIndex:'title',
        width:'10%'
      },
      {
        title:'Nội dung',
        dataIndex:'description',
        width:'20%'
      },
      {
        title:'Thời gian đăng tải',
        dataIndex:'timeCreated',
        width:'15%'
      },
      {
        title:'Ảnh Blog',
        dataIndex:'AnhDaiDien',
        width:'15%'
      },
      {
        title:'Hành động',
        dataIndex:'action',
        width:'6%'
      },
    ]
    const getBlog = () => {
      axios.get(`${apiUrl.GET_ALL_BLOG}`)
        .then(res=> {
          console.log(res.data);
          listBlog.value = res.data.items;
          totalRecord.value = res.data.totalRecord;
        })
        .catch(err => {
          console.log(err);
        })
    }

    const themBlog = () => {
      
      themref.value.visible = true
    }

    const xemBlog = (id) => {
      xemref.value.visible = true
      xemref.value.wId = id
    }

    const suaBlog = (id) => {
      suaref.value.visible = true
      suaref.value.wId = id
    }

    const xoaBlog = async (id) => {
      await axios.delete(`${apiUrl.DELETE_USER}?id=${id}`)
      .then(()=> {
        notification.open({
          message: 'Thông báo',
          description:'Xóa thông tin thành công',
          icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
        });
        getBlog();
      })
      .catch(er => {
        notification.open({
          message: 'Lỗi',
          description:`Có lỗi xảy ra: ${er}`,
          icon: () => h(ExclamationCircleOutlined, { style: "color: red;" }),
        });
      })
    }

    return {
      pageSize,
      pageNumber,
      listBlog,
      getBlog,
      columns,
      totalRecord,
      xemBlog,
      themBlog,
      themref,
      xemref,
      suaref,
      suaBlog,
      xoaBlog,
    }
  },
  mounted(){
    
    this.getBlog();
  }
});
</script>

