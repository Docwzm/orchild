<template>
    <div class="cell">
        <van-cell :title="title" :value="defaultValue" :icon="leftIcon" @click="chooseValueEvt">
            <van-icon
                slot="right-icon"
                :name="rightIcon"
                style="line-height: inherit;margin-left:10px;"
            />
        </van-cell>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                class="override"
                show-toolbar
                :item-height="$utils.platform()?100:48"
                :visible-item-count="6"
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>
<script lang="ts" src="./Cell.ts"></script>
<style lang="scss"  src="./Cell.scss" ></style>
