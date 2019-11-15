<template>
  <div class="rediv">
    <div class="head">
      <div class="company"></div>
      <div class="bis">
        <Cell
          :columns="columnsData"
          rightIcon="arrow-down"
          :defaultValue="organizationName"
          @onChange="onChangeHandle"
        />
      </div>
      <div class="quota">
        <div class="num">
          <div>{{userMoney}}</div>
          <div>{{totalMoney}}</div>
        </div>
        <div class="text">
          <div>可用额度（元）</div>
          <div>总额度（元）</div>
        </div>
      </div>
    </div>
    <div class="tip">
      <img src="@/assets/category/icon/deng.png" />
      <p>额度审核中...</p>
    </div>
  </div>
</template>

<script src="./Result.ts" lang="ts"></script>

<style lang="scss" scoped>
.rediv {
  height: 100%;
  .tip {
    font-size: 32px;
    // font-weight: bold;
    text-align: center;
    padding: 80px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    image {
      width: 104px;
      height: 125px;
    }
    text {
      padding-top: 30px;
    }
  }
  .head {
    height: 460px;
    padding: 40px 0px;
    background-color: #c5ab8d;
    color: #fff;
    .company {
      font-size: 28px;
      color: #fff;
      padding: 0px 20px;
    }
    .bis {
      padding: 40px 20px;
      .bis-bg {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        width: 362px;
        padding: 14px;
        font-size: 32px;
        display: flex;
        align-items: center;
        .icon {
          width: 30px;
          height: 18px;
          padding-left: 10px;
          img {
            display: block;
            width: 30px;
            height: 18px;
          }
        }

        div:nth-child(2) {
          padding: 0px 14px;
        }
        div:nth-child(4) {
          margin-left: 20px;
        }
      }
    }
    .quota {
      font-size: 28px;
      .num {
        font-size: 38px;
        width: 600px;
        // background-color: rgba(255,255,255, 0.2);
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding: 26px 0px 26px 20px;
        // div:nth-child(2){
        //     margin-left: 300px;
        // }
        div {
          width: 300px;
        }
      }
      .text {
        width: 600px;
        display: flex;
        align-items: center;
        padding: 20px 0px 20px 20px;
        div {
          width: 300px;
        }
      }
    }
  }
}
</style>
