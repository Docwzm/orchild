<template>
    <div class="businessList">
        <TextSearch @searchInputHandle="searchInputHandle"></TextSearch>
        <div class="pickerDiv">
            <FieldPicker labelText="类别" placeholderText="选择类别"></FieldPicker>
            <FieldPicker labelText="产品" placeholderText="选择产品"></FieldPicker>
        </div>
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
