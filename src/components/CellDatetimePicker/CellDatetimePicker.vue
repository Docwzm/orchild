<template>
    <van-cell>
        <van-field :label="label"
                   readonly
                   :required="required"
                   clickable
                   :placeholder="placeholder"
                   :value="hintText"
                   @click="pickerVisible = true">

            <template slot="right-icon">
                <i class="iconfont icon-liebiao"></i>
            </template>
        </van-field>

        <van-popup class="override" v-model="pickerVisible"
                   close-on-popstate
                   safe-area-inset-bottom
                   position="bottom">
            <van-datetime-picker
                    class="override"
                     show-toolbar
                     :item-height="48"
                     :visible-item-count="6"
                     cancel-button-text="取消"
                     confirm-button-text="确定"
                     :type="type"
                     @cancel="pickerVisible = false"
                     @confirm="onConfirm"/>
        </van-popup>
    </van-cell>
</template>

<script lang="ts" src="./CellDatetimePicker.ts"></script>

<style lang="scss" src="./CellDatetimePicker.scss"></style>
