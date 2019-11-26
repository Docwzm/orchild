<template>
    <div class="businessList">
        <div class="toolbar">
            <!-- 业务类型选择 -->
            <Cell
                title="业务选择"
                rightIcon="bars"
                :defaultValue="businessDataText"
                :columns="columnsData"
                @onChange="onChange"
            />
            <!-- 业务时间区间选择 -->
            <div class="check-group">
                <div class="timePriod">
                    <div
                        @click="onPeriodChange(1)"
                        v-bind:class="[activeIndex==1 ? 'active' : '','chacks-item']"
                    >本周</div>
                    <div
                        @click="onPeriodChange(2)"
                        v-bind:class="[activeIndex==2 ? 'active' : '','chacks-item']"
                    >本月</div>
                    <div
                        @click="onPeriodChange(3)"
                        v-bind:class="[activeIndex==3 ? 'active' : '','chacks-item']"
                    >本年</div>
                </div>
                <!-- 自定义时间弹窗 -->
                <div class="fieldPicker">
                    <span @click="showStartPicker()">{{startTime ? startTime : '开始时间'}}</span>
                    <span>~</span>
                    <span @click="showEndPicker()">{{endTime ? endTime : '结束时间'}}</span>
                    <div>
                        <van-popup v-model="isPopShow" position="bottom">
                            <van-datetime-picker
                                class="override"
                                :item-height="$utils.platform()?100:48"
                                @cancel="cancelPicker"
                                @confirm="startconfirmPicker"
                                type="date"
                            />
                        </van-popup>
                        <van-popup v-model="isEndShow" position="bottom">
                            <van-datetime-picker
                                class="override"
                                :item-height="$utils.platform()?100:48"
                                @cancel="cancelPicker"
                                @confirm="endconfirmPicker"
                                type="date"
                            />
                        </van-popup>
                    </div>
                </div>
            </div>
        </div>
        <!-- 业务记录 -->
        <div class="logList">
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
    </div>
</template>
<script lang="ts" src="./BusinessList.ts"></script>
<style lang="scss"  src="./BusinessList.scss" ></style>
