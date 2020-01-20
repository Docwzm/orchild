<template>
    <div class="fieldPicker">
        <van-field
            readonly
            :label="labelText"
            clickable
            :value="value"
            :placeholder="placeholderText"
            @click="showPicker = true"
        />

        <i class="iconfont icon-picker-select"></i>

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

<script lang="ts" src="./FieldPicker.ts"></script>
<style lang="scss"  src="./FieldPicker.scss" ></style>
