<template>
    <div class="content-wrap">
        <p>本人身份证</p>
        <div class="photo-wrap">
            <div class="photo-item">
                <img src="../../../assets/authentication/card-front.png">
                <p>拍摄人面像</p>
            </div>
            <div class="photo-item">
                <img src="../../../assets/authentication/card-back.png">
                <p>拍摄国徽面</p>
            </div>
        </div>

        <div class="detail-footer">
            <van-button class="override btn-block" type="primary" @click="onRegister">提 交</van-button>
        </div>
    </div>
</template>

<script lang="ts" src="./AuthCertificate.ts"></script>

<style lang="scss" src="./AuthCertificate.scss" ></style>
