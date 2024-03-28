<template>
  <MainLayout>
    <a-card title="Thư mục" bordered="true" :loading="loading">
      <template #extra>
        <a-button type="dashed" @click="ThemThuMuc">
          <PlusOutlined />
          Tạo thư mục
        </a-button>
      </template>
      <a-row style="margin-bottom: 2rem">
        <a-col :span="12">
          <a-select v-model:value="fromState.trangthai">
            <a-select-option value="Gần đây" defaultOpen
              >Gần đây</a-select-option
            >
            <a-select-option value="Đã tạo">Đã tạo</a-select-option>
            <a-select-option value="Đã học">Đã học</a-select-option>
            <a-select-option value="Gần đây">Gần đây</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="12">
          <a-row>
            <a-col :span="18">
              <a-input placeholder="Từ khóa...">
                <template #suffix>
                  <a-tooltip title="Extra information">
                    <SearchOutlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </a-col>
            <a-col :span="4" style="text-align: end">
              <a-button type="primary">Tìm kiếm</a-button>
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      
    </a-card>
  </MainLayout>
  <TaoThuMuc ref="themRef" @lamMoiBang="resetList" />
</template>
  
  <script>
import MainLayout from "@/layout/main.vue";
import { defineComponent, reactive, ref } from "vue";
import { h } from "vue";
import { useRouter } from "vue-router";
import {
  SearchOutlined,
  PlusOutlined,
  FolderOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import TaoThuMuc from "@/components/thu-vien/thu-muc/tao-thu-muc/chi-tiet.vue";
import axios from "axios";
import apiUrl from "@/constants/api";

export default defineComponent({
  name: "thu-muc",
  components: {
    MainLayout,
    TaoThuMuc,
    SearchOutlined,
    PlusOutlined,
    FolderOutlined,
    ExclamationCircleOutlined,
  },
  setup(props, context) {
    const router = useRouter();
    const loading = ref(false);
    const dsThuMuc = ref([]);
    const fromState = reactive({
      keySearch: null,
      trangthai: "Gần đây",
    });
    const themRef = ref();

    const ThemThuMuc = () => {
      themRef.value.visible = true;
    };

    const resetList = async () => {
      await GetData();
    };

    const GetData = async () => {
      await axios
        .get(apiUrl.GET_ALL_THU_MUC)
        .then((res) => {
          dsThuMuc.value = res.data;
          console.log(dsThuMuc.value);
        })
        .catch((err) => {
          notification.open({
            message: "Lỗi",
            description: "Có lỗi xảy ra!",
            icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
          });
        });
    };

    return {
      fromState,
      loading,
      router,
      themRef,
      dsThuMuc,
      ThemThuMuc,
      resetList,
      GetData,
    };
    }
});
</script>
  
  <style scoped>

</style>