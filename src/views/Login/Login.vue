<template>
    <div id="login">
        <h3>账号密码登录</h3>
        <van-cell-group>
            <van-field v-model="username" icon="clear" placeholder="请输入用户名" />
            <van-field v-model="password" type="password" placeholder="请输入密码" />
            <!-- <van-field v-model="smsCode" placeholder="请输入验证码">
                <img slot="button" :src="codeImgUrl" />
            </van-field> -->
        </van-cell-group>
        <van-button @click="handleLogin" size="small" type="primary">登录</van-button>
    </div>
</template>

<script lang="ts" src="./Login.ts"></script>

<style lang="scss" src="./Login.scss" ></style>
