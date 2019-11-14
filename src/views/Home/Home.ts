import { Component, Vue } from 'vue-property-decorator'
import { HomeService } from '@/api'
import Cell from '@/components/Cell/Cell.vue'

@Component({
    components: { Cell }
})
export default class Home extends Vue {
    loading = true
    productList = []
    columnsData: Array<any> = []
    organizationName = ""
    userDataList: any = {}
    isLogin = false
    created() {
        this.loading = false;
        this.userDataList = this.$store.state.base.loginUserInfo
        let orgInfo = this.$store.state.base.loginUserCurrentOrganization
        let orgList = this.$store.state.base.loginUserOrganizations
        orgList.slice().forEach((item: any, index: any) => {
            orgList[index].text = item.organizationName

        });
        this.columnsData = orgList
        //当大于0时默认赋值数组中第一个
        if (orgInfo) {
            // this.$store.commit("setOrgId", orgInfo.organizationId == undefined ? '' : orgInfo.organizationId)
            this.organizationName = orgInfo.organizationName == undefined ? '请选择' : orgInfo.organizationName
        }
        if (this.$utils.isLogin()) {
            this.$store.commit("setIsLogin", this.$utils.isLogin())
            this.getPersonalCentreInfo()
        }
    }
    mounted() {
        this.getProductList()

    }
    onChange(value: any) {
        this.organizationName = value.organizationName
        //设置全局机构id
        // this.$store.commit("setOrgId", value.organizationId)
        //存储当前切换的机构或者个人
        this.$store.commit('setLoginUserCurrentOrganization', value)
        this.getProductList()
    }
    rightLogin() {
        this.$router.push('/login')
    }

    approveEvt(item: any) {
        let query = {
            memberId: this.$store.state.base.loginUserCurrentOrganization.memberId,
            orgId: this.$store.state.base.loginUserCurrentOrganization.organizationId,
            productId: item.id,   // item.id
        }
        HomeService.creditApply(query).then(res => {
            let _res: any = res
            if (_res.code == "200" || _res.code == 200) {
                let params: any = {
                    key: "pageParams",
                    id: item.id,
                    name: item.name,
                    publicityPhotos: item.publicityPhotos,
                    quotaStart: item.quotaStart || 0,
                    quotaEnd: item.quotaEnd || 0
                }
                this.$store.commit("changeState", params)
                this.$router.push('/creditApplication')
            } else if (_res.code == 1016004) {
                this.$router.push("/category")
            }
        })

    }

    getProductList() {
        let that = this;
        let currentOrg = this.$store.state.base.loginUserCurrentOrganization
        let params = {}
        if (this.$utils.isLogin()) {
            let areaId = [currentOrg.province, currentOrg.city, currentOrg.area].filter(item => !!item).join(',');
            params = {
                memberId: currentOrg.memberId,
                areaId: areaId,
                orgId: currentOrg.organizationId == undefined ? '' : currentOrg.organizationId
            }
        } else {
            params = {
                areaId: 0,
            };
        }
        HomeService.productList(params).then(res => {
            that.productList = res.data
        })

    }

    getPersonalCentreInfo() {
        let currentOrg = this.$store.state.base.loginUserCurrentOrganization
        let params = {
            // token: "YmY2OTU2ZTEtNDA5ZC00NzcwLTlkOGEtYTdmYjBmYTdkODI0",
            orgId: currentOrg.organizationId == undefined ? '' : currentOrg.organizationId,
            appName: "jinxin_mini_test",
        }
        this.$store.dispatch('getPersonalCentreInfo', params);
    }
}
