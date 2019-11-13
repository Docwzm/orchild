<template>
    <van-field :value="value" @input="onChange" center placeholder="请输入验证码">
        <van-button slot="button" class="codeBtn" size="small" type="primary"
                    :disabled="!canReloadVerifyCode"
                    @click="getVerifyCode">{{verifyCodeLabel}}
        </van-button>
    </van-field>
</template>

<script lang="ts" src="./verifyCodeTextField.ts"></script>

<style lang="scss" src="./verifyCodeTextField.scss"></style>
