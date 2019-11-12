<template>
    <div id="login">
        <img class="logo" :src="logoImgUrl" />
        <van-cell-group v-if="!isAccount">
            <van-field v-model="inputFields.mobile" center placeholder="请输入注册手机号" />
            <van-field v-model="inputFields.verifyCode" center  placeholder="请输入验证码">
                <van-button slot="button" class="codeBtn" size="small" type="primary"
                            :disabled="!canReloadVerifyCode"
                            @click="getVerifyCode">{{verifyCodeLabel}}</van-button>
            </van-field>
        </van-cell-group>
        <van-cell-group v-if="isAccount">
            <van-field v-model="inputFields.account" center placeholder="请输入登录账号" />
            <van-field v-model="inputFields.password" center type="password" placeholder="请输入密码" />
            <van-field v-model="inputFields.imgCode" center placeholder="请输入验证码">
                <img slot="button" class="codeImg" :src="authCodeImg" @click="updateAuthCode" />
            </van-field>
        </van-cell-group>
        <van-button class="loginBtn" @click="handleLogin" size="small" type="primary">登录</van-button>
        <div class="oprateBtn">
            <van-button size="small" @click="isAccount=!isAccount">{{ loginTxt }}</van-button>
            <van-button size="small">重置密码</van-button>
        </div>
        <van-button class="registerBtn" size="small" @click="viewRegister">注册新账号</van-button>
    </div>
</template>

<script lang="ts" src="./Login.ts"></script>

<style lang="scss" src="./Login.scss" ></style>
