<template>
    <MainLayout>
        <a-card title="Bộ thẻ học" bordered="true" :loading="loading">
            <template #extra>
                <a-button type="dashed" @click="TaoHocPhan">
                    <PlusOutlined />
                    Tạo học phần
                </a-button>
            </template>
            <a-row style="margin-bottom:2rem;">
                <a-col :span="12">
                    <a-select v-model:value="fromState.trangthai">
                        <a-select-option value="Gần đây" defaultOpen>Gần đây</a-select-option>
                        <a-select-option value="Đã tạo">Đã tạo</a-select-option>
                        <a-select-option value="Đã học">Đã học</a-select-option>
                        <a-select-option value="Đãhọc">Gần đây</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="12">
                    <a-row>
                        <a-col :span="18">
                            <a-input placeholder="Từ khóa...">
                                <template #suffix>
                                    <a-tooltip title="Extra information">
                                        <SearchOutlined  style="color: rgba(0, 0, 0, 0.45)" />
                                    </a-tooltip>
                                </template>
                            </a-input>
                        </a-col>
                        <a-col :span="4" style="text-align: end;">
                            <a-button type="primary">Tìm kiếm</a-button>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>


            <a-row style="margin-top:1.5rem;">
                <div style="width: 100%">
                    <a-card >
                        <a-row>
                            <a-col :span="19">
                                <a-row>
                                    <a-col :span="3"> 12 thẻ học</a-col>
                                    <a-col :span="3" style="display: flex; align-items:center; ">
                                        <a-avatar size="small" style="margin-right: 5px;" src="https://cdn4.iconfinder.com/data/icons/profession-avatar-5/64/29-programmer-512.png"/>  
                                        lamvu123
                                    </a-col>
                                </a-row>
                                <h1 class="titleCard">Lesson 4: Business Planning</h1>
                            </a-col>
                            <a-col :span="5" style="color: grey;">
                                <p>Ngày tạo:</p>
                                <p>03/03/2024</p>
                            </a-col>
                        </a-row>
                    </a-card>
                </div>
            </a-row>

            <a-row style="margin-top:1.5rem;">
                <div style="width: 100%">
                    <a-card >
                        <a-row>
                            <a-col :span="19">
                                <a-row>
                                    <a-col :span="3"> 12 thẻ học</a-col>
                                    <a-col :span="3" style="display: flex; align-items:center; ">
                                        <a-avatar size="small" style="margin-right: 5px;" src="https://cdn4.iconfinder.com/data/icons/profession-avatar-5/64/29-programmer-512.png"/>  
                                        lamvu123
                                    </a-col>
                                </a-row>
                                <h1 class="titleCard">Lesson 4: Business Planning</h1>
                            </a-col>
                            <a-col :span="5" style="color: grey;">
                                <p>Ngày tạo:</p>
                                <p>03/03/2024</p>
                            </a-col>
                        </a-row>
                    </a-card>
                </div>
            </a-row>
        </a-card>
    </MainLayout>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { h } from 'vue';
import { useRouter } from "vue-router";
import MainLayout from "@/layout/main.vue";
import {  
    SearchOutlined,
    PlusOutlined 
} from '@ant-design/icons-vue';
 

export default defineComponent({
    name:"hoc-phan",
    components: {
        MainLayout,
        SearchOutlined ,
        PlusOutlined,
    },
    setup(){
        const router = useRouter();
        const loading = ref(false);
        const fromState = reactive({
            keySearch:null,
            trangthai:"Gần đây"
        })

        const TaoHocPhan = () => {
            router.push("/tao-hoc-phan");
            loading.value = false;
        }

        return{
            fromState,
            loading,
            router,
            TaoHocPhan,
        }
    }
})
</script>

<style scoped>
    .titleCard{
        font-size: 1.4rem;
        display: flex;
        margin: 0;
        margin-top: 7px;
    }
</style>