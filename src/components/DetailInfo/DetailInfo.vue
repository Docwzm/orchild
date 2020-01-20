<template>
    <div class="detailInfo">
        <div class="detailField" v-for="item in DetailKeys" :key="item.objkey">
            <span class="label">{{item.label}}</span>
            <span class="value">{{DetailData[item.objkey]}}</span>
        </div>
    </div>
</template>

<script lang="ts" src="./DetailInfo.ts"></script>
<style lang="scss" scoped src="./DetailInfo.scss" ></style>
