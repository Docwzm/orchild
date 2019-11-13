<template>
    <van-popup class="override"
               :value="visible"
               close-on-popstate
               safe-area-inset-bottom
               position="bottom" @click-overlay="onClose">
        <van-area class="override"
                    :value="currentArea"
                    :area-list="columns"
                    :columns-placeholder="['请选择', '请选择', '请选择']"
                    :visible-item-count="6"
                    cancel-button-text="取消"
                    confirm-button-text="确定"
                    @cancel="onClose"
                    @confirm="onConfirm">

        </van-area>
    </van-popup>
</template>

<script lang="ts" src="./AreaPicker.ts"></script>

<style lang="scss" src="./AreaPicker.scss"></style>
