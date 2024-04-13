<template>
  <MainLayout>
    <a-card title="Sửa mới học phần" :loading="loading">
      <template #extra>
        <a-button type="primary" @click="handleOk">
          <PlusOutlined />
          Lưu
        </a-button>
      </template>
      <a-space size="small" direction="vertical" style="width: 100%">
        <a-row>
          <a-input
            placeholder="Nhập tiêu đề, ví dụ 'Lesson 1: Contracts'"
            v-model:value="formState.tieuDe"
          />
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-textarea
              style="height: 100px"
              placeholder="Thêm mô tả chi tiết"
              v-model:value="formState.chiTiet"
            />
          </a-col>
          <a-col :span="6">
            <a-form title="Trạng thái">
              <h3 style="margin-left: 15px">Trạng Thái</h3>
              <a-radio-group
                v-model:value="formState.trangThai"
                style="margin-left: 15px"
              >
                <a-radio value="Private">Private</a-radio>
                <a-radio value="Public">Public</a-radio>
              </a-radio-group>
            </a-form>
          </a-col>

          <a-col :span="6">
            <a-form title="Trạng thái">
              <h3 style="margin-left: 15px">Thư mục</h3>
              <a-select
                v-model:value="formState.thuMucId"
                style="width: 180px; margin-left: 15px"
                placeholder="Chọn thư mục"
              >
                <a-select-option
                  v-for="thumuc in thuMuc"
                  :key="thumuc.key"
                  :value="thumuc.id"
                  >{{ thumuc.tieuDe }}</a-select-option
                >
              </a-select>
            </a-form>
          </a-col>
        </a-row>
      </a-space>

      <div style="width: 100%; margin-top: 50px">
        <a-form ref="formRef" v-bind="layout" name="nest-messages">
          <a-card
            style="width: 100%; margin-bottom: 30px"
            v-for="(stt, index) in SoThe"
            :key="index"
            :title="stt.stt"
          >
          <template #extra>
            <a-button type="primary" @click="xoaThe(stt.stt)">Xóa thẻ</a-button>
          </template>
            <a-row>
              <a-col :span="11">
                <a-input
                  placeholder="Ngôn ngữ 1"
                  v-model:value="stt.ngonNgu1"
                />
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                  "
                >
                  <p>Thuật ngữ</p>
                  <a-select v-model:value="form.thuatNgu" disabled>
                    <a-select-option
                      v-for="ngonngu in languages"
                      :key="ngonngu.id"
                      :value="ngonngu.name"
                    >
                      {{ ngonngu.name }}
                    </a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :span="11" style="margin-left: 20px; text-align: end">
                <a-input
                  placeholder="Ngôn ngữ 2"
                  v-model:value="stt.ngonNgu2"
                />
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                  "
                >
                  <p>Định nghĩa</p>
                  <a-select v-model:value="form.giaiThich" disabled>
                    
                    <a-select-option
                      v-for="ngonngu in languages"
                      :key="ngonngu.id"
                      :value="ngonngu.name"
                    >
                      {{ ngonngu.name }}
                    </a-select-option>
                  </a-select>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-form>
      </div>

      <a-card style="width: 100%; display: flex; justify-content: center">
        <a-button type="primary" @click="ThemThe"> + Thêm thẻ </a-button>
      </a-card>
    </a-card>
  </MainLayout>
</template>
      
  <script>
import { defineComponent, reactive, ref, h } from "vue";
import MainLayout from "@/layout/main.vue";
import {
  UploadOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons-vue";
import axios from "axios";
import apiUrl from "@/constants/api";
import { notification } from "ant-design-vue";
import router from "@/router";

export default defineComponent({
  components: {
    MainLayout,
    UploadOutlined,
    CloseOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
  },
  setup() {
    const loading = ref(false);
    const thuMuc = ref([]);
    const formRef = ref();
    const form = reactive({
      thuatNgu: "Chọn ngôn ngữ",
      giaiThich: "Chọn ngôn ngữ",
    });
    const SoThe = ref([
    ]);
    const formState = reactive({
      tieuDe: null,
      chiTiet: null,
      trangThai: "Public",
      thuMucId: null,
    });
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const handleOk = () => {
        loading.value = true;
        const userId = sessionStorage.getItem("userId");
        const id = router.currentRoute.value.query.id;
        // Khởi tạo mảng chứa các theHocs
        let theHocsArray = [];
        // Lặp qua mảng SoThe và thêm vào mảng theHocsArray
        SoThe.value.forEach((item) => {
          theHocsArray.push({
            id: item.id ? item.id : "string", 
            ngonNgu1: item.ngonNgu1, // Sử dụng giá trị từ mảng SoThe
            ngonNgu2: item.ngonNgu2, // Sử dụng giá trị từ mảng SoThe
            hocPhanId: id, // Thay "string" bằng giá trị thích hợp
            isKnow: false, // Hoặc true nếu muốn đặt mặc định
            thuatNgu: form.thuatNgu,
            giaiThich: form.giaiThich,
          });
        });
        axios
          .put(`${apiUrl.EDIT_HOC_PHAN}?id=${id}`, {
            hocphan: {
              id: "string",
              tieuDe: formState.tieuDe,
              moTa: formState.chiTiet,
              ngayTao: Date.now().toString(),
              ngaySua: Date.now().toString(),
              trangThai: formState.trangThai,
              userId: userId,
              thuMucId: formState.thuMucId,
            },
            theHocs: theHocsArray,
          })
          .then(() => {
            notification.open({
              message: "Thông Báo",
              description: "Sửa học phần thành công!",
              icon: () => h(CheckCircleOutlined, { style: "color: #108ee9" }),
            });
            
            router.push(`/chi-tiet-hoc-phan?id=${id}`);
          })
          .catch((err) => {
            console.log(err);
            notification.open({
              message: "Lỗi",
              description: `Có lỗi xảy ra: ${err}`,
              icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
            });
          });
    };

    const ThemThe = () => {
      SoThe.value.push({
        stt: SoThe.value.findLast((x) => x.stt).stt + 1,
        ngonNgu1: "",
        ngonNgu2: "",
      });
    };

    const GetThuMuc = async () => {
      await axios
        .get(apiUrl.GET_ALL_THU_MUC)
        .then((res) => {
          thuMuc.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const languages = ref([]);
    const getLanguage = async () => {
      await axios.get(apiUrl.GET_ALL_NGON_NGU).then((res) => {
        languages.value = res.data;
      });
    };

    const GetHocPhanByID = async () => {
      const id = router.currentRoute.value.query.id;
      await axios
        .get(`${apiUrl.GET_HOC_PHAN_BY_ID}?id=${id}`)
        .then((res) => {
          formState.tieuDe = res.data.tieuDe;
          formState.chiTiet = res.data.moTa;
          formState.trangThai = res.data.trangThai;
          formState.thuMucId = res.data.thuMucId;
        })
        .catch((err) => {
          notification.open({
            message: "Lỗi",
            description: `Có lỗi xảy ra:${err}`,
            icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
          });
        });
    };

    const GetAllTheHoc = async () => {
      const id = router.currentRoute.value.query.id;
      await axios
        .get(`${apiUrl.GET_THE_HOC}?id=${id}`)
        .then((res) => {
            form.giaiThich = res.data[0].giaiThich;
            form.thuatNgu = res.data[0].thuatNgu;
            res.data.forEach((x,index) => {
                SoThe.value.push({id:x.id, stt: index + 1, ngonNgu1: x.ngonNgu1, ngonNgu2: x.ngonNgu2 })
            });
        })
        .catch((err) => {
          notification.open({
            message: "Lỗi",
            description: "Có lỗi xảy ra!",
            icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
          });
        });
    };

    const xoaThe = (stt) => {
      const index = SoThe.value.findIndex(the => the.stt === stt);
      if (index !== -1) {
        SoThe.value.splice(index, 1);
        // Giảm stt của các thẻ đứng sau
        for (let i = index; i < SoThe.value.length; i++) {
          SoThe.value[i].stt--;
        }
      }
    }
    return {
      formState,
      loading,
      SoThe,
      layout,
      formRef,
      languages,
      thuMuc,
      form,
      handleOk,
      ThemThe,
      GetThuMuc,
      getLanguage,
      GetHocPhanByID,
      GetAllTheHoc,
      xoaThe,
    };
  },
  mounted() {
    this.GetThuMuc();
    this.getLanguage();
    this.GetHocPhanByID();
    this.GetAllTheHoc();
  },
});
</script>
      
  <style scoped>
.class-input-hide {
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}

.file-name {
  font-weight: 600;
  color: black;
  margin-left: 10px;
}
</style>