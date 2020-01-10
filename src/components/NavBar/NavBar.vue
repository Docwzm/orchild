<template>
    <van-nav-bar
    :title="$store.state.base.navBarTitle"
    left-text=""
    right-text=""
    left-arrow
    :fixed="true"
    v-show="$store.state.base.navBarShow"
    @click-left="onClickLeft"
    />
</template>
<script lang="ts" src="./NavBar.ts"></script>
<style lang="scss" scoped src="./NavBar.scss"></style>
