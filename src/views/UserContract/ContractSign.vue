<template>
  <div class="contractSign">
    <JXContractInfo></JXContractInfo>
    <div class="pdfContainer">
      <img src="@/assets/hetong.jpg" style="width:100%">
    </div>
    <div
      class="dropDom"
      ref="dropstr"
      @touchstart="gtouchstart"
      @touchmove.prevent="gtouchmove"
      @touchend="gtouchend"
    >
      <img class="seal" src="@/assets/zhangzi.png">
    </div>
    <div class="signOperation">
      <img class="close" src="@/assets/contract/close.png">
      <img class="check" @click="checkOk" src="@/assets/contract/check.png">
    </div>
    <!-- <div class="signBtn">
      <van-button class="refuse" type="default">拒绝</van-button>
      <van-button type="info">签署</van-button>
    </div>-->
    <!-- 签署弹出框 -->
    <van-popup v-model="show" round position="bottom" :style="{ height: '50%' }">
      <div class="signConfir">
         <div class="jx-dialog__header">签名授权确认</div>
         <div class="jx-dialog__content">
            <div class="jx_explain">
              您正在对安心签发出签名请求，委托安心签调用数字证书签署以下合同，数字证书一经调用立即生效
              <a>《借款凭证》</a>
            </div>
            <div class="verification">
               <van-cell-group>
                  <van-field
                    v-model="sms"
                    center
                    clearable
                    label="手机号"
                    placeholder="请输入手机号"
                  >
                    <van-button slot="button" type="primary" color="linear-gradient(90deg, #ff9916 0%, #ffa81e 40%, #ffb424 66%, #ffc32c 100%)">发送验证码</van-button>
                  </van-field>
                   <van-field
                    v-model="message"
                    label="授权码"
                    placeholder="请输入授权码"
                  />
                </van-cell-group>
            </div>
            <div class="checkInfo">
               <van-checkbox v-model="radioStatus" @click="checkClick">
                  <span>本人已阅读并同意合同全部内容并同意</span>
                  <a>《隐私声明》</a>
                  <a>《安心签平台服务协议》</a>
                  <a>《CFCA数字证书服务协议》</a>
              </van-checkbox>
            </div>
            <div class="jx_btn">
                <van-button class="cancel" @click="authCancelEvt" type="default">取消</van-button>
                <van-button type="info" @click="authorizationEvt" color="linear-gradient(90deg, #ff9916 0%, #ffa81e 40%, #ffb424 66%, #ffc32c 100%)">授权</van-button>
            </div>
         </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import JXContractInfo from "@/components/JXContractInfo/JXContractInfo.vue"

@Component({
    components: { JXContractInfo }
})
export default class ContractSign extends Vue {
    /** 印章拖拽相关初始化数据 */
    flags = false
    position = { x: 0, y: 0 } // 记录拖拽坐标
    nx: any = ""
    ny: any = ""
    dx = "" // 记录印章距左像素
    dy = "" // 记录印章距上像素
    xPum: any = ""
    yPum: any = ""

    show = false
    radioStatus = true

    /** 签署弹出框事件 */
    checkOk() {
        this.show = true
    }
    /**确认签署按钮事件 */
    checkClick(event: Event) {
        if (this.radioStatus) {
            this.radioStatus = false
        } else {
            this.radioStatus = true
        }
        console.log(this.radioStatus)
    }

    /**弹出框授权按钮事件 */
    authorizationEvt(){
      
    }
    
    /**弹出框取消按钮事件 */
    authCancelEvt(){
      this.show=false;
    }

    /** ##########印章拖拽事件############# */
    gtouchstart(event: any) {
        this.flags = true
        var touch
        if (event.touches) {
            touch = event.touches[0]
        } else {
            touch = event
        }
        this.position.x = touch.clientX // 鼠标按下X坐标
        this.position.y = touch.clientY // 鼠标按下y坐标
        this.dx = this.$refs.dropstr.offsetLeft // 印章距离容器左边距离
        this.dy = this.$refs.dropstr.offsetTop // 印章距离容器顶部距离
    }
    gtouchmove(event: any) {
        if (this.flags) {
            let touch
            if (event.touches) {
                touch = event.touches[0]
            } else {
                touch = event
            }
            this.nx = touch.clientX - this.position.x // 计算鼠标在印章内x坐标位置
            this.ny = touch.clientY - this.position.y // 计算鼠标在印章内y坐标位置
            this.xPum = this.dx + this.nx // 计算印章拖拽X坐标位置
            let yPos: any = this.dy + this.ny // 计算印章拖拽y坐标位置
            // 添加限制：只允许在屏幕内拖动
            const maxWidth = document.body.clientWidth - 255 // 屏幕宽度减去印章宽高,系统框架1rem=75px
            const maxHeight = document.body.clientHeight - 255
            if (this.xPum < 0) {
                // 屏幕x限制
                this.xPum = 0
            } else if (this.xPum > maxWidth) {
                this.xPum = maxWidth
            }
            // if (yPos >= 202) { //屏幕y限制
            //   this.yPum = this.dy+this.ny;
            // }
            if (yPos < maxHeight && yPos > 250) {
                this.yPum = this.dy + this.ny
            }
            this.$refs.dropstr.style.left = this.xPum + "px"
            this.$refs.dropstr.style.top = this.yPum + "px"
            // 阻止页面的滑动默认事件
            document.addEventListener(
                "touchmove",
                function() {
                    // 1.2 如果碰到滑动问题，请注意是否获取到 touchmove
                    //   event.preventDefault();//jq 阻止冒泡事件
                    event.stopPropagation() // 如果没有引入jq 就用 stopPropagation()
                },
                false
            )
        }
    }
    gtouchend(e: any) {
        this.flags = false
    }
}
</script>
<style lang="scss">
.contractSign {
  position: relative;
  height: 100vh;
  .JXContractInfo {
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 10;
  }
  .pdfContainer {
    position: relative;
    top: 150px;
    // margin-top:160px;
  }
  .dropDom {
    width: 150px;
    height: 150px;
    position: fixed;
    z-index: 99;
    top: 150px;
    border: 2px solid red;
    .seal {
      width: 150px;
      height: 150px;
    }
  }
  .signOperation {
    width: 100%;
    margin: 15px 20px 15px 20px;
    position: fixed;
    bottom: 0;
    z-index: 2;
    .close {
      width: 90px;
      height: 90px;
      margin-top: 5px;
    }
    .check {
      width: 100px;
      height: 100px;
      position: absolute;
      right: 5%;
    }
  }
  .signBtn {
    width: 100%;
    margin: 15px 20px 15px 20px;
    position: fixed;
    bottom: 0;
    z-index: 2;
    text-align: center;
    .van-button {
      border-radius: 15px;
      height: 80px;
      width: 40%;
      font-size: 30px;
    }
    .refuse {
      margin-right: 20px;
    }
  }
  .signConfir{
    .jx-dialog__header{
      padding-top: 24px;
      padding-bottom: 24px;
      font-size: 30px;
      font-weight: 500;
      line-height: 30px;
      text-align: center;
      border-bottom: 2px solid #ebedf0;
    }
    .jx-dialog__content{
      padding: 20px;
      .jx_explain{
        color: #8a8c99;
        line-height: 33px;
        a{
          color:#3333cc;
        }
      }
      .verification{
        .van-button {
          border-radius: 15px;
          height: 60px;
          font-size: 25px;
        }
      }
      .checkInfo{
        padding: 30px;
        font-size: 24px;
        .van-checkbox__icon{
            font-size: 38px;
            height:45px;
            line-height: 45px; 
        }
        .van-icon{
            font-size:32px;
            width: 45px;
            height: 45px;
        }
        .van-checkbox__label{
          line-height: 48px;
        }
        a{
          color:#3333cc;
        }
      }
      .jx_btn{
        text-align: center;
        .cancel{
          margin-right: 15px;
          border:1px solid #c3a98b;
          color: #c3a98b;
        }
         .van-button {
            border-radius: 15px;
            height: 80px;
            width: 40%;
            font-size: 30px;
          }
      }
      
    }
    
  }
}
</style>


