<template>
  <div class="category">
    <div class="category-top">
      <div class="top-header">
          <div class="left">
              <van-circle
                v-model="currentRate"
                :rate="30"
                :speed="100"
                :text="text"
                :stroke-width="300"
                :color="gradientColor"
                 size="220px"
                />
          </div>
          <div class="right">
              <div class="cell cell-first">
                <van-dropdown-menu>
                    <van-dropdown-item v-model="value" :options="option" @change="bindPickerChange"/>
                </van-dropdown-menu>
                <div class="btn">还款</div>
              </div>
              <div class="cell">待还本金</div>
              <div class="cell">64,446.16元</div>
              <div class="cell">最近到期时期:2019/10/10</div>
          </div>
      </div>
      <div class="top-bottom">
          <div>授信使用率</div>
          <div class="bottom-column">
              <span class="sell">2,906209.83</span>
              <span>可用额度</span>
          </div>
          <div class="bottom-column">
              <span class="sell">2,906209.83</span>
              <span>可用额度</span>
          </div>
      </div>
    </div>
    <div class="category-center" @click="lookLog">
        <div>
            <img src="@/assets/category/icon/jl.png" alt="" class="img">
            查看业务记录
        </div>
        <img src="@/assets/category/icon/right.png" alt="">
    </div>
    <div class="category-bottom">
        <div class="bottom-top">
            <div class="left">满意测试</div>
            <div class="right">
                 库存
                <img src="@/assets/category/icon/right.png" alt="">

            </div>
        </div>
        <div class="bottom-center">
            <div class="left">
                 <van-circle
                v-model="currentRate"
                :rate="30"
                :speed="100"
                :text="text"
                :stroke-width="300"
                :color="gradientColor"
                layer-color="#ebedf0"
                 size="220px"
                />
            </div>
            <div class="right">
                <div class="cell">
                    <span>静态质押</span>
                </div>
                <div class="cell">
                    <span>待还金额(元)</span>74,346.17
                </div>
                <div class="cell">
                    <span>待还金额(元)</span>74,346.17
                </div>
                <div class="cell">
                    <span>待还金额(元)</span>74,346.17
                </div>
            </div>
        </div>
        <div class="bottom-bottom">
            申请业务
        </div>
    </div>
  </div>
</template>


<script src="./Category.ts" lang="ts"></script>

<style lang="scss">
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
    border-width: 0 !important;
}
.category {
  height: 100%;
  background: #F3F3F3;
  .category-top {
    height: 460%;
    padding: 20px 0;
    background:  linear-gradient(#151A33,#3B4255);
    .top-header {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        padding: 20px;
        padding-top: 50px;
        font-size: 30px;
        .left {
            width: 300px;
            .van-circle__text {
                color: #fff;
            }
        }
        .right {
             color: #fff;
             display: flex;
             flex-direction: column;
             justify-content: space-between;
             flex-grow: 1;
            .btn {
                width: 90px;
                border: 1px solid #B3522F;
                border-radius: 10px;
                padding: 10px;
                text-align: center;
                color: #B3522F;
            }
            .cell-first {
                display: flex;
                justify-content: space-between;
                flex-wrap: nowrap;
            }
            .cell {
                padding: 12px 0;
                line-height: 30px;
                .van-dropdown-menu {
                    background-color: transparent !important;
                    .van-ellipsis {
                        color: #fff;
                        font-size: 25px;
                        line-height: 35px;
                    }
                }

            }

        }
    }
    .top-bottom {
        box-sizing: border-box;
        padding: 20px 40px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        color: #8E929D;
        font-size: 32rpx;
        .bottom-column {
            display: flex;
            flex-direction: column;
            .sell {
                color: #fff;
                padding-bottom: 15px;
            }
        }
    }
  }
  .category-center {
      display: flex;
      justify-content: space-between;
       align-items: center;
       padding: 0 46px;
      height: 115px;
      color: #000;
      background-color: #fff;
      div {
          display: flex;
          align-items: center;
          .img {
              width: 38px;
              height: 40px;
              padding-right: 16px;
          }
      }
  }
  .category-bottom {
      background: #fff;
      margin-top: 60px;
      .bottom-top {
          padding: 0 46px;
          font-size: 30px;
          height: 80px;
          line-height: 80px;
          display: flex;
          justify-content: space-between;
      }
      .bottom-center {
          border-top: 1px solid #eee;
          display: flex;
          flex-wrap: nowrap;
         justify-content: center;
         align-items: center;
         padding: 20px;
         font-size: 30px;
          .left {
              width: 300px;
          }
          .right {
              display: flex;
              flex-direction: column;
              line-height: 50px;
          }
      }
      .bottom-bottom {
          width: 100%;
          border-top: 1px solid #eee;
        height: 90px;
        line-height: 90px;
        font-size: 30px;
        text-align: center;
        vertical-align:middle

      }
  }
}
</style>
