<template>
    <div class="enclosure">
        <section class="van-doc-demo-block" v-for="item in fileList" :key="item.id" :title="item">
            <h2 class="van-doc-demo-block__title">{{item.value}}</h2>
            <van-uploader
                v-model="item.attachmentList"
                :after-read="afterRead"
                :name="item.code"
                @delete="deleteImg"
                multiple
            />
            <div></div>
        </section>
        <div class="jx_nodata" v-if="fileList.length>0?false:true">
            <img src="@/assets/nodata.png">
            <h2 class="van-doc-demo-block__title">暂无数据</h2>
        </div>
    </div>
</template>
<style lang="scss" src="./Enclosure.scss"></style>
<script lang="ts" src="./Enclosure.ts"></script>
