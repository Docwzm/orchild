<template>
    <div id="invoiceList">
        <TextSearch @searchInputHandle="searchInputHandle"></TextSearch>
        <!-- <van-cell-group class="searchRegion">
            <van-field value left-icon="search" placeholder="请输入搜索关键字" />
        </van-cell-group> -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="listItem" v-for="item in list" :key="item.id" :title="item">
                <h3><span>{{item.invoiceNum}}</span><span class="amount">{{item.amountInFiguers}}元</span></h3>
                <h4>购买方：{{item.purchaserName}}</h4>
                <h4>销售方：{{item.sellerName}}</h4>
                <p><span>开票日期：{{item.invoiceDate}}</span><span class="status">{{ item.status | formatInvoiceStatus}}</span></p>
                <i class="iconfont  icon-you"></i>
            </div>
        </van-list>

        <div class="footerRegion">
            <button class="longButton" @click="toAddInvoice">录入发票2</button>
        </div>

        <!-- <van-button type="default">录入发票</van-button> -->
    </div>
</template>

<script lang="ts" src="./InvoiceList.ts"></script>

<style lang="scss" src="./InvoiceList.scss" ></style>
