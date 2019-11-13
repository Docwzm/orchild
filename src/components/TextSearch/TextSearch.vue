<template>
    <div class="textSearch">
        <i class="iconfont  icon-search"></i>
        <input placeholder="请输入搜索关键字" @input="handleInput" @blur="InputBlur"/>
    </div>
</template>

<script lang="ts" src="./TextSearch.ts"></script>
<style lang="scss" scoped src="./TextSearch.scss" ></style>
