<template>
    <div id="login">
        <img class="logo" :src="logoImgUrl" />
        <van-cell-group v-if="!isAccount">
            <van-field v-model="loginParams.mobile" center  placeholder="请输入手机号" />            
            <van-field v-model="loginParams.verifyCode" center  placeholder="请输入验证码">
                <van-button slot="button" class="codeBtn" size="small" type="primary">获取验证码</van-button>
            </van-field>            
        </van-cell-group>
        <van-cell-group v-if="isAccount">
            <van-field v-model="loginParams.account" center placeholder="请输入用户名" />
            <van-field v-model="loginParams.password" center type="password" placeholder="请输入密码" />
            <van-field v-model="loginParams.imgCode" center placeholder="请输入验证码">
                <img slot="button" class="codeImg" :src="codeImgUrl" />                
            </van-field>
        </van-cell-group>
        <van-button class="loginBtn" @click="handleLogin" size="small" type="primary">登录</van-button>
        <div class="oprateBtn">
            <van-button size="small" @click="isAccount=!isAccount">账号密码登录</van-button>
            <van-button size="small">重置密码</van-button>
        </div>
        <van-button class="registerBtn" size="small">注册新账号</van-button>
    </div>
</template>

<script lang="ts" src="./Login.ts"></script>

<style lang="scss" src="./Login.scss" ></style>
