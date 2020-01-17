<template>
    <div class="CattleList">
             <!-- 产品选择 -->
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
                    class="override"
                    :item-height="$utils.platform()?100:48"
                    show-toolbar
                    value-key="name"
                    :columns="columns"
                    @change="onChange"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
                />
            </van-popup>
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="list">
                <div class="list-item" v-for="item in list" :key="index">
                    <div class="swipe">
                        <div class="left">
                            <img class="img" src="@/assets/cow.png">
                            <div>{{item.code}}</div>
                        </div>
                        <div class="right">
                            <div>在栏{{item.inDays}}天</div>
                            <van-icon name="arrow" size="39rpx" class="arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>
<script lang="ts" src="./CattleList.ts"></script>
<style lang="scss"  src="./CattleList.scss" ></style>
