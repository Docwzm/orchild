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
      <div class="tab0" v-if="currentIndex == 0">
          <div v-for="(item,index) in upComingContractListData" :key= index  @click="goContractDeatail(currentIndex)">
            <div class="creatTime">{{index}}</div>
            <div class="content"  v-for="(v,index) in item" :key= item.id>
                <div>{{v.businessCode}}</div>
                <div class="right">
                  <div class="txt">{{v.statusName}}</div>
                  <van-icon name="arrow"/>
                </div>
            </div>
          </div>
      </div>
      <!-- 已签合同列表 -->
      <div class="tab1" v-else>          
          <div class="title" v-if="signContractListData.length > 0">
            <div>{{currentOrganizationName}}</div>
            <div>共计{{mountSum}}份合同</div>
          </div> 
          <div class="content"  v-for="(item,index) in signContractListData" :key= index @click="goContractDeatail(item)">
              <div>{{item.templateName}}</div>
              <div class="right">
                <div class="txt">{{item.count}}份</div>
                <van-icon name="arrow"/>
              </div>
          </div>
      </div>
  </div>
</template>
<style lang="scss" scoped src="./ContractShow.scss"></style>
<script lang="ts" src="./ContractShow.ts"></script>
