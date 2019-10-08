<template>
    <div id="invoiceList">
        <van-cell-group class="searchRegion">
            <van-field value left-icon="search" placeholder="请输入搜索关键字" />
        </van-cell-group>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            
            <!-- <van-cell v-for="item in list" :key="item" :title="item">
                <h3>12341234</h3>
                <h4>购买方：关谷金信（武汉）科技有限公司</h4>
                <h4>销售方：武汉东湖新技术开发区</h4>
                <p>开票日期：2019/12/31</p>
                <span class="amount">109元</span>
                <span class="status">待验证</span>
                <i class="iconfont  icon-you"></i>
            </van-cell> -->

            <div class="listItem" v-for="item in list" :key="item.id" :title="item">
                <h3><span>{{item.invoiceNum}}</span><span class="amount">{{item.amountInFiguers}}元</span></h3>
                <h4>购买方：{{item.purchaserName}}</h4>
                <h4>销售方：{{item.sellerName}}</h4>
                <p><span>开票日期：{{item.invoiceDate}}</span><span class="status">{{ item.status | formatInvoiceStatus}}</span></p>                            
                <i class="iconfont  icon-you"></i>
            </div>
        </van-list>
    </div>
</template>

<script lang="ts" src="./InvoiceList.ts"></script>

<style lang="scss" src="./InvoiceList.scss" ></style>
