<template>
    <div class="userCenter">
        <div class="jx_banner"></div>
        <div class="jx_userInfo">
            <div class="title">
                <van-icon :name="userInfo.defaultOrganization.nature == 1?'manager':'wap-home'"/>
                {{ userInfo.defaultOrganization.nature == 1 ? '个人' : '机构' }}
            </div>
            <div class="box">
                <div class="info">
                    <div class="jx-cell">
                        <div class="jx-cell__hd">
                            <img src="">
                        </div>
                        <div class="jx-cell__bd">
                            <p class="username">{{ userInfo.name || '' }}</p>
                            <p class="tel">
                                <van-icon name="phone-circle"/>
                                {{ userInfo.mobile || '' }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="funcArea">
                    <div class="torealNameAuth jx-grid-item">
                        <van-icon :name="userInfo.isCredit == 1?'checked':'warning'"/>
                        <div>实名认证</div>
                        <div
                            class="itemTap"
                            v-if="userInfo.isCredit != 1 && userInfo.defaultOrganization.nature == 1"
                            @click="torealNameAuthEvt"
                        >立即认证</div>
                    </div>
                    <div class="toapplyCA jx-grid-item">
                        <van-icon :name="userInfo.signStatus == 1?'checked':'warning'"/>
                        <div>数字证书</div>
                        <div
                            class="itemTap"
                            v-if="userInfo.signStatus != 1"
                            @click="toapplyCAEvt"
                        >立即开通</div>
                    </div>
                    <div class="toInfo jx-grid-item">
                        <van-icon :name="userInfo.isCompleted?'checked':'warning'"/>
                        <div>完善资料</div>
                        <div class="itemTap" v-if="!userInfo.isCompleted" @click="toInfoEvt">立即补充</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="jx_setting">
            <van-cell-group>
                <van-field
                    left-icon="https://pictures.guanggujinxin.com/clientmini/p1.png"
                    readonly
                    :border="false"
                    label="我的业务"
                />
                <!-- <van-field
                    left-icon="https://pictures.guanggujinxin.com/clientmini/p2.png"
                    readonly
                    :border="false"
                    label="我的机构"
                /> -->
                <van-field
                    left-icon="https://pictures.guanggujinxin.com/clientmini/p4.png"
                    readonly
                    :border="false"
                    label="设置"
                    @click="settingEvt"
                />
            </van-cell-group>
        </div>
    </div>
</template>
<script lang="ts" src="./UserInfo.ts"></script>
<style lang="scss" src="./UserInfo.scss" ></style>
