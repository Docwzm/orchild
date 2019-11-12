<template>
    <div class="creditApplication">
        <div class="jx-adver">
            <img :src="options.publicityPhotos">
        </div>
        <div class="jx-applicationAmount">
            <div class="jx-applicationAmount__title">期望额度(元)</div>
            <div class="jx-money">
                <van-field
                    v-model="creditMoney"
                    label="¥"
                    @input="changeValueEvt"
                    type="number"
                    placeholder="请输入金额"
                />
            </div>
            <div class="jx-progress">
                <van-progress
                    :show-pivot="false"
                    :percentage="innerWh"
                    color="linear-gradient(90deg, #f0d29d 56%, #dcac5c 100%)"
                />
                <div class="jx-scale">
                    <span class="start">|</span>
                    <span class="end">|</span>
                </div>
                <div class="jx-showNum">
                    <span class="start">{{startText}}</span>
                    <span class="end">{{endText}}</span>
                </div>
            </div>
        </div>
        <div class="jx-media-box jx-media-box_appmsg">
            <div class="jx-media-box__hd">
                <img
                    class="jx-media-box__thumb"
                    src="https://pictures.guanggujinxin.com/clientmini/creditApplication.png"
                    alt=""
                >
            </div>
            <div class="jx-media-box__bd" @click="chooseEnclosure">
                <div class="jx-media-box__title">证照资料</div>
                <div class="jx-media-box__desc">婚姻证明,身份证,房产证等证件</div>
            </div>
            <div class="jx-media-box__icon">
                <van-icon name="arrow"/>
            </div>
        </div>
        <div class="jx-agreement">
            <van-checkbox v-model="radioStatus" @click="checkClick">
                <span>同意将个人(企业)资料用于</span>
                <a>({{options.name}})</a>融资申请
            </van-checkbox>
        </div>
        <van-button
            type="primary"
            size="large"
            color="linear-gradient(-90deg, #917451 0%, #a98d6b 40%, #c1a585 66%, #dfcdb4 100%)"
            @click="applyEvt"
        >立即申请</van-button>
    </div>
</template>
<script lang="ts" src="./CreditApplication.ts"></script>
<style lang="scss"  src="./CreditApplication.scss" ></style>
