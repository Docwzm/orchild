<template>
    <div class="category">
        <!-- 有业务   1  -->
        <div v-if="result==1">
            <div class="category-top">
            <div class="top-header">
                <div class="left">
                    <JXCircle
                        :rate="40"
                        :speed="100"
                        :text="text"
                        :strokeWidth="298"
                        :color="gradientColor"
                        size="300px"
                    ></JXCircle>
                </div>
                <div class="right">
                    <div class="cell cell-first">
                        <div>
                            <Cell
                            class="dropDown"
                            title=""
                            :columns="columnsData"
                            @onChange="onChange"
                            :value="productName"
                            />
                        </div>
                        <!-- <div class="btn" @click="refound" v-if="!isMuchangdai && !isYixiedai">还款{{textValue}}</div> -->
                        <div class="btn" @click="refound">还款</div>
                    </div>
                    <div class="cell">待还本金</div>
                    <div class="cell">{{fundDebtStatisticVO.oweQuota | moneyNormalize}}元</div>
                    <div class="cell">最近到期时期</div>
                    <div class="cell">{{fundDebtStatisticVO.minOweDate}}</div>
                </div>
            </div>
            <div class="top-bottom">
                <div>授信使用率</div>
                <div class="bottom-column">
                    <span class="sell">{{fundMemberCredit.remainQuota | moneyNormalize}}</span>
                    <span>可用额度</span>
                </div>
                <div class="bottom-column">
                    <span class="sell">{{fundMemberCredit.creditQuota | moneyNormalize}}</span>
                    <span>可用额度</span>
                </div>
            </div>
        </div>
        <div class="category-center" @click="lookLog">
            <div>
                <img src="@/assets/category/icon/jl.png" alt="" class="img">
                查看业务记录
            </div>
            <img src="@/assets/category/icon/right.png" alt="">
        </div>
        <div class="category-bottom">
            <div class="bottom-top">
                <div class="left">{{WarehousePledgeProfiledata[0] ? WarehousePledgeProfiledata[0].warehouseName : ''}}</div>
                <div class="right">
                    库存
                    <img src="@/assets/category/icon/right.png" alt="">
                </div>
            </div>
            <div class="bottom-center" v-for="(item,index) in WarehousePledgeProfiledata" :key="index">
                <div class="left">
                           <JXCircle
                            :rate="40"
                            :speed="100"
                            :text="text"
                            :strokeWidth="298"
                            :color="gradientColor"
                            layer-color="#F3F3F3"
                            size="300px"
                        ></JXCircle>
                </div>
                <div class="right">
                    <div class="cell">
                        <span>{{item.pledgeType=='1'?'静态质押':'动态质押'}}</span>
                    </div>
                    <div class="cell">
                        <span>待还金额(元)</span>{{item.loanAmount | moneyNormalize}}
                    </div>
                    <div class="cell">
                        <span>在库货值(元)</span>{{item.goodsValue | moneyNormalize}}
                    </div>
                    <div class="cell">
                        <span>担保货值(元)</span>{{item.pledgeGoodsValue | moneyNormalize}}
                    </div>
                </div>
            </div>
            <div class="bottom-bottom" @click="apply">申请业务</div>
        </div>
        </div>

        <!-- 没有业务 -100  -->
        <div v-else-if="result==-100">
            <no-data />
        </div>

        <!-- 不是-100 或 1 的情况 审核中 -->
        <div v-else>
            <Result/>
        </div>
    </div>
</template>

<script src="./Category.ts" lang="ts"></script>

<style lang="scss" src="./Category.scss"></style>
