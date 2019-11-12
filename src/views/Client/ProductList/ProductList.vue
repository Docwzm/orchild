<template>
    <div class="businessList">
        <TextSearch @searchInputHandle="searchInputHandle"></TextSearch>
        <FieldPicker></FieldPicker>
        <!-- 业务记录 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ListItem
                v-for="item in list"
                :key="item.id"
                :itemData="item"
                :headText="item.tip"
                :conText1="'分类:'+item.time"
                :conText2="'数量:'+item.num"
                :conText3="'规格:'+item.num"
                :statusStr="item.statusStr"
            ></ListItem>
        </van-list>
    </div>
</template>
<script lang="ts" src="./ProductList.ts"></script>
<style lang="scss"  src="./ProductList.scss" ></style>
