<template>
  <div class="apply">
    <div class="bg"></div>
    <div class="header">
      <div class="header-top">
        <div class="left">{{options.warehouseName}}</div>
        <div class="right">{{options.pledgeType=='1'?'静态质押':'动态质押'}}</div>
      </div>
      <div class="header-main">
        <div class="main-top">
          <div>当前抵押/质押率 {{showloaninfo.rate == null?'0':showloaninfo.rate}}%</div>
          <div>
            <JXCircle
              :rate="showloaninfo.rate == null? 0 :showloaninfo.rate"
              :speed="100"
              :text="showloaninfo.rate == null? 0 :showloaninfo.rate+'%'"
              :strokeWidth="298"
              :color="gradientColor"
              layer-color="#F3F3F3"
              size="300px"
            ></JXCircle>
          </div>
        </div>
        <div class="main-bottom">
          <div>
            库存统计时间:
            <span>{{showloaninfo.inventoryTime}}</span>
          </div>
          <div>
            在库质押物总货值:
            <span>{{showloaninfo.pledgeGoodsValue==null?'0':showloaninfo.pledgeGoodsValue|moneyNormalize}}元</span>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="group-item">
          <div class="label">
            <div>借款金额</div>
            <div class="shu"></div>
            <div>可用额度 (元):{{showloaninfo.remainQuota| moneyNormalize}}</div>
          </div>
          <div class="value">
            <span>￥</span>
            <input type="number" v-model="money" @touchstart.stop="show = true">
          </div>
        </div>
        <div class="group-item">
          <div class="label">
            <div>还款日期</div>
            <div class="shu"></div>
            <div>可用期限 (元):{{showloaninfo.creditEndDay}}</div>
          </div>
          <div class="value">
            <span @click="showPicker = true" class="dateShow">{{repayDate}}</span>
            <van-popup v-model="showPicker" position="bottom">
              <van-datetime-picker
                class="override"
                v-model="currentDate"
                :item-height="100"
                type="date"
                :min-date="minDate"
                @cancel="onCancell"
                @confirm="onSelectTime"
              />
            </van-popup>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="button" @click="loadApply">
        <p>提交</p>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./Loan.ts"></script>
<style lang="scss" scoped>
.apply {
  height: 100%;
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
    left: 5%;
    right: 5%;
    top: 40px;
    .group {
      margin-top: 35px;
      height: 300px;
      padding: 46px;
      background: #fff;
      color: #000;
      border-radius: 10px;
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
          input {
            flex-grow: 1;
            border: none;
            font-size: 35px;
          }
          span {
            height: 100%;
            display: inline-block;
            margin-top: 30px;
            font-size: 35px;
          }
          .dateShow {
            width: 100%;
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
    }
    .header-main {
      border-radius: 5px;
      color: #000;
      margin-top: 20px;
      height: 500px;
      background: #fefefe;
      padding: 10px;
      box-sizing: border-box;
      .main-top {
        height: 60%;
        box-sizing: border-box;
        text-align: center;
        padding-top: 20px;
        div:nth-child(1) {
          font-size: 25px;
          font-weight: 500;
        }
        div:last-child {
          padding-top: 10px;
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
