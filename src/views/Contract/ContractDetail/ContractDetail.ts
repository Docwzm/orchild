import {Vue,Component} from 'vue-property-decorator'
import JXContractInfo from "@/components/JXContractInfo/JXContractInfo.vue"
import {ContractService} from '@/api'
@Component({
  components: { JXContractInfo }
})
export default class ContractDetail extends Vue {
    contractlogData:Array<any>=[]
    contractSignList:any=[]
    slideData:any= []
    options:any = {}
    mounted() {
      this.contractLog()  
      this.getOneDetail()
    }
    //我的合同记录
    private async contractLog() {
      let params = {
         contractId: this.$store.state.base.contractId,
      }
      const {data} = await ContractService.getContractLog(params)
      this.contractlogData =  data
    }
    //拉取合同详情
    async getOneDetail() {
      let self=this;
      let params = {
        id:this.$store.state.base.contractId,
        returnLog: 1,
        returnSign: 1,
      }
      const {data} = await ContractService.contractDetail(params)
      this.options = {
        code:data.businessCode,
        createTime:data.createTime,
        updatedTime:data.updatedTime,
        createName:data.createName,
        statusName:data.statusName,
        name:data.name,
        contractSignList:data.contractSignList
      }
      let img = new Image()
      img.src = data.contractPicUrl
      img.onload = function() {
        let rawWidth = img.width
        let rawHeight = img.height
        self.slideData.push({
          src: data.contractPicUrl,
          msrc:data.contractPicUrl,
          w: data.width,
          h: rawHeight,
        })
      }
      
    }
    handleClose () {
      console.log('close event')
    }
}
