<template>
    
    <!-- làm lại -->
    <div class="screemMain">
        <div style="margin:10px 0; text-align:center;">
            Thời gian {{ formattedTime }}
        </div>
        <a-card class="Maingame">
            <div style="display: flex;width: 100%;flex-wrap: wrap;">
            <CardFlipped 
                v-for="(item, index) in listTheHoc1" 
                :key="index"
                :data="item"
                :title="item.ngonNgu1"
                :ref="setCardRef"
                @onFlip ="checkRule($event, index)"
            />
            <CardFlipped 
                v-for="(item, index) in listTheHoc2" 
                :key="index"
                :data="item"
                :title="item.ngonNgu2"
                :ref="setCardRef"
                @onFlip ="checkRule($event, index + 10)"
            />
        </div>
        </a-card>
    </div>
</template>

<script>
import apiUrl from '@/constants/api';
import { Modal, notification } from 'ant-design-vue';
import axios from 'axios';
import { createVNode, defineComponent, ref, h, watch, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    ExclamationCircleOutlined
}  from "@ant-design/icons-vue"
import CardFlipped from '../card/Card.vue'

export default defineComponent({
    name:'start-game',
    
    components:{
        CardFlipped,
        ExclamationCircleOutlined
    },
    setup(props, context){
        const open = ref(true)
        const loading = ref(false)
        const router = useRouter();
        const listTheHoc1 = ref([])
        const listTheHoc2 = ref([])
        const time = ref(0)
        let intervalId = null;

        const startTimer = () => {
        if (!loading.value) {
            loading.value = true;
            intervalId = setInterval(() => {
            time.value++;
            }, 1000);
        }
        };

        const stopTimer = () => {
        if (loading.value) {
            loading.value = false;
            clearInterval(intervalId);
            intervalId = null;
        }
        };

        onUnmounted(() => {
            clearInterval(intervalId);
        });

        const getRandom = async () => {
            const id = router.currentRoute.value.query.id;
            await axios.get(`${apiUrl.GET_RANDOM_THE_HOC}?id=${id}`)
            .then(res => {
                listTheHoc1.value = res.data.slice(0, res.data.length / 2);
                listTheHoc2.value = res.data.slice(res.data.length / 2);

                console.log(listTheHoc1.value);
            })
            .catch(err => {
                notification.open({
                    message: "Lỗi",
                    description: "Có lỗi xảy ra!",
                    icon: () => h(ExclamationCircleOutlined, { style: "color: red" }),
                });
            })
        }

        const cardRefs = ref([]);
        const setCardRef = el => {
        if (el) {
            cardRefs.value.push(el);
        }
        };
        const rule = ref([])
        const refIndex = ref([])
        const match = ref([])
        const checkRule =(data, index) =>{
            refIndex.value.push(index);
            rule.value.push(data);
            if (rule.value.length === 2) {
                if (rule.value[0].id === rule.value[1].id) {
                    // Cả hai thẻ cùng ID
                    refIndex.value.forEach(index => {
                        match.value.push(index);
                        checkWinner();
                        setTimeout(() => {
                            cardRefs.value[index].onFlipBackCard();
                            cardRefs.value[index].onFlipBackCard();

                            cardRefs.value[index].onEnableDisableMode();
                            cardRefs.value[index].onEnableDisableMode();
                        }, 200);
                    })
                    rule.value = [];
                    refIndex.value = [];
                } else {
                    // Không cùng ID
                    refIndex.value.forEach(index => {
                        setInterval(() => {
                            cardRefs.value[index].onFlipBackCard();
                            cardRefs.value[index].onFlipBackCard();
                        }, 300);
                    })
                    rule.value = [];
                    refIndex.value = [];
                }
            }
        }

        const checkWinner = () => {
            if(match.value.length === 20)
            {
                context.emit('winGame',formattedTime.value.toString())
            }
        }

        const formattedTime = computed(() => {
            const minutes = Math.floor(time.value / 60);
            const seconds = time.value % 60;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        });

        return {
            open,
            cardRefs,
            refIndex,
            setCardRef,
            getRandom,
            loading,
            time,
            router,
            listTheHoc1,
            listTheHoc2,
            rule,
            match,
            checkRule,
            startTimer,
            checkWinner,
            formattedTime,
        }
    },
    mounted(){
        this.startTimer();
        this.getRandom();
    }
})


</script>

<style scoped>
    .Maingame{
        margin-top: 15px;
        background-color: rgb(231, 231, 231);
    }


</style>