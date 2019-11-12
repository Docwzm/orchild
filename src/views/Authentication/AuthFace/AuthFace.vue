<template>
    <div class="face-wrap">
        <img class="face-cover" src="../../../assets/authentication/face-cover.png" alt="">

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
            <van-button class="override btn-block">采集人脸</van-button>
        </div>
    </div>
</template>

<script lang="ts" src="./AuthFace.ts"></script>

<style lang="scss" src="./AuthFace.scss" ></style>
