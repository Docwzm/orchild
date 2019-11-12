<template>
    <div class="businessList">
        <TextSearch @searchInputHandle="searchInputHandle"></TextSearch>
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
                show-toolbar 
                :columns="columns" 
                @change="onChange"    
                @cancel="showPicker = false"
                @confirm="onConfirm"/>
            </van-popup>
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
