import {Vue,Component} from 'vue-property-decorator'
import LoadMore from "@/components/LoadMore/LoadMore.vue"
import {ContractService} from '@/api'
@Component({
  components: { LoadMore }
})
export default class ContractShow extends Vue {
    currentIndex:any=''
    mountSum:any=''
    page:any=1
    enableLoadMore:any=true
    currentOrganizationName:any=''
    listItem:Array<any>=['待办合同','已签合同']
    upComingContractListData:Array<any>=[]
    signContractListData:Array<any>=[]
    mounted() {
      this.contractList()
      this.signContractList()
      this.currentOrganizationName = this.$store.state.base.loginUserCurrentOrganization.organizationName
    }
    //切换tab栏
    handleContract(index:any){
      this.currentIndex=index
    }
    onLoadMore(done:any) {
      setTimeout(()=>{
          if(!this.enableLoadMore) {
              return
          }
          this.page = this.page + 1
          this.contractList();
          done();
      }, 200)
    }
    //待办合同数据
    async contractList() {
      let params = {
          signStatusIn: '10,11,12,25',
          returnSign: 1,
          pageNo:this.page,
          pageSize:10,
          signerId:this.$store.state.base.loginUserCurrentOrganization.memberId,
          organizationId:this.$store.state.base.loginUserCurrentOrganization.organizationId||0,
      }
      const {data} = await ContractService.upComingContractList(params)
      if(data.records.length < 10) {
        this.enableLoadMore = false
      }
      this.upComingContractListData = this.upComingContractListData.concat(data.records)
    }
    //获取已签合同数据
    async signContractList() {
      let params = {
        signStatusIn:"15",
        signerId:this.$store.state.base.loginUserCurrentOrganization.memberId,
        organizationId:this.$store.state.base.loginUserCurrentOrganization.organizationId||0,
      }
      const {data} = await ContractService.signedContractList(params)
      this.signContractListData = data
      let sum = 0 //合同总数
      this.signContractListData.forEach((v:any)=>{
         sum += Number(v.count)
      })
      this.mountSum = sum
    }
    //跳转合同签署页面
    goContractSign(item:any){
      this.$router.push({
        name: 'contractSign',
        params:item
      })
    }
    //跳转相关合同列表页面
    goContractDeatail(val:any){
      this.$router.push({
        path: 'myContract',
        query: {   
          templateId:val.templateId,
          templateName:val.templateName,
        }
      })
    }
}
