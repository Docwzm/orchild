<template>
    <div class="load-more-wrapper" @touchstart="touchStart($event)" @touchend="touchEnd($event)">
        <div class="inner">
            <slot></slot>
            <div class="load-more" v-show="enableLoadMore">{{loadMoreText}}</div>  
            <!-- <div class="load-end" v-show="enableLoadMore">已经到底了!</div>   -->
        </div>
    </div>
</template>

<script lang="ts" src="./LoadMore.ts"></script>
<style lang="scss"  src="./LoadMore.scss"></style>

