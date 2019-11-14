<template>
    <div class="">
        <p class="detail-title"><i class="iconfont icon-shenfenzheng"></i>身份证信息</p>

        <van-cell-group>
            <van-cell>
                <van-field v-model="profile.name" required label="真实姓名" placeholder="上传照片后自动识别获取">
                    <template slot="right-icon">
                        <i class="iconfont icon-edit"></i>
                    </template>
                </van-field>
            </van-cell>
            <orchid-cell-picker v-model="profile.gender" label="性别" placeholder="上传照片后自动识别获取" required :columns="genderList"></orchid-cell-picker>
            <orchid-cell-picker v-model="profile.nation" label="民族" placeholder="上传照片后自动识别获取" required :columns="nationList"></orchid-cell-picker>
            <van-cell><van-field v-model="profile.age" required readonly label="年龄" placeholder="上传照片后自动识别获取"></van-field></van-cell>
            <orchid-cell-datetime-picker v-model="profile.birthday" placeholder="上传照片后自动识别获取" required label="出生日期"></orchid-cell-datetime-picker>
            <orchid-cell-picker v-model="profile.idType" label="证件类型" placeholder="上传照片后自动识别获取" required :columns="cardTypeList"></orchid-cell-picker>
            <van-cell>
                <van-field v-model="profile.idNo" required label="证件号码" placeholder="上传照片后自动识别获取">
                    <template slot="right-icon">
                        <i class="iconfont icon-edit"></i>
                    </template>
                </van-field>
            </van-cell>
            <orchid-cell-datetime-picker v-model="profile.effectiveEnd" placeholder="上传照片后自动识别获取" required label="证件有效期"></orchid-cell-datetime-picker>
            <orchid-cell-area-picker v-model="profile.region" label="常住地区" placeholder="上传照片后自动识别获取" required></orchid-cell-area-picker>
            <van-cell>
                <van-field v-model="profile.address" required label="常住地址" placeholder="上传照片后自动识别获取">
                    <template slot="right-icon">
                        <i class="iconfont icon-edit"></i>
                    </template>
                </van-field>
            </van-cell>
        </van-cell-group>

        <p class="detail-title"><i class="iconfont icon-ziliao"></i>基本资料</p>
        <van-cell-group>
            <orchid-cell-picker v-model="profile.marriage" label="婚姻状况" placeholder="请选择婚姻状况" required :columns="marriageList"></orchid-cell-picker>
            <orchid-cell-picker v-model="profile.edu" label="教育程度" placeholder="请选择教育程度" required :columns="eduList"></orchid-cell-picker>
            <orchid-cell-picker v-model="profile.industry" label="从事行业" placeholder="请选择从事行业" required :columns="industryList"></orchid-cell-picker>
            <orchid-cell-picker v-model="profile.job" label="职业类型" required placeholder="请选择职业类型" :columns="jobList"></orchid-cell-picker>
            <van-cell>
                <van-field v-model="profile.email" label="个人邮箱" placeholder="请填写个人邮箱">
                    <template slot="right-icon">
                        <i class="iconfont icon-edit"></i>
                    </template>
                </van-field>
            </van-cell>
        </van-cell-group>

        <div class="detail-footer">
            <van-button class="override btn-block" @click="onCompleted">下一步</van-button>
        </div>

    </div>
</template>

<script lang="ts" src="./AuthDetail.ts"></script>

<style lang="scss" src="./AuthDetail.scss" ></style>
