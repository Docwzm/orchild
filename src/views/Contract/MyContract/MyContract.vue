<template>
   <!-- 我的合同 -->
  <div class="MyContract">
    <!-- 标题 -->
    <div>⟪{{query.templateName}}⟫</div>
    <!-- 相关资料列表 -->
    <div class="tab0" v-for="(item,index) in contractListData" :key= index  @click="goContractDeatail(currentIndex)">
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
</template>
<style lang="scss" scoped src="./MyContract.scss"></style>
<script lang="ts" src="./MyContract.ts"></script>
