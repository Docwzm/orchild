<template>
    <div class="businessList">
        <!-- 业务类型选择 -->
        <Cell title="业务"  value=""/>
        <!-- 业务时间区间选择 -->
        <div class="timePriod">
            <div>
                <van-button type="default">本周</van-button>
                <van-button type="primary">本月</van-button>
                <van-button type="info">本年</van-button>
            </div>
            <div  @click="timePicker">
                <span>自定义选择区间</span>
            </div>
        </div>
        <!-- <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
        /> -->
         <!-- 自定义时间弹窗 -->
        <div class="modal-mask" v-if="showTimeMask">
            <div class="modal-dialog">
                <div class="startTime">起始时间：2019年10月25日</div>
                <div class="endTime">结束时间：2019年10月28日</div>
                <van-icon name="close" color="red" size="30px" class="closeMask"  @click="closeMask"/>
            </div>
        </div>


        <!-- 业务记录 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ListItem
                v-for="item in list"
                :key="item.id"
                :itemData="item"
                :conText1="item.time"
                :headText="item.tip + item.money"
                :statusStr="item.statusStr"
            ></ListItem>
        </van-list>
    </div>
</template>
<script lang="ts" src="./BusinessList.ts"></script>
<style lang="scss"  src="./BusinessList.scss" ></style>
