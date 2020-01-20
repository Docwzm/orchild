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
        <!-- 列表数据 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="list">
                <div class="list-item" v-for="item in list"  @click="goCattleDetail(item)">
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
        <!-- 申请放款按钮 -->
        <div class="confirmBtn" v-if="status == 2 && list.length > 0 " @click="applyQuota">申请放款</div>
        <!-- 申请放款提交弹窗 -->
        <div class="maskModel" v-show="showMask">
            <div class="point">
                <div class="pop">
                    <div class="top">
                        <div class="com">
                            <div>借款金额</div>
                            <div class="tip">可用额度:{{debtData.remainQuota}}</div>
                        </div>
                        <div class="info"> ¥{{debtData.applyQuota}}元</div>
                    </div>
                    
                    <div class="top">
                        <div class="com">
                            <div>借款到期日</div>
                            <div class="tip">可用期限:{{debtData.creditEndDay}}</div>
                        </div>
                        <div class="info">{{debtData.applyEndDay}}</div>
                    </div>

                    <div class="bottom">
                        <div class="cnt cancel"  @click="onClose">取消</div>
                        <div class="cnt submit"  @click="onSubmit">提交</div>
                    </div>
               </div> 
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./CattleList.ts"></script>
<style lang="scss"  src="./CattleList.scss" ></style>
