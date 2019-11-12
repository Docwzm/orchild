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
        </section>
        <!-- <section class="van-doc-demo-block">
            <h2 class="van-doc-demo-block__title">身份证反面</h2>
            <van-uploader v-model="fileList" multiple deletable/>
        </section>-->
    </div>
</template>
<style lang="scss" src="./Enclosure.scss"></style>
<script lang="ts" src="./Enclosure.ts"></script>
