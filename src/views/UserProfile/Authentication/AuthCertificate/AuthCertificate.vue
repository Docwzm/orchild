<template>
    <div class="content-wrap">
        <p>本人身份证</p>
        <div class="photo-wrap">
            <div class="photo-item">
                <van-uploader :after-read="onFrontUpload" capture="camera">
                    <img v-if="cardFrontImg" class="card-front" :src="cardFrontImg">
                    <img v-else class="card-front" src="../../../../assets/authentication/card-front.png">
                </van-uploader>
                <p>拍摄人面像</p>
            </div>
            <div class="photo-item">
                <van-uploader :after-read="onEndUpload" capture="camera">
                    <img v-if="cardBackImg" class="card-back" :src="cardBackImg">
                    <img v-else class="card-back" src="../../../../assets/authentication/card-back.png">
                </van-uploader>
                <p>拍摄国徽面</p>
            </div>
        </div>

        <div class="detail-footer">
            <van-button class="override btn-block" type="primary" @click="handleNext">提 交</van-button>
        </div>
    </div>
</template>

<script lang="ts" src="./AuthCertificate.ts"></script>

<style lang="scss" src="./AuthCertificate.scss" ></style>
