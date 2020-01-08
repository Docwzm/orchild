<template>
    <div class="JXContractInfo" :style="{bottom:collapseStatus}">
        <van-collapse v-model="activeNames" @change="collapseChange">
            <van-collapse-item :title="options.name" :label="options.code"  value="查看详情">
                <div class="contractInfo">
                    <van-panel title="合同信息">
                      <van-cell-group>
                         <van-field label="创建时间" :value="options.createTime"  readonly />
                         <van-field label="更新时间" :value="options.updatedTime"  readonly />
                         <van-field label="创建人" :value="options.createName"  readonly />
                         <van-field label="状态" :value="options.statusName"  readonly />
                      </van-cell-group>
                    </van-panel>
                </div>
                <div class="signInfo">
                     <van-panel title="签署信息">
                      <van-cell-group>
                         <div v-for="(item,index) in options.contractSignList" :key= index>
                             <van-field :label= item.signRole :value="item.signerName+'('+item.signStatusName+')'"  readonly />
                         </div>
                      </van-cell-group>
                    </van-panel>
                </div>
                <div class="signSteps">
                     <van-panel title="合同记录">
                        <van-steps direction="vertical" active='00' active-color="#969799">
                            <van-step v-for="(item,index) in contractlogData" :key= index>
                                <h2>{{item.creatorName}}{{item.desc}}</h2>
                                <p>{{item.createTime}}</p>
                            </van-step>
                        </van-steps>
                    </van-panel>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>
<script lang="ts">
import {Component,Vue,Prop} from 'vue-property-decorator';

@Component({})
export default class JXContractInfo extends Vue {
    @Prop() private contractlogData:any;
    @Prop() private options:any;
    collapseStatus:any="auto"
    /**其它数据 */
    activeNames= []//折叠控件
    collapseChange(e:any){
        if(e.length>0){
            this.collapseStatus="0"
        }else{
            this.collapseStatus="auto"
        }
    }
}
</script>


<style lang="scss">
   .JXContractInfo{
        position: fixed;
        top: 0;
        // bottom:0; 
        width: 100%;
        z-index: 111;
        overflow-y: scroll;
       .van-collapse{
            // position: fixed;
            // width: 100%;
            // z-index: 101;
       }
        .van-collapse-item__wrapper{
             background-color: #f8f8f8;
        }
        .van-collapse-item__content{
            background-color: #f8f8f8;
            padding:0;
            margin-bottom: 85px;
        }
        .van-collapse-item__title{
            padding: 35px 20px 30px 20px;
            .van-cell__title{
                font-size: 36px;
                .van-cell__label{
                    margin-top: 18px;
                    font-size: 30px;
                }
            }
            .van-cell__value{
                display: inline;
                padding-top: 5px;
                font-size: 30px;
            }
            .van-cell__right-icon{
                padding-top: 5px;
                font-size: 30px;
            }
        
        }
        .van-cell__value {
            position: relative;
            overflow: hidden;
            color: #969799;
            text-align: right;
            vertical-align: middle;
            display: flex;
        }
        .van-cell-group .van-field__label {
            font-size: 0.373333rem;
            width: 2.933333rem;
            text-align: left;
            color: #313D7E;
            display: flex;
            align-items: center;
        }
        .van-field__control {
            box-sizing: border-box;
            width: 100%;
            min-width: 0;
            margin: 0;
            padding: 0;
            color: #323233;
            text-align: left;
            background-color: transparent;
            border: 0;
            resize: none;
            display: flex;
            align-items: center;
            line-height: 30px;
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

