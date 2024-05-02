<template >
  <MainLayout>
    <p style="font-family: 'Anta', sans-serif">Định nghĩa</p>
    <a-row>
      <a-col :span="24">
        <a-card
          style="
            display: flex;
            justify-content: center;
            font-size: 45px;
            padding: 4rem 1rem;
          "
        >
          {{ DinhNghia.ngonNgu2 }}
        </a-card>
      </a-col>
    </a-row>

    <p style="font-family: 'Anta', sans-serif; margin-top: 25px">
      Chọn thuật ngữ đúng
    </p>
    <a-row
      style="display: flex; flex-wrap: wrap; justify-content: space-around"
    >
      <a-card
        style="width: 40%; margin: 20px 0; border: 1px solid grey"
        class="options"
        v-for="(item, index) in ThuatNgu"
        :key="index"
        :loading="loading"
        bordered
        @click="checkResult(item.id)"
      >
        {{ item.ngonNgu1 }}
      </a-card>
    </a-row>
  </MainLayout>
</template>

<script>
import { defineComponent, ref, h } from "vue";
import MainLayout from "@/layout/main.vue";
import apiUrl from "@/constants/api";
import axios from "axios";
import { useRouter } from "vue-router";
import { message, notification } from "ant-design-vue";
import {
    ExclamationCircleOutlined
} from "@ant-design/icons-vue"

export default defineComponent({
  components: {
    MainLayout,
  },
  setup() {
    const DinhNghia = ref({});
    const ThuatNgu = ref([]);
    const router = useRouter()
    const loading = ref(false)
    const id = ref(router.currentRoute.value.query.id);
    const getTheHoc = () => {
      axios
        .get(`${apiUrl.GET_CARD_FOR_LEARN}?id=${id.value}`)
        .then((res) => {
            DinhNghia.value = res.data.dinhNghia;
            ThuatNgu.value = res.data.thuatngus
            console.log(ThuatNgu.value);
        })
        .catch((er) => {
            notification.open({
              message: "Lỗi",
              description: `Có lỗi xảy ra: ${er}`,
              icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
            });
        });
    };

    const checkResult = (id) => {
        loading.value = true
        message.loading('Action in progress..', loading.value);
        setTimeout(() => {
            if(DinhNghia.value.id === id)
            {
                console.log("true");
                message.success('Chính xác', 2);
                loading.value = false;
                getTheHoc();
            }
            else{
                console.log("false");
                message.error('Đáp án chưa chính xác!');
                loading.value = false;
            }
        }, 500);
    }

    return {
      DinhNghia,
      router,
      ThuatNgu,
      loading,
      getTheHoc,
      checkResult,
    };
  },
  mounted(){
    this.getTheHoc();
  }
});
</script>

<style scoped>
.options {
  cursor: pointer;
}
.options:hover {
  background-color: #eeeeee;
}
.options:focus {
  background-color: #e0e0e0;
}
</style>