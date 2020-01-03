import {Vue,Component} from 'vue-property-decorator'
import {ContractService} from '@/api'
@Component
export default class MyContract extends Vue {
    contractListData:Array<any>=[]
    options: any = {}
    mounted() {
      //获取页面传参
      this.options = this.$route.query
      this.contractList()
    }
    //我的相关合同列表数据
    private async contractList() {
      let params = {
        templateId: this.options.templateId,
        signStatus: 15,
        returnSign: 1,
        pageSize: 100,
        signerId: this.$store.state.base.loginUserCurrentOrganization.memberId,
        organizationId:this.$store.state.base.loginUserCurrentOrganization.organizationId||0,
      }
      const {data} = await ContractService.upComingContractList(params)
      this.contractListData = data.records.reduce((v:any, item:any) => {
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
    //跳转合同详情页面
    goContractDeatail(val:any){
      console.log(val,'ppppppp')
      this.$router.push({
        name: 'contractDetail',
        params: {   
          contractId:val.id,
          code:val.businessCode,
          createTime:val.createTime,
          updatedTime:val.updatedTime,
          createName:val.createName,
          statusName:val.statusName,
          name:val.name,
          contractPicUrl:val.contractPicUrl,
          contractSignList:val.contractSignList,
        }
      })
    }
}
