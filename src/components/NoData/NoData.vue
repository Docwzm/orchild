<template>
    <div class="nodata">
        <div class="no">
            <img src="@/assets/category/icon/nodata.png" alt="">
            <div class="tip-text">您当前没有业务</div>
            <div class="btn apply-btn confirmBtn" @click="jumpPage">立即申请</div>
            <div class="btn history" @click="lookLog">查看历史业务</div>
        </div>
    </div>
</template>
<script lang="ts" src="./NoData.ts">
</script>

<style lang="scss" scoped>
.nodata {
  height: 100vh;
  background-color: #fff;
  .no {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: calc(100% - 80px);
    image {
      width: 240px;
    }
    .tip-text {
      font-size: 32px;
      margin-top: 42px;
      margin-bottom: 46px;
      // font-weight: bold;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      width: 100%;
      font-size: 28px;
      width: 594px;
      height: 84px;
      margin-bottom: 18px;
    }
    .apply-btn {
      // color: $themeBlue;
      background: linear-gradient(to right, #c3a98b, #aa9173, #8d7456);
      color: #ffffff;
    }
    .history {
      border: 1px solid #c6ab8c;
      color: #c6ab8c;
    }
  }
}
</style>

