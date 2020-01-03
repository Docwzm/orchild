import {Vue,Component} from 'vue-property-decorator'
import JXContractInfo from "@/components/JXContractInfo/JXContractInfo.vue"
import {ContractService} from '@/api'
@Component({
  components: { JXContractInfo }
})
export default class MyContract extends Vue {
    contractlogData:Array<any>=[]
    contractSignList:any=[]
    slideData:any= []
    options:any = {}
    mounted() {
      //获取页面传参
      this.options = this.$route.params
      this.contractSignList = this.$route.params.contractSignList
      this.slideData.push({
        src: this.$route.params.contractPicUrl,
        msrc:this.$route.params.contractPicUrl,
        w: 1000,
        h: 20000,
      })
      this.contractLog()
      // this.contractDetail()
    }
    //我的合同记录
    private async contractLog() {
      let params = {
         contractId: this.options.contractId,
      }
      const {data} = await ContractService.getContractLog(params)
      this.contractlogData =  data
    }
    //我的合同详情
    private async contractDetail() {
      let params = {
        id:this.options.contractId,
        returnLog: 1,
        returnSign: 1,
      }
      const {data} = await ContractService.contractDetail(params)
      console.log(data,999999)
    }
    handleClose () {
      console.log('close event')
    }
}
