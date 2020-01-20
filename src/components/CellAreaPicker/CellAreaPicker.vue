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

        <orchid-area-picker
                ref="areaPicker"
                :value="value"
                :visible="pickerVisible"
                @close="onClose"
                @confirm="onConfirm">

        </orchid-area-picker>
    </van-cell>
</template>

<script lang="ts" src="./CellAreaPicker.ts"></script>

<style lang="scss" src="./CellAreaPicker.scss"></style>
