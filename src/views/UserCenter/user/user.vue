<template>
    <div class="userCenter">
        <div class="jx_banner"></div>
        <div class="jx_userInfo">
            <div class="title">
                <van-icon name="manager"/>个人
            </div>
            <div class="box">
                <div class="info">
                    <div class="jx-cell">
                        <div class="jx-cell__hd">
                            <img src="">
                        </div>
                        <div class="jx-cell__bd">
                            <p class="username">光谷金信</p>
                            <p class="tel">
                                <van-icon name="phone-circle"/>15012341234
                            </p>
                        </div>
                    </div>
                </div>
                <div class="funcArea">
                    <div class="torealNameAuth jx-grid-item">
                        <van-icon :name="torealNameAuth"/>
                        <div>实名认证</div>
                        <div class="itemTap">立即认证</div>
                    </div>
                    <div class="toapplyCA jx-grid-item">
                        <van-icon :name="toapplyCA"/>
                        <div>数字证书</div>
                        <div class="itemTap">立即开通</div>
                    </div>
                    <div class="toInfo jx-grid-item">
                        <van-icon :name="toInfo"/>
                        <div>完善资料</div>
                        <div class="itemTap">立即补充</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="jx_setting">
            <van-cell-group>
                <van-field
                    left-icon="https://pictures.guanggujinxin.com/clientmini/p1.png"
                    readonly
                    border="false"
                    label="我的业务"
                />
                <van-field
                    left-icon="https://pictures.guanggujinxin.com/clientmini/p2.png"
                    readonly
                    border="false"
                    label="我的机构"
                />
                <van-field
                    left-icon="https://pictures.guanggujinxin.com/clientmini/p4.png"
                    readonly
                    border="false"
                    label="设置"
                />
            </van-cell-group>
        </div>
    </div>
</template>
<script lang="ts" src="./User.ts"></script>
<style lang="scss" src="./User.scss" ></style>
