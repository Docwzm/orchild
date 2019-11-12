import { Component, Vue } from 'vue-property-decorator'
import { HomeService } from '@/api'
import Cell from '@/components/Cell/Cell.vue'

@Component({
    components: { Cell }
})
export default class Home extends Vue {
    loading = true
    productList = []
    created () {
        this.loading = false
    }
    mounted () {
        this.getProductList()
    }

    approveEvt () {
        this.$router.push('/creditApplication')
    }

    async getProductList () {
        let parmas = {
            memberId: 500288,
            memberName: '危诛甫',
            organizationName: '危诛甫',
            country: '141',
            province: '370000',
            city: '370100',
            area: '',
            mobile: '18933098907',
            nature: '1',
            isCredit: 1,
            areaId: '370000,370100',
            orgId: ''
        }
        const { data } = await HomeService.productList(parmas)
        this.productList = data
    }
}