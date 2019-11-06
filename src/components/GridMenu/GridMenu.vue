<template>
    <div class="GridMenu">
        <van-grid :gutter="20">
            <van-grid-item
                v-for="item in gridMenuData"
                :key="item.menuName"
                :icon="item.iconClass"
                :text="item.menuName"
                @click="menuClick(item)"
            />
        </van-grid>
    </div>
</template>

<script lang="ts" src="./GridMenu.ts"></script>
<style lang="scss"  src="./GridMenu.scss"></style>
