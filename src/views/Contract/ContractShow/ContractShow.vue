<template>
  <div class="ContractShow">
      <!-- 0 待办合同 1已签合同 切换 -->
      <div class='listItem'>
        <div class="cnt"
          v-for="(item,index) in listItem" 
          :key= index
          @click="handleContract(index)"
          :class="{'com':currentIndex==index,'active':currentIndex==index}">{{item}}
        </div>
      </div>
      <!-- 待办合同列表 -->
      <div class="tab0" v-if="currentIndex == 0">
        <LoadMore :onLoadMore="onLoadMore" :enableLoadMore="enableLoadMore">
            <div class="content"  v-for="(item,index) in upComingContractListData" :key="item.id"  @click="goContractSign(item)">
                <div class="createShortTime">{{item.createShortTime}}</div>
                <div class="info">
                  <div>{{item.businessCode}}</div>
                  <div class="right">
                    <div class="txt">{{item.statusName}}</div>
                    <van-icon name="arrow"/>
                  </div>
                </div>
            </div>
        </LoadMore>
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
