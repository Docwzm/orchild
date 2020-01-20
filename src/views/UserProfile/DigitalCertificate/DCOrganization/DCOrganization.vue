<template>
    <div>
        <div class="dc-header">
            <span class="item">数字证书服务提供商：安心签</span>

            <span class="item cross-end"><i class="iconfont icon-company"></i> 机构</span>
        </div>

        <van-cell-group>
            <van-cell><van-field v-model="profile.compName" label="机构全称" required placeholder="请填写机构全称">
                <template slot="right-icon">
                    <i class="iconfont icon-edit"></i>
                </template>
            </van-field></van-cell>
            <van-cell><van-field value="统一社会信用代码证书" label="证件类型" required readonly placeholder="请填写证件类型"></van-field></van-cell>
            <van-cell><van-field v-model="profile.idNo" label="证件号码" required placeholder="请填写证件号码">
                <template slot="right-icon">
                    <i class="iconfont icon-edit"></i>
                </template>
            </van-field></van-cell>
            <van-cell><van-field v-model="profile.agentName" label="授权人姓名" required placeholder="请填写授权人姓名">
                <template slot="right-icon">
                    <i class="iconfont icon-edit"></i>
                </template>
            </van-field></van-cell>
            <van-cell><van-field v-model="profile.mobile" type="tel" label="授权人手机号码" required placeholder="请填写授权人手机号码">
                <template slot="right-icon">
                    <i class="iconfont icon-edit"></i>
                </template>
            </van-field></van-cell>
            <van-cell><van-field value="居民身份证" label="授权人证件类型" required readonly placeholder="授权人证件类型"></van-field></van-cell>
            <van-cell><van-field v-model="profile.agentIdentityNo" label="授权人证件号码" required placeholder="请填写授权人证件号码">
                <template slot="right-icon">
                    <i class="iconfont icon-edit"></i>
                </template>
            </van-field></van-cell>
            <van-cell>
                <van-uploader :after-read="afterAuthCertificateUpload" class="dc-override">
                    <van-field label="授权书" readonly required>
                        <template slot="right-icon">
                            <i class="iconfont icon-wenjianjia"></i>
                        </template>
                        <template slot="input">
                            <img v-if="authCertificateImg" class="sign-img" :src="authCertificateImg" alt="">
                            <span class="dc-custom-placeholder" v-else>请上传授权书文件</span>
                        </template>
                    </van-field>
                </van-uploader>
            </van-cell>

            <van-cell>
                <van-uploader :after-read="afterOrgCertificateUpload" class="dc-override">
                    <van-field label="机构证书申请表" readonly>
                        <template slot="right-icon">
                            <i class="iconfont icon-wenjianjia"></i>
                        </template>
                        <template slot="input">
                            <img v-if="orgCertificateImg" class="sign-img" :src="orgCertificateImg" alt="">
                            <span class="dc-custom-placeholder" v-else>请上传机构证书申请表</span>
                        </template>
                    </van-field>
                </van-uploader>
            </van-cell>
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

<script lang="ts" src="./DCOrganization.ts"></script>

<style lang="scss" src="./DCOrganization.scss" ></style>
