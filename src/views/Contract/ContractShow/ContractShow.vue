<template>
  <div class="ContractShow">
      <!-- 0 待办合同 1已签合同 切换 -->
      <div class='listItem'>
        <div class="cnt"
          v-for="(item,index) in listItem" 
          :key= index
          @click="handleContract(index)"
          :class="{'active':currentIndex==index }">{{item}}
        </div>
      </div>
      <!-- 待办合同列表 -->
      <div v-if="currentIndex == 0" v-for="(item,index) in upComingContractListData" :key= index>
        <div class="tab0">
            <div class="creatTime">{{index}}</div>
            <div class="content"  v-for="(v,index) in item" :key= item.id>
                <div>{{v.businessCode}}</div>
                <div class="right">
                  <div class="txt">{{v._signStatusName}}</div>
                  <van-icon name="arrow"/>
                </div>
            </div>
        </div>
      </div>
      <!-- 已签合同列表 -->
      <div v-else  class="tab0">
          <div class="title">
            <div>贝爷信物</div>
            <div>共计30份合同</div>
          </div>
          <div class="content">
              <div>借款合同</div>
              <div class="right">
                <div class="txt">2份</div>
                <van-icon name="arrow"/>
              </div>
          </div>
      </div>
  </div>
</template>
<style lang="scss" scoped src="./ContractShow.scss"></style>
<script lang="ts" src="./ContractShow.ts"></script>
