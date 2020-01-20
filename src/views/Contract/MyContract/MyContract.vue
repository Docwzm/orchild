<template>
   <!-- 我的合同 -->
  <div class="MyContract">
    <!-- 标题 -->
    <div class="title">{{options.templateName}}</div>
    <!-- 相关资料列表 -->
    <div class="tab0">
      <LoadMore :onLoadMore="onLoadMore" :enableLoadMore="enableLoadMore">
          <div class="content"  v-for="(item,index) in contractListData" :key="item.id"  @click="goContractDeatail(item)">
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
  </div>
</template>
<style lang="scss" scoped src="./MyContract.scss"></style>
<script lang="ts" src="./MyContract.ts"></script>
