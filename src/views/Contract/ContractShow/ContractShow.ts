import {Vue,Component} from 'vue-property-decorator'
import {ContractService} from '@/api'
@Component
export default class ContractShow extends Vue {
    currentIndex:any=''
    listItem:Array<any>=['待办合同','已签合同']
    upComingContractListData:Array<any>=[]
    signContractListData:Array<any>=[]
    mounted() {
      this.contractList()
      this.signContractList()
    }
    //切换tab栏
    handleContract(index:any){
      this.currentIndex=index
    }
    //初始化已签合同数据
    private async contractList() {
      let params = {
        signStatusIn:"15",
        signerId:this.$store.state.base.loginUserCurrentOrganization.memberId,
        organizationId:this.$store.state.base.loginUserCurrentOrganization.organizationId||0,
      }
      const {data} = await ContractService.upComingContractList(params)
      console.log(data.records,'000-000')
      this.upComingContractListData = data.records.reduce((acc:any, item:any) => {
        if (item.createShortTime) {
          let tar = acc[item.createShortTime];
          if(item.contractSignList){
            item.contractSignList.forEach((it:any,index:any)=>{
              if (it.signerId == this.$store.state.base.loginUserCurrentOrganization.memberId) {
                  // 待办                    
                  if(this.currentIndex==0&&[10, 11, 12,25].includes(it.signStatus)){
                      item._signStatusName = it.signStatusName                    
                      return false;
                  }
                  // 已办  
                  if(this.currentIndex==1&&[15].includes(it.signStatus)){
                      item._signStatusName = it.signStatusName
                      return false;
                  } 
              }
            })
          }
          if (tar) {
            tar.push(item)
          }else{
            acc[item.createShortTime] = [item]
          }
        }
        return acc;
      }, {})
      console.log(this.upComingContractListData,88888)
    }
    //获取待办合同数据
    private async signContractList() {
      let params = {
          signStatusIn: '10,11,12,25',
          returnSign: 1,
          pageSize: 100,
          signerId:this.$store.state.base.loginUserCurrentOrganization.memberId,
          organizationId:this.$store.state.base.loginUserCurrentOrganization.organizationId||0,
      }
      const {data} = await ContractService.signedContractList(params)
      console.log( this.signContractListData,'ppppp')
    }
}
