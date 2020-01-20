import { Component, Vue } from 'vue-property-decorator'
import ListItem from '@/components/ListItem/ListItem.vue'
import TextSearch from '@/components/TextSearch/TextSearch.vue'
import FieldPicker from '@/components/FieldPicker/FieldPicker.vue'
import { CategoryService } from '@/api'
@Component({
    components: { TextSearch, FieldPicker }
})
export default class CreditApplication extends Vue {
    placeholderText: any = '';
    labelText: any = '请选择产品';
    list = []
    columns: Array<any> = []
    showPicker: any = false
    currentDate: any
    finished = false
    showTimeMask = false
    loading = false
    value: any = ''
    categoryId = ''
    warehouseId: any = '' //仓库id
    productId: any = ''   // 产品id
    categoryData: any = []     // 分类数据
    options: any = {}
    onLoad() {
    }
    mounted() {
        this.options = this.$route.query
        this.InventoryTree()
        this.inventoryList()
    }

    InventoryTree() {
        let that = this
        let params = {
            categoryId: -1,
            storeStatus: 3,
            productId: this.options.productId,
            warehouseId: this.options.warehouseId,
            customerId: this.$store.state.base.loginUserCurrentOrganization.memberId,
            orgId: this.$store.state.base.loginUserCurrentOrganization.organizationId
        }
        CategoryService.inventoryTree(params).then(res => {
            if (res.data.length > 0) {
                that.categoryData = res.data
                that.columns = [{ values: this.categoryData, className: 'column1' }, { values: this.categoryData[0].subList, className: 'column2', defaultIndex: 0 }]
            }

        })
    }

    private async inventoryList() {
        let params = {
            categoryId: this.categoryId,
            productId: this.options.productId,
            warehouseId: this.options.warehouseId,
            customerId: this.$store.state.base.loginUserCurrentOrganization.memberId,
            orgId: this.$store.state.base.loginUserCurrentOrganization.organizationId,
        }
        const { data } = await CategoryService.inventoryList(params)
        this.list = data
        this.loading = false
        this.finished = true
    }

    blurInputHandle(val: string) {
        this.categoryId = val;
        this.inventoryList()
    }

    onChange(picker: any, values: any) {
        picker.setColumnValues(1, values[0].subList)
    }

    onConfirm(value: any) {
        this.value = value[0].name + "/" + value[1].name
        this.categoryId = value[1].id
        this.showPicker = false
        this.inventoryList()
    }
}
