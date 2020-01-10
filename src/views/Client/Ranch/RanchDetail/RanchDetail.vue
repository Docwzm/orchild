<template>
    <div class="RanchDetail">
        <div class="title">{{options.name}}</div>
        <div>
            <div class="info">
                <img class="img" src="@/assets/cow.png">
                <div class="totalNum">7</div>
            </div>
            <div class=‘progress></div>
        </div>
        <!-- 我的认养 -->
        <div class="com" @click="goCattleList(2)">
            <div>我的认养</div>
            <van-icon name="arrow" size="39rpx" class="arrow" />
        </div>
        <!-- 我的存栏 -->
        <div class="com" @click="goCattleList(3)">
            <div>我的存栏</div>
            <van-icon name="arrow" size="39rpx" class="arrow" />
        </div>
    </div>
</template>
<script lang="ts" src="./RanchDetail.ts"></script>
<style lang="scss"  src="./RanchDetail.scss" ></style>
