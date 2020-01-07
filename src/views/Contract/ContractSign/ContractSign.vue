<template>
  <div class="contractSign">
    <JXContractInfo :contractlogData="logInfo" :options="contractInfo"></JXContractInfo>
    <div class="pdfContainer" style="top: 84px;">
      <img ref="contractPic" @load="imgOnLoad" :src="options.contractPicUrl" :style="{ width: '100%', height: contractZoomHeight + 'px' }">
    </div>
    <div
      v-if="signOperationStatus"
      class="dropDom"
      ref="dropstr"
      @touchstart="gtouchstart"
      @touchmove.prevent="gtouchmove"
      @touchend="gtouchend"
      :style="{position:'absolute',left:sealPos.x+'px',top:sealPos.y+'px',width:sealSize.width+'px',height:sealSize.height+'px'}"
    >
      <img class="seal" @load="sealOnLoad" :style="{width:sealSize.width+'px',height:sealSize.height+'px'}" :src="signInfo.sealUrl">
    </div>
    <div class="signOperation" v-if="signOperationStatus">
      <img class="close" @click="closeEvt" src="@/assets/contract/close.png">
      <img class="check" @click="checkOk" src="@/assets/contract/check.png">
    </div>
    <div class="signBtn" v-if="signBtnStatus">
      <van-button class="refuse" type="default" @click="refuseEvt">拒绝</van-button>
      <van-button  @click="signBtnEvt" color="linear-gradient(-90deg, #917451 0%, #a98d6b 40%, #c1a585 66%, #dfcdb4 100%)" type="info">签署</van-button>
    </div>
    <!-- 签署弹出框 -->
    <van-popup v-model="show" round position="bottom" :style="{ height: '50%' }">
      <div class="signConfir">
         <div class="jx-dialog__header">签名授权确认</div>
         <div class="jx-dialog__content">
            <div class="jx_explain">
              您正在对安心签发出签名请求，委托安心签调用数字证书签署以下合同，数字证书一经调用立即生效
              <a>《借款凭证》</a>
            </div>
            <div class="verification" v-if="selfSign.signStatus != 12">
               <van-cell-group>
                  <van-field
                    readonly
                    v-model="phone"
                    center
                    clearable
                    label="手机号"
                    placeholder="请输入手机号"
                  >
                    <van-button slot="button" @click="sendCode" type="primary" color="linear-gradient(90deg, #ff9916 0%, #ffa81e 40%, #ffb424 66%, #ffc32c 100%)">{{codeTxt}}</van-button>
                  </van-field>
                   <van-field
                    v-model="messageCode"
                    label="授权码"
                    placeholder="请输入授权码"
                  />
                </van-cell-group>
            </div>
            <div class="checkInfo">
               <van-checkbox v-model="radioStatus" @click="checkClick">
                  <span>本人已阅读并同意合同全部内容并同意</span>
                  <a @click="viewProtocolPrivacy">《隐私声明》</a>
                  <a @click="viewProtocolPlatform">《安心签平台服务协议》</a>
                  <a @click="viewProtocolCFCA">《CFCA数字证书服务协议》</a>
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
import {ContractService} from '@/api'

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
    xPum: any = "" //最终印章显示x位置
    yPum: any = "" //最终印章显示y位置
    sealPos={x: 0, y: 0} //印章坐标位置
    contractPageNum=0 //合同页数 图片显示高度/合同每页的高度=页数
    //正常A4纸的宽高  不会改变
    A4Info={width: 1075,height: 1520}
    contractImgSize={width:0,height:0}
    sealSize={width:0,height:0}//印章大小
    contractZoomHeight=0 //合同图片手机端缩放后的完整高度
    containerWith=0 //容器宽度
    contractZoomScaleValue=0 //合同图片缩放比例
    contractRealPos={x: 0, y: 0,sealScale:0,realPage:0}//原始合同印章真实坐标位置已经所需要的其它数据

    options:any={}
    show = false //是否显示弹出框
    radioStatus = true //checkbox按钮是否选中
    signOperationStatus=false //是否显示操作按钮
    signBtnStatus=false  //是否显示拒绝与签署按钮
    pdfUrl=""//pdf图片url
    userInfoData:any={}//当前登录人的信息
    selfSign:any={}//签署信息
    signInfo:any={}//电子印章信息
    logInfo:any={}//合同签署历史信息
    codeTxt:any="获取验证码"//发送验证码按钮
    phone:any=""//手机号
    messageCode:any=""//验证码

    contractInfo:any={}//折叠框数据--合同信息--签署信息
    /**
     * vuex生命周期钩子,Dom渲染完后执行相关操作
     */
    mounted(){
      this.options = this.$route.query
      this.userInfoData=this.$store.state.base.loginUserCurrentOrganization
      this.contractSignListHandle();
      this.containerWith=document.body.clientWidth||this.$refs.contractPic.clientWidth;
      this.getContractLog();
      this.getCompSignature();
    }

    /**
     * 查看隐私声明
     */
    viewProtocolPrivacy() {
        this.$router.push('/protocolPrivacy');
    }

    /**
     * 查看安心签平台服务协议
     */
    viewProtocolPlatform() {
        this.$router.push('/protocolPlatform');
    }

    /**
     * 查看CFCA数字证书服务协议
     */
    viewProtocolCFCA() {
        this.$router.push('/protocolCFCA');
    }

    /**拿到属于登陆人的签署信息 (主要获取公章url) */
    contractSignListHandle(){
      let loginUserMemberId=this.userInfoData.memberId;
      let loginUserOrgId=this.userInfoData.organizationId||0;
      for(let item of this.options.contractSignList){
          if (item.signerId == loginUserMemberId && item.organizationId ==loginUserOrgId && item.signStatus != 15) {
              this.selfSign = item;
              this.phone=item.mobile;
              console.log("本签署人：：",this.selfSign)
              break;
          }
      }

      //合同信息--签署信息数据
      this.contractInfo={
          name:this.options.name,
          code:this.options.businessCode,
          createTime:this.options.createTime,
          updatedTime:this.options.updatedTime,
          createName:this.options.createName,
          statusName:this.options.statusName,
          contractSignList:this.options.contractSignList
      }

    }

    /**签署按钮 */
    signBtnEvt(){
      this.signOperationStatus=true;
      this.signBtnStatus=false;
    }
    /**拒绝签署 */
    refuseEvt(){
      let self=this;
      this.$dialog.confirm({
        title: '标题',
        message: '是否取消签署',
        beforeClose:function(action, done){
          if (action === 'confirm') {
            self.$router.go(-1)
            // window.history.back(-1); 
            done();
          } else {
            done();
          }
        }
      });
    }

    closeEvt(){
       this.signOperationStatus=false;
       this.signBtnStatus=true;
    }
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
      if (!this.radioStatus) {
        this.$toast('请同意协议');
        return;
      }
      if (this.selfSign.signStatus == 12) {
        this.signContract();
      } else {
        if (!!!this.messageCode) {
          this.$toast('请输入验证码');
        } else {
          //检查验证码接口
          this.checkVerCode();
        }
      }
    }
    
    /**弹出框取消按钮事件 */
    authCancelEvt(){
      this.show=false;
    }

    /**合同图片加载事件 */
    imgOnLoad(){
      let self=this;
     
      //通过虚拟image获取height
      let img = new Image()
      img.src = this.options.contractPicUrl;
      img.onload = function () {
        let rawWidth = img.width;
        let rawHeight = img.height;
        //小于A4宽度时 说明出现这个bug了  合同图片默认宽度是A4宽 , 算出缩放后的比例 还原出合同原始宽高
        if (rawWidth < self.A4Info.width) {
          if(rawWidth == 538) rawWidth = 537.5;
          let contractScale = self.A4Info.width / rawWidth;
          self.contractImgSize = {
            width: self.A4Info.width,
            height: rawHeight * contractScale,
          };
        } else {
          self.contractImgSize ={
            width: rawWidth,
            height: rawHeight,
          };
        }
        
        self.contractZoomScale();
        self.contractZoomHeight=self.contractImgSize.height / self.contractZoomScaleValue //计算图片缩放后的高度
        self.contractPageNum=self.contractImgSize.height/self.A4Info.height //计算图片页数
      }

      
    }
    //缩放比例 (重要) 根据合同原始宽度 和手机 宽度比  contractImgSize.width / containerWith
    contractZoomScale() {
      this.contractZoomScaleValue=this.contractImgSize.width / this.containerWith;
    }

    /**印章加载处理事件 */
    sealOnLoad(){
      //印章大小
      this.sealSize={
        width: this.selfSign.sealWidth / this.contractZoomScaleValue *  this.selfSign.scale,
        height: this.selfSign.sealHeight / this.contractZoomScaleValue * this.selfSign.scale,
      }
      //根据接口数据重新计算缩放后的印章坐标
      let contractPageHeight=this.contractZoomHeight/this.contractPageNum
      this.sealPos={
        x:this.selfSign.xcode / this.contractZoomScaleValue,
        y:contractPageHeight*this.selfSign.signPage-(this.selfSign.ycode / this.contractZoomScaleValue)+14
      }
      //计算原始合同印章所在的位置
      this.contractRealPos={
        x:this.selfSign.xcode/this.contractZoomScaleValue,
        y:this.selfSign.ycode/this.contractZoomScaleValue,
        sealScale:this.selfSign.scale,
        realPage:this.selfSign.signPage
      }

      console.log("初始化印章坐标:"+this.sealPos)
     
    }

    /** ##########印章拖拽事件模块############# */
    gtouchstart(event: any) {
        this.flags = true
        var touch
        if (event.touches) {
            touch = event.touches[0]
        } else {
            touch = event
        }
        this.position.x = touch.pageX // 鼠标按下X坐标
        this.position.y = touch.pageY // 鼠标按下y坐标
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
            this.nx = touch.pageX - this.position.x // 计算鼠标在印章内x坐标位置
            this.ny = touch.pageY - this.position.y // 计算鼠标在印章内y坐标位置
            this.xPum = this.dx + this.nx // 计算印章拖拽X坐标位置
            let yPos: any = this.dy + this.ny // 计算印章拖拽y坐标位置
            // 添加限制：只允许在屏幕内拖动
            const maxWidth = this.$refs.contractPic.clientWidth - this.sealSize.width // 屏幕宽度减去印章宽高,系统框架1rem=75px
            const maxHeight = this.$refs.contractPic.clientHeight
            if (this.xPum < 0) {
                // 屏幕x限制
                this.xPum = 0
            } else if (this.xPum > maxWidth) {
                this.xPum = maxWidth
            }
            if (yPos <= maxHeight && yPos > 84) {
                this.yPum = this.dy + this.ny
            }
            this.sealPos={
              x:this.xPum,
              y:this.yPum
            }
            
            //计算印章在第几页
            let pageHeight=this.contractZoomHeight/this.contractPageNum
            let page = Math.ceil(((this.sealPos.y+this.sealSize.height)-84) / pageHeight);
            
            //计算原始合同印章所在的位置
            
            let realY =page* pageHeight-this.sealPos.y
            this.contractRealPos={
              x:this.sealPos.x*this.contractZoomScaleValue,
              y:realY*this.contractZoomScaleValue+38,
              sealScale:this.selfSign.scale,
              realPage:page
            }

            console.log(this.contractRealPos)

            // 阻止页面的滑动默认事件
            document.addEventListener(
                "touchmove",
                function() {
                    // 1.2 如果碰到滑动问题，请注意是否获取到 touchmove
                    event.stopPropagation() // 如果没有引入jq 就用 stopPropagation()
                },
                false
            )
        }
    }
    gtouchend(e: any) {
        this.flags = false
    }


    /** ##########获取数据相关业务逻辑模块############# */
    /**获取当前最新印章 */
    getCompSignature(){
      let that=this;
      this.$toast.loading({
          duration: 0,
          forbidClick: true,
          // mask: true,
          message: "加载中..."
      })
      let params={
        'financialProductId':this.options.financialProductId,
        'memberId': this.userInfoData.memberId,
        'organizationId': this.selfSign.organizationId,
      }
      ContractService.getCompSignature(params).then(res => {
            that.$toast.clear()
             let _res: any = res;
             if(!res.data || (!res.data.customerId && !res.data.sealUrl)){
                  that.$toast('没有印章');
                  this.signBtnStatus=false;
             }else{
                  this.signInfo = res.data
                  this.signBtnStatus=true;
             }
           
        }).catch(error => {
            that.$toast.clear()
            console.log("获取印章:"+error)
        })
    }
    
    /**获取合同签署历史信息 */
    getContractLog(){
      let that=this;
      this.$toast.loading({
          duration: 0,
          forbidClick: true,
          // mask: true,
          message: "加载中..."
      })
      let params={
         contractId: this.options.id,
      }
      ContractService.getContractLog(params).then(res => {
             that.$toast.clear()
             this.logInfo=res.data
        }).catch(error => {
            that.$toast.clear()
            console.log("获取合同历史签署信息:"+error)
        })
    }

    /**签署合同 */
    signContract(){
        let that=this;
        this.$toast.loading({
            duration: 0,
            forbidClick: true,
            // mask: true,
            message: "正在签署..."
        })
        let params={
          contractId: this.options.id,
          scale: this.contractRealPos.sealScale,
          signerId: this.userInfoData.memberId,
          // 后台签署服务，坐标不能为0
          xcode: this.contractRealPos.x||1,
          ycode: this.contractRealPos.y||1,
          signPage: this.contractRealPos.realPage,
          customerId: this.signInfo.customerId,
          sealFile: this.signInfo.sealUrl,
          //同一份合同个人/企业都能签署
          organizationId: this.userInfoData.organizationId||0,
          contractSignId:this.selfSign.id,
          // videoName:this.videoName
        }
        // ContractService.contractSign(params).then(res => {
        //     that.$store.commit("setContractId", this.options.id) //存取合同id
            that.$toast.clear()
            that.$router.replace({
                name: 'result',
                params: {
                    typeName: "checked",//1,操作成功 checked 2 操作失败 warning"
                    btnText:"查看合同",
                    linkUrl:'/contractDetail',
                    content: "电子合同与纸质合同具备同等的法律效力"//操作成功可不填,操作失败需要传入msg
                }
            })
          // }).catch(error => {
          //     that.$toast.clear()
          //     console.log("签署合同:"+error)
          // })
    }
    /**发送验证码 */
    sendCode(){
      let that=this;
      this.$toast.loading({
          duration: 0,
          forbidClick: true,
          // mask: true,
          message: "加载中..."
      })
      let params={
          contractId: this.options.id,
          signerId: this.userInfoData.memberId,
          type: 0, //0-短信，1-语音
          customerId: this.signInfo.customerId,
          organizationId: this.userInfoData.organizationId||0,
          contractSignId:this.selfSign.id
      }
      ContractService.sendVerCode(params).then(res => {
          that.$toast.clear()
          let s = 60;
          let fn = () => {
            that.codeTxt = s--;
            if (!this.codeTxt) {
              clearInterval(timer);
              this.codeTxt = '获取验证码';
            }
          };
          fn();
          let timer = setInterval(fn, 1000);
        }).catch(error => {
            that.$toast.clear()
            console.log("获取验证码:"+error)
        })
    }
    /**检查验证码接口 */
    checkVerCode(){
      let that=this;
      this.$toast.loading({
          duration: 0,
          forbidClick: true,
          // mask: true,
          message: "加载中..."
      })
      let params={
        captcha: this.messageCode,
        contractId: this.options.id,
        signerId: this.userInfoData.memberId,
        organizationId: this.userInfoData.organizationId||0,
        contractSignId:this.selfSign.id
      }
      ContractService.contractCheckMsg(params).then(res => {
          that.$toast.clear()
          that.signContract()
        }).catch(error => {
            that.$toast.clear()
            console.log("获取验证码:"+error)
        })
    }
}
</script>
<style lang="scss">
body{
  // overflow-y: hidden;
}
.contractSign {
  // position: relative;
  height: 100%;

  .pdfContainer {
    height: 100%;
    position: relative;
    // top: 150px;
    // overflow-y: auto;
    // margin-top:160px;
  }
  .dropDom {
    z-index: 110;
    border: 2px solid #46a316;
    .seal {
    }
  }
  .signOperation {
    width: 100%;
    margin: 15px 20px 15px 20px;
    position: fixed;
    bottom: 0;
    z-index: 101;
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
    z-index: 101;
    // text-align: center;
    .van-button {
      border-radius: 15px;
      height: 80px;
      width: 46%;
      font-size: 30px;
    }
    .refuse {
      border: 1px solid #c3a98b;
      color: #c3a98b;
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


