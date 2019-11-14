<template>
    <div id="login">
        <img class="logo" :src="logoImgUrl" />
        <van-cell-group v-if="!isAccount">
            <van-field v-model="inputFields.mobile" center placeholder="请输入注册手机号" />
            <orchid-verify-code-text-field :mobile="inputFields.mobile" v-model="inputFields.verifyCode"></orchid-verify-code-text-field>
        </van-cell-group>
        <van-cell-group v-if="isAccount">
            <van-field v-model="inputFields.account" center placeholder="请输入登录账号" />
            <van-field v-model="inputFields.password" center type="password" placeholder="请输入密码" />
            <van-field v-model="inputFields.imgCode" center placeholder="请输入验证码">
                <img slot="button" class="codeImg" :src="authCodeImg" @click="updateAuthCode" />
            </van-field>
        </van-cell-group>
        <div class="login-btn-wrap">
            <van-button class="override btn-block" @click="handleLogin" size="small" type="primary">登录</van-button>
        </div>
        <div class="oprateBtn">
            <van-button size="small" @click="isAccount=!isAccount">{{ loginTxt }}</van-button>
            <van-button size="small" @click="viewResetPwd">重置密码</van-button>
        </div>
        <van-button class="registerBtn" size="small" @click="viewRegister">注册新账号</van-button>
    </div>
</template>

<script lang="ts" src="./Login.ts"></script>

<style lang="scss" src="./Login.scss" ></style>
