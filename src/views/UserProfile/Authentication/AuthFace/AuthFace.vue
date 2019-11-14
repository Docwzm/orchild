<template>
    <div class="face-wrap">
        <van-uploader :after-read="handleFaceCollect" capture="camera">
            <img v-if="faceImg" class="face-cover" :src="faceImg">
            <img v-else class="face-cover" src="../../../../assets/authentication/face-cover.png">
        </van-uploader>

        <div class="face-tips">
            <div class="tip-item">
                <i class="iconfont icon-taiyang"></i>
                <span>光线充足</span>
            </div>
            <div class="tip-item">
                <i class="iconfont icon-renlian"></i>
                <span>拍摄正面</span>
            </div>
            <div class="tip-item">
                <i class="iconfont icon-maozi"></i>
                <span>不戴帽子</span>
            </div>
        </div>

        <div class="detail-footer">
            <van-button class="override btn-block" @click="personalOcr">采集人脸</van-button>
        </div>
    </div>
</template>

<script lang="ts" src="./AuthFace.ts"></script>

<style lang="scss" src="./AuthFace.scss" ></style>
