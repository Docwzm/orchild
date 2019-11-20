<template>
    <div class="ProductList">
        <!-- 搜索框 -->
        <TextSearch @blurInputHandle="blurInputHandle"></TextSearch>
        <!-- 产品选择 -->
        <div class="fieldPicker">
            <van-field
                readonly
                :label="labelText"
                clickable
                :value="value"
                :placeholder="placeholderText"
                @click="showPicker = true"
            />
            <i class="iconfont icon-picker-select"></i>
            <van-popup v-model="showPicker" position="bottom">
                <van-picker
                    class="override"
                    :item-height="100"
                    show-toolbar
                    value-key="name"
                    :columns="columns"
                    @change="onChange"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
                />
            </van-popup>
        </div>
        <!-- 业务记录 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!-- <ListItem
                v-for="item in list"
                :key="item.id"
                :itemData="item"
                :headText="item.name"
                :conText1="'分类:'+ item.categoryName"
                :conText2="'规格:'+ item.netContent"
                :conText3="'数量:'+ item.remainWeightNum + item.weightUnit"
                :conText4="'重量:'+ item.remainChargeNum + item.chargeUnit"
            ></ListItem>-->
            <div class="list">
                <div class="list-item" v-for="item in list" :key="item.id">
                    <div class="swipe">
                        <div>
                            <div class="cell">
                                <div>{{item.skuName}}</div>
                            </div>
                            <div class="cell">
                                <div>{{item.categoryName}}</div>
                                <div>规格：{{item.netContent}}</div>
                            </div>
                            <div class="cell">
                                <div>{{item.remainWeightNum}}{{item.weightUnit}}</div>
                                <div>{{item.remainChargeNum}}{{item.chargeUnit}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>
<script lang="ts" src="./ProductList.ts"></script>
<style lang="scss"  src="./ProductList.scss" ></style>
