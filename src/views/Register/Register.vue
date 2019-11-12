<template>
    <div class="register-wrap">
        <van-cell-group>
            <van-cell>
                <van-field v-model="inputFields.account" center placeholder="登录账号（4-16位包含字母或数字）" />
            </van-cell>
            <van-cell>
                <van-field v-model="inputFields.mobile" center placeholder="注册手机号" />
            </van-cell>
            <van-cell>
                <van-field v-model="inputFields.verifyCode" center placeholder="请输入验证码">
                    <van-button slot="button" class="codeBtn" size="small" type="primary"
                                :disabled="!canReloadVerifyCode"
                                @click="getVerifyCode">{{verifyCodeLabel}}
                    </van-button>
                </van-field>
            </van-cell>
            <van-cell>
                <van-field v-model="inputFields.password" center type="password" placeholder="登录密码（6-16位包含字母、数字）" />
            </van-cell>
            <van-cell>
                <van-field v-model="confirmPassword" center type="password" placeholder="确认密码" />
            </van-cell>
            <van-checkbox class="override protocol" v-model="hasProfileAgree">
                <span>我已阅读并同意</span>
                <a @click="viewProfileProtocol">《用户注册协议》</a>
            </van-checkbox>
            <van-button class="override btn-block" type="primary">同意协议并注册</van-button>

        </van-cell-group>

    </div>
</template>

<script lang="ts" src="./Register.ts"></script>

<style lang="scss" src="./Register.scss" ></style>
