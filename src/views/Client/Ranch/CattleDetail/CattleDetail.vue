<template>
    <div class="CattleDetail">
        <!-- 栏舍信息 -->
        <div class="title">
            <div>{{options.memberName}}</div>
            <div class="inDays">在栏{{options.inDays}}天</div>
        </div>
        <!-- 牛信息相关详情 -->
        <div class="content">
            <div class="tips">
                <img class="img" v-if="options.gender==1" src="@/assets/bull.png">
                <img class="img" v-else  src="@/assets/muniu.png">
                <div class="totalNum">{{options.code}}</div>
            </div>
            <div class="com">
                <div class="total">品类:</div>
                <div class="totalNum">{{options.category}}</div>
            </div>
            <div class="com">
                <div class="total">品种:</div>
               <div class="totalNum">{{options.breed}}</div>
            </div>
            <div class="com">
                <div class="total">用途:</div>
                <div class="totalNum">{{options.purpose}}</div>
            </div>
            <div class="com">
                <div class="total">花色:</div>
                 <div class="totalNum">{{options.color}}</div>
            </div>
            <div class="com">
                <div class="total">入栏日期:</div>
                <div class="totalNum">{{options.inStallTime}}</div>
            </div> 
            <div class="com">
                <div class="total">入栏体重:</div>
                 <div class="totalNum">{{options.inStallWeight}}KG</div>
            </div>
            <div class="com">
                <div class="total">入栏单价:</div>
                <div class="totalNum">{{options.inStallPrice}}元/KG</div>
            </div>
            <div class="com">
                <div class="total">所在牧场:</div>
                <div class="totalNum">{{options.ranchName}}</div>
            </div>
            <div class="com">
                <div class="total">所在栏舍:</div>
                 <div class="totalNum">{{options.stallName}}</div>
            </div> 
        </div>
    </div>
</template>
<script lang="ts" src="./CattleDetail.ts"></script>
<style lang="scss"  src="./CattleDetail.scss" ></style>
