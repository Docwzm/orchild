<template>
    <div class="JXContractInfo">
        <van-collapse v-model="activeNames">
            <van-collapse-item title="借款凭证" label="123123123123">
                <div class="contractInfo">
                    <van-panel title="合同信息">
                      <van-cell-group>
                         <van-field label="创建时间" value="2019:12:24" readonly />
                         <van-field label="更新时间" value="2019:12:24" readonly />
                         <van-field label="创建人" value="程燕" readonly />
                         <van-field label="状态" value="已发布" readonly />
                      </van-cell-group>
                    </van-panel>
                </div>
                <div class="signInfo">
                     <van-panel title="签署信息">
                      <van-cell-group>
                         <van-field label="借款人" value="郭丹(待签署)" readonly />
                         <van-field label="银行" value="程燕(待签署)" readonly />
                      </van-cell-group>
                    </van-panel>
                </div>
                <div class="signSteps">
                     <van-panel title="合同记录">
                        <van-steps direction="vertical">
                            <van-step>
                                <h2>程燕发送给了程燕</h2>
                                <p>2016-07-12 12:40</p>
                            </van-step>
                            <van-step>
                                <h2>程燕发布合同</h2>
                                <p>2016-07-11 10:00</p>
                            </van-step>
                        </van-steps>
                    </van-panel>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class JXContractInfo extends Vue {
      /**其它数据 */
      activeNames= []//折叠控件
  }
</script>


<style lang="scss">
   .JXContractInfo{
       .van-collapse{
            // position: fixed;
            // width: 100%;
            // z-index: 10;
       }
          
        .van-collapse-item__content{
            background-color: transparent;
            padding:0;
        }
        .van-cell{
            padding: 30px 20px 30px 20px;
            .van-cell__title{
                font-size: 36px;
                .van-cell__label{
                    margin-top: 18px;
                    font-size: 30px;
                }
            }
            .van-cell__right-icon{
                font-size: 30px;
            }
        
        }
        .contractInfo,.signInfo,.signSteps{
            margin-top: 10px;
            .van-panel__header{
                padding: 25px 20px 25px 20px;
                .van-cell__title{
                    font-size: 36px;
                    .van-cell__label{
                        // margin-top: 18px;
                        font-size: 26px;
                    }
                }
            }
            .van-panel__content{
                .van-cell__title{
                    color:#969799;
                    font-size: 30px;
                    .van-cell__label{
                        // margin-top: 18px;
                        font-size: 26px;
                    }
                }
            }
        
        }

        .signSteps{
            .van-panel__content{
                padding-left: 30px;
            }
            .van-step--vertical{
                padding: 0px 0px 10px 20px;
            }
        .van-step__circle-container{
            font-size: 25px;
        }
        .van-step__circle{
            font-size: 20px;
            width:15px;
            height: 15px;
        }
        }
     
   }
</style>

