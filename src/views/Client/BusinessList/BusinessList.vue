<template>
    <div class="businessList">
        <!-- 业务类型选择 -->
        <Cell title="业务"  value=""/>
        <!-- 业务时间区间选择 -->
        <div class="timePriod">
            <div>
                <van-button type="default" @click='onPeriodChange(1)'>本周</van-button>
                <van-button type="primary" @click='onPeriodChange(2)'>本月</van-button>
                <van-button type="info"   @click='onPeriodChange(3)'>本年</van-button>
            </div>
            <!-- 自定义时间弹窗 -->
            <div class="fieldPicker">
                <span ref="termStart" @click="showDatePicker('termStart')">开始时间</span>
                <span ref="termEnd" @click="showDatePicker('termEnd')">结束时间</span>
                <div>
                    <!-- 弹出层 -->
                    <van-popup v-model="isPopShow" position="bottom">
                        <!-- 开始时间 -->
                        <van-datetime-picker
                            @cancel="cancelPicker"
                            @confirm="confirmPicker"
                            v-if="datePicker == 'startTime'"
                            v-model="startTime"
                            type="date"
                            :formatter="formatter"
                            :max-date="currentTime"
                        />
                        <!-- 结束时间 -->
                        <van-datetime-picker
                            @cancel="cancelPicker"
                            @confirm="confirmPicker"
                            v-if="datePicker == 'endTime'"
                            v-model="endTime"
                            type="date"
                            :formatter="formatter"
                            :min-date="startTime"
                        />
                    </van-popup>
                </div>
            </div>
        </div>

 
        <!-- 业务记录 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
