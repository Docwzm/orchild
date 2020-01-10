<template>
   <!-- 合同详情 -->
  <div class="ContractDetail">
     <JXContractInfo  :contractlogData="contractlogData" :options="options"></JXContractInfo>
     <div class="pdfContainer" style="margin-top:130px">
         <vue-preview class="imgPrev" :slides="slideData" @close="handleClose"></vue-preview>
    </div>
  </div>
</template>
<style lang="scss" src="./ContractDetail.scss"></style>
<script lang="ts"  src="./ContractDetail.ts"></script>
