import {Vue,Component} from 'vue-property-decorator'
import JXContractInfo from "@/components/JXContractInfo/JXContractInfo.vue"
import {ContractService} from '@/api'
@Component({
  components: { JXContractInfo }
})
export default class MyContract extends Vue {
    contractListData:Array<any>=[]
    options: any = {}
    mounted() {
      //获取页面传参
      // this.options = this.$route.params
      // console.log(this.options,'llllllllll')
      // this.contractList()
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
      this.$router.push({
        name: 'contractOrder',
        params: {   
          templateId:val.templateId
        }
      })
    }
}
