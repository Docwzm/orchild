import { Component, Vue } from 'vue-property-decorator'
import ListItem from '@/components/ListItem/ListItem.vue'
import TextSearch from '@/components/TextSearch/TextSearch.vue'
import FieldPicker from '@/components/FieldPicker/FieldPicker.vue'
import { CategoryService } from '@/api'
@Component({
    components: { TextSearch, ListItem, FieldPicker }
})
export default class CreditApplication extends Vue {
    placeholderText: any='';
    labelText:any='请选择产品';
    list = []
    // productList:any = {'浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'], '福建': ['福州', '厦门', '莆田', '三明', '泉州']}
    // columns= [{values: Object.keys(this.productList),className: 'column1'},{ values:this.productList['福建'], className: 'column2', defaultIndex: 2}]
    columns:Array<any>= []
    showPicker: any = false
    currentDate: any
    finished = false
    showTimeMask = false
    value: any = '' 
    categoryId=''
    warehouseId: any =  '' //仓库id
    productId: any = ''   // 产品id
    categoryData:any=[]     // 分类数据

    private onLoad () {
        //获取路由后面的参数
        // this.warehouseId = this.$route.query.warehouseId
        // this.productId = this.$route.query.productId
        this.InventoryTree()
        this.inventoryList()
    }

    private async InventoryTree () {
        let params = {
            warehouseId: 155,
            productId: 28,
            categoryId:-1,
            storeStatus:3,
            orgId:96376,
            customerId:''
            // memberId: this.$store.state.base.loginUserCurrentOrganization.memberId,
            // orgId: this.$store.state.base.loginUserCurrentOrganization.organizationId,
        }
        let result  = await CategoryService.inventoryTree(params)
        this.categoryData = result.data
        this.columns= [{values:this.categoryData,className: 'column1'},{ values:this.categoryData[0].subList, className: 'column2', defaultIndex: 0}]
        console.log(result,11222)
    }

    private async inventoryList () {
        let params = {
            warehouseId:155,
            productId: 28,
            categoryId:this.categoryId,
            orgId:96376,
            customerId:''
            // customerId: this.$store.state.base.loginUserCurrentOrganization.memberId,
            // orgId: this.$store.state.base.loginUserCurrentOrganization.organizationId,
        }
        const { data } = await CategoryService.inventoryList(params)
        this.list = data
        this.finished = true
    }

    private blurInputHandle (val:string) {
        this.categoryId = val;
        this.inventoryList()
    }

    private async onChange (picker:any, values:any) {
        console.log("values:",values)
        picker.setColumnValues(1, values[0].subList)
    }

    private onConfirm (value: any) {
        console.log("value12:",value)
        this.value = value[0].name+  "/"+   value[1].name
        this.categoryId = value[1].id
        this.inventoryList()
        this.showPicker = false
    }
}
