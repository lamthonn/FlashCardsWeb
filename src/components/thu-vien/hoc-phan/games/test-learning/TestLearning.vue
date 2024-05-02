<template>
    <a-spin
        :spinning="loading"
        tip="Loading..."
    >
        <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="Kiểm tra học phần"
            @back="backPage"
        />
        <a-statistic-countdown
            title="Thời gian"
            :value="deadline"
            style="text-align:center;"
            @finish="onFinish"
        />
        
        <a-card class="Maingame">
            <div>
                <a-card 
                    class="flashCard" 
                    style="width: 60%; margin-left:20%; margin-bottom:3rem; background-color: #f6f6f6;"
                    v-for="(item,index) in data.phan1"
                    :key="item.id"
                >
                    <a-row>
                        <a-col :span="23">
                            <p style="font-family: 'Anta', sans-serif;">Thuật ngữ</p>
                        </a-col>
                        <a-col :span="1">
                            <p style="font-family: 'Anta', sans-serif;">{{ index + 1 }}/{{ data.phan1.length + data.phan2.length + data.phan3.length }}</p>
                        </a-col>
                        <a-col :span="24" style="text-align:center; font-size:35px; margin:50px 0;">
                            {{ item.ngonNgu1 }}
                        </a-col>
                        
                    </a-row>
                        <a-row>
                            <p style="font-family: 'Anta', sans-serif; width: 100%;">Giải thích</p>
                            <div style="width: 100%;">
                                <a-input @blur="handleBlur(1,item.id,index + 1,$event)" placeholder="Nhập đáp án"/>
                                <!-- <a-button style="width: 8%; margin-left:1%;">Ok</a-button> -->
                            </div>
                        </a-row>
                </a-card>

                <a-card 
                    class="flashCard" 
                    style="width: 60%; margin-left:20%; margin-bottom:3rem;background-color: #f6f6f6;"
                    v-for="(item,index)  in data.phan2"
                    :key="item.id"
                >
                    <a-row>
                        <a-col :span="23">
                            <p style="font-family: 'Anta', sans-serif;">Thuật ngữ</p>
                        </a-col>
                        <a-col :span="1">
                            <p style="font-family: 'Anta', sans-serif;">{{ index + 1 + data.phan1.length }}/{{ data.phan1.length + data.phan2.length + data.phan3.length }}</p>
                        </a-col>
                        <a-col :span="24" style="text-align:center; font-size:55px; margin:45px 0;">
                            <SoundOutlined style="cursor: pointer;" @click="StartSound(item.ngonNgu1)"/>
                        </a-col>
                    </a-row>

                    <a-row>
                        <p style="font-family: 'Anta', sans-serif;">Giải thích</p>
                        <a-input @blur="handleBlur(2,item.id,index + 1 + data.phan1.length,$event)" placeholder="Nhập đáp án"/>
                    </a-row>
                </a-card>

                <a-card
                    class="flashCard" 
                    style="width: 60%; margin-left:20%; margin-bottom:3rem;background-color: #f6f6f6;"
                    v-for="(item,index) in data.phan3"
                    :key="item.id"
                >
                    <a-row>
                        <a-col :span="23">
                            <p style="font-family: 'Anta', sans-serif;">Thuật ngữ</p>
                        </a-col>
                        <a-col :span="1">
                            <p style="font-family: 'Anta', sans-serif;">{{ index + 1 + data.phan1.length + data.phan2.length }}/{{ data.phan1.length + data.phan2.length + data.phan3.length }}</p>
                        </a-col>
                        <a-col :span="24" style="text-align:center; font-size:35px; margin:50px 0;">
                            {{ item.main.ngonNgu2 }}
                        </a-col>
                    </a-row>


                    <a-row >
                        <p style="font-family: 'Anta', sans-serif;">Chọn thẻ đúng nhất</p>
                        <a-col :span="24" style="display: flex; flex-wrap: wrap; justify-content: space-around">
                            <a-card
                                style="width: 40%; margin: 20px 0; border:1px solid #777777"
                                class="options"
                                v-for="i in item.subItems"
                                :class="{ 'highlighted': isSelected.find(x=> x.value === i)}"
                                :key="i.id"
                                :loading="loading"
                                @click="selectCard(i, index + 1 + data.phan1.length + data.phan2.length, index)"
                                bordered
                            >
                                {{ i.ngonNgu1 }}
                            </a-card>
                        </a-col>
                    </a-row>
                </a-card>

                <a-card 
                    class="btn_submit"
                    @click="submitTest"
                >
                        Nộp bài
                </a-card>
            </div>
        </a-card>
        </a-spin>
        <KetQuaKiemTra ref="ketQuaRef" />
</template>

<script>
import { createVNode, defineComponent, h, reactive, ref } from 'vue';
import MainLayout from "@/layout/main.vue";
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import apiUrl from '@/constants/api';
import {  Modal, notification } from 'ant-design-vue';
import {
    ExclamationCircleOutlined,
    SoundOutlined 
} from "@ant-design/icons-vue";
import KetQuaKiemTra from './result-srceen/Result.vue';

export default defineComponent({
    components:{
        MainLayout,
        KetQuaKiemTra,
        ExclamationCircleOutlined,
        SoundOutlined 
    },
    setup(){
        const loading = ref(true)
        const deadline = Date.now() + 1000*60*15;
        const router = useRouter();
        const data = ref({})
        const id = ref(router.currentRoute.value.query.id);
        const formState = reactive({
            result: [],
        })

        const backPage = () => {
            router.go(-1);
        }

        const getListCardForTest = () => {
            axios.get(`${apiUrl.GET_LIST_CARD_FOR_TEST}?id=${id.value}`)
            .then(res => {
                data.value = res.data;
            })
            .catch(er => {
                notification.open({
                    message: "Lỗi",
                    description: `Có lỗi xảy ra: ${er}`,
                    icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
                });
            })
        }

        const StartSound = (text) => {
            const msg = new SpeechSynthesisUtterance();
            msg.lang = 'en-US';
            msg.text = text;
            window.speechSynthesis.speak(msg);
        }

        
        const onFinish = () => {
            loading.value = true;
            setTimeout(() => {
                loading.value = false;
            }, 3000);
            Modal.error({
                title: 'Hết thời gian làm bài!',
                onOk() {
                    
                },
            })
        }

        const handleBlur =(phan, id,stt, event) => {
            const value = event.target.value;
            if(phan === 1 || phan === 2)
            {
                axios.post(`${apiUrl.CHECK_RESULT_1}`, {
                    id: id,
                    answer: value,
                })
                .then(res => {
                    const index = formState.result.findIndex(item => item.stt === stt);
                    if (index !== -1) {
                        // Nếu đã tồn tại, xóa phần tử đó
                        formState.result.splice(index, 1);
                    }

                    formState.result.push({
                        stt:stt,
                        value: res.data
                    })
                })
                .catch(er => {
                    notification.open({
                        message: "Lỗi",
                        description: `Có lỗi xảy ra: ${er}`,
                        icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
                    });
                })
            }
        }

        const isSelected = ref([]);
        const selectCard = (card, stt,index) => {
            const CheckCard = data.value.phan3[index];
            const indexDuplicate = formState.result.findIndex(item => item.stt === stt);
            const indexDuplicate2 = isSelected.value.findIndex(item => item.stt === stt);
            if (indexDuplicate2 !== -1) {
                // Nếu đã tồn tại, xóa phần tử đó
                isSelected.value.splice(indexDuplicate, 1);
            }
            isSelected.value.push({
                stt:stt,
                value: card
            })
            if (indexDuplicate !== -1) {
                // Nếu đã tồn tại, xóa phần tử đó
                formState.result.splice(indexDuplicate, 1);
            }

            if(card.id === CheckCard.main.id)
            {
                formState.result.push({
                    stt:stt,
                    value: true
                })
            }
            else{
                formState.result.push({
                    stt:stt,
                    value: false
                })
            }
        }

        const ketQuaRef = ref();
        const submitTest = () => {
            var corect = 0;
            const total = data.value.phan1.length + data.value.phan2.length + data.value.phan3.length
            ketQuaRef.value.visible = true;
            
            formState.result.forEach(e=> {
                if(e.value === true){
                    corect ++;
                }
            })
            ketQuaRef.value.isCorrect = corect;
            ketQuaRef.value.total = total;
        }

        return{
            router,
            data,
            id,
            deadline,
            loading,
            formState,
            isSelected,
            ketQuaRef,
            backPage,
            getListCardForTest,
            StartSound,
            onFinish,
            submitTest,
            selectCard,
            handleBlur,
        }
    },
    mounted(){
        const router = useRouter();
        const app = this;
        Modal.confirm({
            title: 'Bạn đã sẵn sàng?',
            content: createVNode('div', { style: 'color:black;' }, 'Hãy trả lời tất cả câu hỏi của chúng tôi nhanh nhất có thể.'),
            onOk() {
                app.loading = false;
            },
            onCancel() {
                router.go(-1);
            },
        })  
        this.getListCardForTest();
    }
})
</script>

<style scoped>
    .btn_submit{
        cursor: pointer;
        background-color: #abf2ff;
        font-family: 'Anta', sans-serif;
        font-size: 30px;
        text-align: center;
    }

    .btn_submit :hover{
        background-color: #89ecfd;
    }

    .btn_submit :active{
        background-color: #63e8ff;
    }

    .options {
        cursor: pointer;
    }
    .options:hover {
    background-color: #eeeeee;
    }
    .options:focus {
    background-color: #e0e0e0;
    }
    .highlighted {
        background-color:rgb(125, 218, 255); /* Yourgb(96, 236, 255)djust the highlight style */
    }
</style>