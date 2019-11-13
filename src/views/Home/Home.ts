import { Component, Vue } from 'vue-property-decorator'
import { HomeService } from '@/api'
import Cell from '@/components/Cell/Cell.vue'

@Component({
    components: { Cell }
})
export default class Home extends Vue {
    loading = true
    productList = []
    created() {
        this.loading = false
    }
    mounted() {
        this.getProductList()
    }

    approveEvt(item: any) {
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
        // this.$router.push({
        //     name: 'creditApplication',
        //     params: {
        //         id: item.id,
        //         name: item.name,
        //         publicityPhotos: item.publicityPhotos,
        //         quotaStart: item.quotaStart || 0,
        //         quotaEnd: item.quotaEnd || 0
        //     }
        // })
    }

    async getProductList() {
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
