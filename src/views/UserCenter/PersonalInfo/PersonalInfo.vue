<template>
    <div class="personalInfo">
        <van-cell-group>
            <van-field v-model="formdata.name" readonly label="姓名"/>
            <van-field v-model="formdata.genderCName" readonly label="性别"/>
            <van-field v-model="formdata.nationCName" readonly label="名族"/>
            <van-field v-model="formdata.age" readonly label="年龄"/>
            <van-field v-model="formdata.birthday" readonly label="出生日期"/>
            <van-field v-model="formdata.idtypeCName" readonly label="证件类型"/>
            <van-field v-model="formdata.idNo" readonly label="证件号码"/>
            <van-field v-model="formdata.effectiveEnd" readonly label="证件有效期"/>
            <van-field v-model="formdata.region" readonly label="常住地区"/>
            <van-field v-model="formdata.address" readonly label="常住地址"/>
            <van-field v-model="formdata.marriageCName" readonly label="婚姻状况"/>
            <van-field
                label="教育程度"
                v-model="formdata.edu"
                @click="onEduClick"
                placeholder="请选择教育程度"
                right-icon="bars"
                readonly
            />
            <div v-if="edu">
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker
                        class="override"
                        show-toolbar
                        :columns="eduColumns"
                        @cancel="showPicker = false"
                        @confirm="onEduConfirm"
                    />
                </van-popup>
            </div>
            <van-field
                label="从事行业"
                v-model="formdata.industry"
                @click="onIndustryClick"
                placeholder="请选择从事行业"
                right-icon="bars"
                readonly
            />
            <div v-if="industry">
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker
                        class="override"
                        show-toolbar
                        :columns="industryColumns"
                        @cancel="showPicker = false"
                        @confirm="onIndustryConfirm"
                    />
                </van-popup>
            </div>
            <van-field
                label="职业类型"
                v-model="formdata.job"
                @click="onProfessionClick"
                placeholder="请选择事业类型"
                right-icon="bars"
                readonly
            />
            <div v-if="job">
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker
                        class="override"
                        show-toolbar
                        :columns="professionColumns"
                        @cancel="showPicker = false"
                        @confirm="onProfessionConfirm"
                    />
                </van-popup>
            </div>
            <van-field label="个人邮箱" placeholder="请输入个人邮箱"></van-field>
        </van-cell-group>
    </div>
</template>
<script lang="ts" src="./PersonalInfo.ts"></script>

<style lang="scss" src="./PersonalInfo.scss" ></style>
