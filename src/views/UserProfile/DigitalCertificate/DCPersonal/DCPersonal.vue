<template>
    <div>
        <div class="dc-header">
            <span class="item">数字证书服务提供商：安心签</span>

            <span class="item cross-end"><i class="iconfont icon-person"></i> 个人</span>
        </div>
        <van-cell-group class="override">
            <van-cell><van-field v-model="profile.name" label="姓名" required placeholder="请输入姓名">
                <template slot="right-icon">
                    <i class="iconfont icon-edit"></i>
                </template>
            </van-field></van-cell>
            <van-cell><van-field v-model="profile.mobile" type="tel" label="手机号码" required placeholder="请输入手机号码">
                <template slot="right-icon">
                    <i class="iconfont icon-edit"></i>
                </template>
            </van-field></van-cell>
            <van-cell><van-field v-model="profile.idtypeCName" label="证件类型" required readonly placeholder="请输入证件类型"></van-field></van-cell>
            <van-cell><van-field v-model="profile.idNo" label="证件号码" required placeholder="请输入证件号码">
                <template slot="right-icon">
                    <i class="iconfont icon-edit"></i>
                </template>
            </van-field></van-cell>
            <orchid-cell-datetime-picker v-model="profile.effectiveEnd" label="证件有效期" required></orchid-cell-datetime-picker>
            <van-cell><van-field label="电子签名" required placeholder="请输入姓名">
                <template slot="right-icon">
                    <a class="dc-view-sign" @click="viewSignature"><i class="iconfont icon-chakan"></i>查看电子签名</a>
                </template>
                <template slot="input">
                    <img v-if="signatureImg" class="sign-img" :src="signatureImg" alt="">
                    <span v-else><i class="iconfont icon-dianziqianmingx sign-none"></i></span>
                </template>
            </van-field></van-cell>
            <van-cell>
                <p class="dc-tip">提示：电子签名根据提交的真实姓名/企业注册名生成，电子签名样式与是否产生法律效力无直接关系</p>
            </van-cell>
            <van-cell>
                <van-checkbox v-model="hasProfileAgree" class="override potocol-label">
                    <span>我已经阅读并同意</span>
                    <a @click="viewProtocolPrivacy">《隐私声明》</a>
                    <a @click="viewProtocolPlatform">《安心签平台服务协议》</a>
                    <a @click="viewProtocolCFCA">《CFCA数字证书服务协议》</a>
                </van-checkbox>
            </van-cell>
        </van-cell-group>
        <div class="personal-footer">
            <van-button :disabled="!hasProfileAgree" class="override btn-block" @click="onSubmit">申请开通</van-button>
        </div>

        <van-popup v-model="previewVisible">
            <img :src="signatureImg">
        </van-popup>
    </div>
</template>

<script lang="ts" src="./DCPersonal.ts"></script>

<style lang="scss" src="./DCPersonal.scss" ></style>
