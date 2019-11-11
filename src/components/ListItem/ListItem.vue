<template>
    <div class="listItem" @click="itemClick">
        <div class="imgdiv" v-if="iconStr">
            <!-- <i class="iconfont icon-gongsi"></i> -->
            <i :class="iconStr"></i> 
        </div>
        <div class="content">
            <h3 v-if="headText">{{headText}}</h3>
            <p v-if="conText1">{{conText1}}</p>
            <p v-if="conText2">{{conText2}}</p>
            <p v-if="conText3">{{conText3}}</p>
        </div>
        <div class="statusDiv" v-if="statusStr">
            <span>{{statusStr}}</span>
        </div>
        <!-- <i class="iconfont icon-right"></i> -->
    </div>
</template>

<script lang="ts" src="./ListItem.ts"></script>
<style lang="scss" scoped src="./ListItem.scss"></style>
