<template>
  <div class="apply">
    <div class="bg"></div>
    <div class="header">
      <div class="header-top">
        <div class="left">{{options.warehouseName}}</div>
        <div class="right">{{options.pledgeType==1?'静态质押':'动态质押'}}</div>
      </div>
      <div class="header-main">
        <div class="main-top">
          <div class="left">
            <JXCircle
              :rate="rate"
              :speed="100"
              :text="text"
              :strokeWidth="298"
              :color="gradientColor"
              layer-color="#F3F3F3"
              size="300px"
            ></JXCircle>
          </div>
          <div class="right">
            <div class="cell">{{options.productName}}</div>
            <div class="cell">
              待还金额(元)
              <span
                class="cell-price"
              >{{options.loanAmount=='null'?'0':options.loanAmount|moneyNormalize}}</span>
            </div>
            <div class="cell">
              在库货值(元)
              <span
                class="cell-price"
              >{{options.goodsValue=='null'?'0':options.goodsValue|moneyNormalize}}</span>
            </div>
            <div class="cell">
              担保货值(元)
              <span
                class="cell-price"
              >{{options.pledgeGoodsValue=='null'?'0':options.pledgeGoodsValue|moneyNormalize}}</span>
            </div>
          </div>
        </div>
        <div class="main-bottom">
          <div>库存统计时间: {{options.inventoryTime=='null'?'--':options.inventoryTime}}</div>
        </div>
      </div>
      <div class="icon">
        <div class="left" @click="loan">
          <img src="@/assets/category/icon/loan.png" alt="">
          <p>借款</p>
        </div>
        <div class="right" @click="refund">
          <img src="@/assets/category/icon/refund.png" alt="">
          <p>还款</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="button" @click="monitorEvt">
        <img src="@/assets/category/icon/jk.png" alt="">
        <p>仓库监控</p>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./Apply.ts"></script>
<style lang="scss" scoped>
.apply {
  height: 100vh;
  background: #f3f3f3;
  .bg {
    height: 400px;
    background: linear-gradient(#151a33, #3b4255);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .header {
    position: fixed;
    z-index: 999;
    color: #fff;
    background: none;
    left: 5%;
    right: 5%;
    top: 40px;
    .icon {
      margin-top: 35px;
      padding: 0 20px;
      height: 300px;
      width: 100%;
      display: flex;
      color: #000;
      font-size: 30px;
      text-align: center;
      .left,
      .right {
        padding-top: 30px;
        box-sizing: border-box;
        width: 200px;
        height: 200px;
        border-radius: 15px;
        background: #fff;
        margin-right: 15px;
      }
    }
    .header-top {
      font-size: 30px;
      font-weight: 600;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
    }
    .header-main {
      border-radius: 15px;
      color: #000;
      margin-top: 20px;
      height: 400px;
      background: #fefefe;
      padding: 10px;
      box-sizing: border-box;
      .main-top {
        height: 60%;
        display: flex;
        justify-content: space-between;
        .left {
          width: 300px;
          text-align: center;
          padding-top: 30px;
        }
        .right {
          display: flex;
          flex-direction: column;
          margin-right: 10%;
          .cell:nth-of-type(1) {
            font-weight: 700;
            font-size: 27px;
            margin-top: 35px;
            margin-bottom: 10px;
          }
          .cell {
            margin-top: 20px;
            height: 20%;
            text-align: left;
            .cell-price {
              font-weight: 800;
              padding-left: 5px;
            }
          }
        }
      }
      .main-bottom {
        margin-top: 50px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 30px;
        color: #c5c2c8;
      }
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: #fff;
    text-align: center;
    padding: 20px 30px;
    .button {
      width: 100%;
      height: 80px;
      background: #cfb89b;
      color: #fff;
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
