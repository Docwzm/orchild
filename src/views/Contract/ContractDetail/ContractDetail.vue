<template>
   <!-- 合同详情 -->
  <div class="ContractDetail">
     <JXContractInfo  :contractlogData="contractlogData" :options="options"></JXContractInfo>
     <div class="pdfContainer">
         <vue-preview :slides="slideData" @close="handleClose"></vue-preview>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./ContractDetail.scss"></style>
<script lang="ts" src="./ContractDetail.ts"></script>
