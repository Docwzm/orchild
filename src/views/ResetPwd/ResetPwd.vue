<template>
    <div class="reset-wrap">
        <van-cell-group>
            <van-field v-model="inputFields.mobile" center placeholder="注册手机号" />

            <orchid-verify-code-text-field :mobile="inputFields.mobile" v-model="inputFields.verifyCode"></orchid-verify-code-text-field>

            <van-field v-model="inputFields.password" center type="password" placeholder="重置密码（6-16位包含字母、数字）" />

            <van-field v-model="confirmPassword" center type="password" placeholder="确认密码" />

            <van-button class="override btn-block" type="primary" @click="onReset">重置密码</van-button>

        </van-cell-group>

    </div>
</template>

<script lang="ts" src="./ResetPwd.ts"></script>

<style lang="scss" src="./ResetPwd.scss" ></style>
