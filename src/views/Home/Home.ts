import { Component, Vue } from 'vue-property-decorator'
import { HomeService, UserService } from '@/api'
import Cell from '@/components/Cell/Cell.vue'

@Component({
    components: { Cell }
})
export default class Home extends Vue {
    userloading = true
    proloading = true
    productList = []
    columnsData: Array<any> = []
    organizationName = ""
    userDataList: any = {}
    isLogin = false
    storeLoginUserInfo: any

    created() {
        console.log("appName:", this.$constants.appName)
        // debugger
        this.userloading = false;
        // 是否存在用户对象判断是否登录
        if (this.$store.getters.isLogin) {
            this.initPageData()
        } else {
            // 根据openId自动登录
            this.storeLoginUserInfo().then(() => {
                console.log("已经登录")
                this.initPageData()
            })
        }
    }
    mounted() {
        this.getProductList()
    }
    onChange(value: any) {
        this.organizationName = value.organizationName
        //存储当前切换的机构或者个人
        this.$store.commit('setLoginUserCurrentOrganization', value)
        this.getProductList()
        this.getPersonalCentreInfo()

        // 如果是机构   等后端重新开个设置默认机构的接口再放开
        // if(value.organizationId){
        //     this.setDefaultOrg(value)
        // }
    }
    // 设置默认机构
    setDefaultOrg(orgObj: any) {
        const params = {
            type: 1,
            resouce: 2,
            userId: this.$store.getters.loginUserInfo.userId,
            defaultId: orgObj.memberId,
            defaultOrgId: orgObj.organizationId
        }
        UserService.setDefaultOrg(params).then(res => {
        })
    }
    rightLogin() {
        this.$router.push('/login')
    }

    initPageData() {
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
        this.getPersonalCentreInfo()
    }

    approveEvt(item: any) {
        if (!this.$store.getters.isLogin) {
            this.$router.push('/login');
            return;
        }
        let query = {
            memberId: this.$store.state.base.loginUserCurrentOrganization.memberId,
            orgId: this.$store.state.base.loginUserCurrentOrganization.organizationId,
            productId: item.id,   // item.id
        }
        HomeService.creditApply(query).then(res => {
            let _res: any = res
            let params: any = {
                key: "pageParams",
                id: item.id,
                name: item.name,
                publicityPhotos: item.publicityPhotos,
                quotaStart: item.quotaStart || 0,
                quotaEnd: item.quotaEnd || 0,
                businessNo: _res.data.businessNo
            }
            this.$store.commit("changeState", params)
            this.$router.push('/creditApplication')

        }).catch(error => {
            if (error.code == 1016004) {
                this.$router.push("/category")
            }
        })

    }

    getProductList() {
        let that = this;
        let currentOrg = this.$store.state.base.loginUserCurrentOrganization
        let params = {}
        if (this.$store.getters.isLogin) {
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
            that.proloading = false
        }).catch(error => {
            that.proloading = false
        })

    }

    getPersonalCentreInfo() {
        let currentOrg = this.$store.state.base.loginUserCurrentOrganization
        let params = {
            token: localStorage.getItem('token'),
            orgId: currentOrg.organizationId == undefined ? '' : currentOrg.organizationId,
            appName: this.$constants.appName,
        }
        this.$store.dispatch('getPersonalCentreInfo', params);
    }
}
