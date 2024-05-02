<template>
    <a-button 
        class="flashCard"
        :class ="{ 'isChoose': isSelect}"
        :disabled ='isMatch === true ? true : false'
        @click="onToggleFlipCard"
    >
        <p 
        style="font-size:20px;"
        >{{ title }}</p>
    </a-button>
</template>

<script>
import { defineComponent, ref, toRef, watch } from 'vue';
export default defineComponent({
    props: {
     data:{},
     title: String,
     select: Boolean,
     match: Boolean,
    },
    setup(props, context){
        const isSelect = ref(props.select);
        const isMatch = ref(props.match);
        const onToggleFlipCard = () => {
            if(isMatch.value) return false;

            isSelect.value  = !isSelect.value;
            if(isSelect.value) context.emit('onFlip', props.data)
        }
        const onFlipBackCard = () => {
            isSelect.value = false;
        }

        const onEnableDisableMode = () => {
            isMatch.value = true;
        }

        const resetCardState = () => {
            isSelect.value = false;
            isMatch.value = false;
        }

        // watch(isSelect, (newValue) => {
        //     // If the card is unselected, reset its state
        //     if (!newValue) resetCardState();
        // });

        return {
            ...props,
            onToggleFlipCard,
            resetCardState,
            // select,
            isSelect,
            isMatch,
            onFlipBackCard,
            onEnableDisableMode
        };
    }
})
</script>

<style scoped>
    .flashCard{
        background-color: rgb(255, 255, 255);
        width: 18%;
        margin:5px 1%;
        height: 90px;
        text-align: center;
        cursor: pointer;
    }

    .isChoose{
        background-color: rgb(149, 253, 227);
    }

</style>