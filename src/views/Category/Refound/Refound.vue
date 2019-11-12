<template>
  <div class="apply">
    <div class="bg"></div>
    <div class="header">
      <div class="header-top">
        <div class="left">满意测试</div>
        <div class="right">
             <img src="@/assets/category/icon/xz.png" alt=""> 切换借据</div>
      </div>
      <div class="header-main">
        <div class="main-top">
            <div>
                <p>待还本金 JJ190725502723</p>
                <p class="indent">￥ 64,446.17 元</p>
            </div>
            <div>
                <p>到期日</p>
                <p class="indent">2019/10/10 |  <img src="@/assets/category/icon/yc.png" alt=""> <span class="day">预期 23 天</span></p>
            </div>
        </div>
        <div class="main-bottom">
          <div>库存统计时间: <span>2019/11/11 12:30:00</span></div>
          <div>库存统计时间:<span>2019/11/11 12:30:00</span></div>
        </div>
      </div>
      <div class="group">
        <div class="group-item">
          <div class="label">
            <div>还款本金</div>
          </div>
          <div class="value">
            <span>￥</span>
            <input type="number" @touchstart.stop="show = true" value="0"/>
          </div>
        </div>
        <p>* 本次还款利息已银行最终扣款结果为准，请确保银行卡余额充足</p>
      </div>
    </div>
    <div class="bottom">
      <div class="button">
        <p>提交</p>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./Refound.ts"></script>
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
        color: #CBB3A4;
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
          color: #5582C6;
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
        div:nth-child(1) {
            font-size: 25px;
            font-weight: 500;
        }
        div:last-child {
            padding-top: 10px;
        }
        .indent {
            padding-left: 20px;
            font-size: 25px;
            .day {
                padding-left: 10px;
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
        div {
          margin-bottom: 10px;
          span {
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