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
      console.log(this.$route.params.totalWidth,this.$route.params.totalHeight)
      this.options = this.$route.params
      this.contractSignList = this.$route.params.contractSignList
      this.slideData.push({
        src: this.$route.params.contractPicUrl,
        msrc:this.$route.params.contractPicUrl,
        w: this.$route.params.totalWidth,
        h: this.$route.params.totalHeight,
      })
      this.contractLog()
    }
    //我的合同记录
    private async contractLog() {
      let params = {
         contractId: this.options.contractId,
      }
      const {data} = await ContractService.getContractLog(params)
      this.contractlogData =  data
    }
    handleClose () {
      console.log('close event')
    }
}
