<template>
    <div class="authentication-wrap">
        <div class="step-wrap">
            <van-steps class="override" :active="activeIndex" active-color="#c1a585">
                <van-step>提交证件</van-step>
                <van-step>完善资料</van-step>
                <van-step>人脸识别</van-step>
            </van-steps>
        </div>
        <van-notice-bar text="温馨提示：为保障您的权益，需先进行身份验证" />

        <router-view/>
    </div>
</template>

<script lang="ts" src="./Authentication.ts"></script>

<style lang="scss" src="./Authentication.scss" ></style>
