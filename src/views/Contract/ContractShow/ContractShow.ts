import {Vue,Component} from 'vue-property-decorator'
import {ContractService} from '@/api'
@Component
export default class ContractShow extends Vue {
    currentIndex:any=''
    mountSum:any=''
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
    //待办合同数据
    private async contractList() {
      let params = {
        signStatusIn:"15",
        signerId:this.$store.state.base.loginUserCurrentOrganization.memberId,
        organizationId:this.$store.state.base.loginUserCurrentOrganization.organizationId||0,
      }
      const {data} = await ContractService.upComingContractList(params)
      this.upComingContractListData = data.records.reduce((v:any, item:any) => {
        if (item.createShortTime){
          let tar = v[item.createShortTime];
          if (tar) {
            tar.push(item)
          }else{
            v[item.createShortTime] = [item];
          }
        }
        return v;
      }, {})
    }
    //获取已签合同数据
    private async signContractList() {
      let params = {
          signStatusIn: '10,11,12,25',
          returnSign: 1,
          pageSize: 100,
          signerId:this.$store.state.base.loginUserCurrentOrganization.memberId,
          organizationId:this.$store.state.base.loginUserCurrentOrganization.organizationId||0,
      }
      const {data} = await ContractService.signedContractList(params)
      data.forEach((v:any)=>{
         this.mountSum += v.count*1
      },0)
      this.signContractListData = data
      console.log( this.signContractListData,'ppppp')
    }
    //跳转合同签署页面
    goContractSign(){
      this.$router.push({
        name: 'contractSign',
        params: {   
         
        }
      })
    }
    //跳转相关合同列表页面
    goContractDeatail(val:any){
      this.$router.push({
        name: 'myContract',
        params: {   
          templateId:val.templateId,
          templateName:val.templateName
        }
      })
    }
}
