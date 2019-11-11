<template>
    <div class="cell">
        <van-cell :title="title" :value="value" :icon="leftIcon" @click="chooseValueEvt">
            <van-icon
                slot="right-icon"
                name="bars"
                style="line-height: inherit;margin-left:10px;font-size:22px;"
            />
        </van-cell>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>
<script lang="ts" src="./Cell.ts"></script>
<style lang="scss"  src="./Cell.scss" ></style>
