<template>
    <div class="orgInfo">
        <van-cell-group>
            <van-field v-model="formdata.compName" placeholder="请输入机构全称" label="机构全称"/>
            <van-field v-model="formdata.shortName" placeholder="请输入机构简称" label="机构简称"/>
            <van-field v-model="formdata.typeName" placeholder="请输入公司类型" label="公司类型"/>
            <van-field v-model="formdata.idTypeCName" placeholder="请输入证件类型" label="证件类型"/>
            <van-field v-model="formdata.idNo" placeholder="请输入证件号码" label="证件号码"/>
            <van-field v-model="formdata.corporation" placeholder="请输入法定代表人" label="法定代表人"/>
            <van-field v-model="formdata.region" placeholder="请输入所属地区" label="所属地区"/>
            <van-field v-model="formdata.address" placeholder="请输入注册地址" label="注册地址"/>
            <van-field v-model="formdata.capital" placeholder="请输入注册资本" label="注册资本"/>
            <van-field
                label="人员规模"
                v-model="formdata.staffSizeText"
                @click="onStaffSizeClick"
                placeholder="请选择人员规模"
                right-icon="bars"
                readonly
            />
            <div v-if="staffSize">
                <van-popup v-model="showPicker" :close-on-click-overlay="false" position="bottom">
                    <van-picker
                        class="override"
                        show-toolbar
                        :item-height="$utils.platform()?100:48"
                        :columns="staffSizeColumns"
                        @cancel="onCancell"
                        @confirm="onstaffSizeConfirm"
                    />
                </van-popup>
            </div>
            <van-field
                label="成立日期"
                v-model="formdata.setDateTime"
                @click="onSetDateClick"
                placeholder="请选择成立日期"
                right-icon="bars"
                readonly
            />
            <div v-if="setDate">
                <van-popup v-model="showPicker" :close-on-click-overlay="false" position="bottom">
                    <van-datetime-picker
                        class="override"
                        v-model="currentDate"
                        type="date"
                        :item-height="$utils.platform()?100:48"
                        :max-date="maxDate"
                        @cancel="onCancell"
                        @confirm="onSetDateConfirm"
                    />
                    <!-- <van-picker
                        class="override"
                        show-toolbar
                        :item-height="100"
                        :columns="setDateColumns"
                        @cancel="onCancell"
                        @confirm="onSetDateConfirm"
                    />-->
                </van-popup>
            </div>
            <van-field
                label="营业期限"
                v-model="formdata.termTime"
                @click="onBussinessTermClick"
                placeholder="请选择营业期限"
                right-icon="bars"
                readonly
            />
            <div v-if="bussinessTerm">
                <van-popup v-model="showPicker" :close-on-click-overlay="false" position="bottom">
                    <van-datetime-picker
                        class="override"
                        v-model="currentDate"
                        type="date"
                        :item-height="$utils.platform()?100:48"
                        :max-date="maxDate"
                        @cancel="onCancell"
                        @confirm="onBussinessTermConfirm"
                    />
                    <!-- <van-picker
                        class="override"
                        show-toolbar
                        :item-height="100"
                        :columns="bussinessTermColumns"
                        @cancel="onCancell"
                        @confirm="onBussinessTermConfirm"
                    />-->
                </van-popup>
            </div>
            <van-field
                label="所属行业"
                v-model="formdata.industryText"
                @click="onIndustryClick"
                placeholder="请选择所属行业"
                right-icon="bars"
                readonly
            />
            <div v-if="industry">
                <van-popup v-model="showPicker" :close-on-click-overlay="false" position="bottom">
                    <van-picker
                        class="override"
                        show-toolbar
                        :item-height="$utils.platform()?100:48"
                        :columns="industryColumns"
                        @cancel="onCancell"
                        @confirm="onIndustryConfirm"
                    />
                </van-popup>
            </div>
            <van-field label="联系电话" v-model="formdata.telephone" placeholder="请输入区号-座机-分机"></van-field>
            <van-field label="企业邮箱" v-model="formdata.mailbox" placeholder="请输入企业邮箱"></van-field>
        </van-cell-group>
        <div class="detail-footer">
            <van-button class="override btn-block" size="large" type="primary" @click="onSubmit">提 交</van-button>
        </div>
    </div>
</template>
<script lang="ts" src="./OrgInfo.ts"></script>

<style lang="scss" src="./OrgInfo.scss" ></style>
