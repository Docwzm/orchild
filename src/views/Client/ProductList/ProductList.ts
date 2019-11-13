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

    productList:any = {
        '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        '福建': ['福州', '厦门', '莆田', '三明', '泉州']
    }
    columns =  [
        { values: Object.keys(this.productList), className: 'column1'},
        { values: this.productList['福建'], className: 'column2', defaultIndex: 2}
    ]
    showPicker: any = false

    currentDate: any
    loading = false
    finished = false
    showTimeMask = false
    value: any = '' 
    categoryId=''
    warehouseId: any =  '' //仓库id
    productId: any = ''   // 产品id

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
        }
        let result  = await CategoryService.inventoryTree(params)
        // this.citys = (result.data || []).map( item => {
        //     return {
        //         value: item.id,
        //         label: item.name,
        //         list: item.subList.map(({id, name}) => ({value: id, label: name}))
        //     }
        // });
        console.log(result,11222)
    }

    private async inventoryList () {
        let params = {
            warehouseId:155,
            productId: 28,
            categoryId:21638,
            orgId:96376,
            customerId:''
        }
        const { data } = await CategoryService.inventoryList(params)
        this.list = data
    }

    private blurInputHandle (val:string) {
        this.categoryId = val;
        this.inventoryList()
    }

    private async onChange (picker:any, values:any) {
        picker.setColumnValues(1, this.productList[values[0]])
    }

    private onConfirm (value: any) {
        this.value = value
        this.showPicker = false
    }
    
}
