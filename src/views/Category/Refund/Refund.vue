<template>
  <div class="apply">
    <div class="bg"></div>
    <div class="header">
      <div class="header-top">
        <div class="left">{{queryParams.warehouseName}}</div>
        <div class="right" @click="switchIou">
          <img src="@/assets/category/icon/xz.png" alt="">切换借据
        </div>
      </div>
      <div class="header-main">
        <div class="main-top">
          <div>
            <p>
              待还本金
              <span class="bj">{{FirstLoanData.loanNo}}</span>
            </p>
            <p class="indent">￥ {{FirstLoanData.loanBalance | moneyNormalize}} 元</p>
          </div>
          <div>
            <p>到期日</p>
            <p class="indent">
              {{FirstLoanData.expireTime}}
              <span class="token">|</span>
              <span class="day" v-if="FirstLoanData.status==0">
                <img src="@/assets/category/icon/yc.png" alt="">
                <span style="color:red">逾期 {{FirstLoanData.remainDays}} 天</span>
              </span>
              <span class="day" v-else>
                <img src="@/assets/category/icon/zc.png" alt="">
                <span style="color:red">剩余 {{FirstLoanData.remainDays}} 天</span>
              </span>
            </p>
          </div>
        </div>
        <div class="main-bottom">
          <div>
            借款日期:
            <span>{{FirstLoanData.loanBeginDate}}</span>
          </div>
          <div>
            借款单位:
            <span>{{FirstLoanData.orgName}}</span>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="group-item">
          <div class="label">
            <div>还款本金</div>
          </div>
          <div class="value">
            <span>￥</span>
            <input type="number" @touchstart.stop="show = true" v-model="principal">
            <span @click="fullRepayment">全部还清</span>
          </div>
        </div>
        <p>* 本次还款利息已银行最终扣款结果为准，请确保银行卡余额充足</p>
      </div>
    </div>
    <div class="bottom">
      <div class="button">
        <p @click="refundMoneySubmit">提交</p>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./Refund.ts"></script>
<style lang="scss" scoped>
.apply {
  height: 100%;
  background: #f3f3f3;
  .bg {
    height: 500px;
    background: linear-gradient(#151a33, #3b4255);
    position: relative;
    top: 0;
    left: 0;
    right: 0;
  }
  .header {
    position: absolute;
    z-index: 999;
    color: #fff;
    background: none;
    padding: 0 30px;
    top: 40px;
    .group {
      margin-top: 35px;
      height: 300px;
      padding: 46px;
      background: #fff;
      color: #000;
      border-radius: 30px;
      p {
        color: #cbb3a4;
        font-size: 25px;
      }
      .group-item {
        padding-bottom: 30px;
        .label {
          display: flex;
          div:nth-child(1) {
            font-size: 32px;
            font-weight: 600;
            position: relative;
          }
          div:last-child {
            font-size: 28px;
            color: #a0a0ac;
          }
          .shu {
            width: 2px;
            height: 32px;
            background-color: #000;
            margin: 0px 22px;
          }
        }
        .value {
          padding: 14px 0;
          border-bottom: 1px solid #ebebeb;
          display: flex;
          align-items: center;
          height: 60px;
          font-size: 30px;
          input {
            flex-grow: 1;
            border: none;
            font-size: 30px;
          }
          span {
            height: 100%;
            margin-top: 30px;
          }
        }
      }
    }
    .header-top {
      font-size: 30px;
      font-weight: 600;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      .right {
        color: #5582c6;
        img {
          width: 21px;
          height: 21px;
        }
      }
    }
    .header-main {
      border-radius: 30px;
      color: #000;
      margin-top: 20px;
      height: 500px;
      background: #fefefe;
      padding: 10px;
      box-sizing: border-box;
      .main-top {
        height: 60%;
        box-sizing: border-box;
        text-align: left;
        padding-top: 20px;
        padding-left: 10%;
        .bj {
          margin-left: 10px;
          color: #c5c2c8;
        }
        div:nth-child(1) {
          font-size: 25px;
          font-weight: 500;
        }
        div:last-child {
          padding-top: 10px;
        }
        .indent {
          padding-left: 20px;
          font-size: 1.2em;
          img {
            width: 44px;
          }
          .token {
            margin: 0 20px;
          }
          .day {
            padding-left: 10px;
          }
        }
      }
      .main-bottom {
        margin-top: 50px;
        height: 40px;
        line-height: 40px;
        margin-left: 15%;
        font-size: 30px;
        color: #c5c2c8;
        div {
          margin-bottom: 10px;
          span {
            margin-left: 10px;
            color: #000;
          }
        }
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
      border-radius: 10px;
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