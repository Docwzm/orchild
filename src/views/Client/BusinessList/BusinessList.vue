<template>
    <div class="businessList">
        <!-- 业务类型选择 -->
        <Cell title="业务"  
              :value='businessData'  
              :columns="columnsData"
              @onChange="onChange"/>
        <!-- 业务时间区间选择 -->
        <div class="timePriod">
            <van-button type="default" @click='onPeriodChange(1)'>本周</van-button>
            <van-button type="primary" @click='onPeriodChange(2)'>本月</van-button>
            <van-button type="info"   @click='onPeriodChange(3)'>本年</van-button>
            <!-- 自定义时间弹窗 -->
            <div class="fieldPicker">
                <span  @click="showStartPicker()">{{startTime ? startTime : '开始时间'}}</span> 
                <span  @click="showEndPicker()">{{endTime ? endTime : '结束时间'}}</span>
                <div>
                    <van-popup v-model="isPopShow" position="bottom">
                        <!-- 开始时间 -->
                        <van-datetime-picker
                            @cancel="cancelPicker"
                            @confirm="startconfirmPicker"
                            type="date"
                        />
                    </van-popup>
                    <van-popup v-model="isEndShow" position="bottom">
                        <!-- 结束时间 -->
                        <van-datetime-picker
                            @cancel="cancelPicker"
                            @confirm="endconfirmPicker"
                            type="date"
                        />
                    </van-popup>
                </div>
            </div>
        </div>
        <!-- 业务记录 -->
        <van-list :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ListItem
                v-for="item in NoLoanData"
                :key="item.id"
                :itemData="item"
                :conText1="item.createTime"
                :headText="item.bizTypeName + ':' +  (item.bizResult ? item.bizResult : '') "
                :statusStr="item.statusName"
            ></ListItem>
        </van-list>
    </div>
</template>
<script lang="ts" src="./BusinessList.ts"></script>
<style lang="scss"  src="./BusinessList.scss" ></style>
