<template>
    <div id="AddInvoice">
        <!-- 发票信息 -->
        <h5 class="formGroupHeader">发票信息</h5>
        <van-cell-group>
            <div class="formField van-cell van-field">
                <span class="van-field__label">发票类型</span>
                <select v-model="invoiceData.invoiceType" class="van-field__body">
                    <option :key="item.id" v-for="item in invoiceTypesComputed">{{item.dictValue}}</option>
                </select>
            </div>
            <van-field required label="发票号码" v-model="invoiceData.invoiceNumber" placeholder="请输入发票号码" />
            <van-field required label="发票代码" v-model="invoiceData.invoiceCode" placeholder="请输入发票代码" />
            <van-field required
                label="开票日期"
                type="date"
                v-model="invoiceData.invoiceDate"
                placeholder="请选择开票日期"
            />
            <van-field required label="价税合计" v-model="invoiceData.amountInFiguers" placeholder="请输入" />
            <van-field required label="校验码" v-model="invoiceData.checkCode" placeholder="请输入校验码" />
        </van-cell-group>

        <!-- 购买方信息 -->
        <h5 class="formGroupHeader">购买方信息</h5>
        <van-cell-group>
            <van-field required label="名称" v-model="invoiceData.purchaserName" placeholder="请输入" />
            <van-field required label="纳税人识别号" v-model="invoiceData.purchaserRegisterNum" placeholder="请输入" />
            <van-field label="地址/电话" v-model="invoiceData.purchTel" placeholder="请输入" />
            <van-field label="开户行及账号" v-model="invoiceData.purchAccount" placeholder="请输入" />
        </van-cell-group>

        <!-- 销售方信息 -->
        <h5 class="formGroupHeader">销售方信息</h5>
        <van-cell-group>
            <van-field required label="名称" v-model="invoiceData.sellerName" placeholder="请输入" />
            <van-field required label="纳税人识别号" v-model="invoiceData.sellerRegisterNum" placeholder="请输入" />
            <van-field label="地址/电话" v-model="invoiceData.sellerTel" placeholder="请输入" />
            <van-field label="开户行及账号" v-model="invoiceData.sellerAccount" placeholder="请输入" />
            <van-field label="收款人" v-model="invoiceData.receipter" placeholder="请输入" />
            <van-field label="复核人" v-model="invoiceData.reviewer" placeholder="请输入" />
            <van-field label="开票人" v-model="invoiceData.biller" placeholder="请输入" />
        </van-cell-group>

        <!-- 发票附件 -->
        <h5 class="formGroupHeader">发票附件</h5>
        <van-cell-group>
            <van-field required label="上传发票文件" type="file" v-model="invoiceData.value" placeholder="请输入" />
        </van-cell-group>

        <!-- 备注信息 -->
        <h5 class="formGroupHeader">备注信息</h5>
        <van-cell-group>
            <van-field label="备注" v-model="invoiceData.remarks" placeholder="请输入" />
        </van-cell-group>

        <!-- 类型弹出框 -->
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="invoiceTypesComputed"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>

        <button class="longButton" @click="saveInvoice">保存</button>
    </div>
</template>

<script lang="ts" src="./AddInvoice.ts"></script>

<style lang="scss" src="./AddInvoice.scss" ></style>
