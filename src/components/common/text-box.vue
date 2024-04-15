<template>
    <p class="text-box"><slot></slot></p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {

    }
})
</script>

<style scoped>
.text-box {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: 'tnum';
    display: inline-block;
    width: 100%;
    min-width: 0;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 1.5715;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    font-family: inherit;
}
</style>