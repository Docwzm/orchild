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
    list = [
        { time: '牛腱', id: 1, tip: '牛板筋', num: '100件' },
        { time: '牛腱', id: 2, tip: '牛板筋', num: '100件' }
    ]
    citys:any = {
        '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        '福建': ['福州', '厦门', '莆田', '三明', '泉州']
    }
    columns =  [
        { values: Object.keys(this.citys), className: 'column1'},
        { values: this.citys['浙江'], className: 'column2', defaultIndex: 2}
    ]
    showPicker: any = false
    currentDate: any
    loading = false
    finished = false
    showTimeMask = false
    value: any = '' 
    categoryId=''
    private onLoad () {
        //this.InventoryTree()
    }
    private async InventoryTree () {
        let params = {
            warehouseId: '',
            productId: '',
            categoryId:-1,
            storeStatus:3,
            orgId:'',
            customerId:''
        }
        const { data } = await CategoryService.inventoryTree(params)
        console.log(data,11222)
    }
    private async inventoryList () {
        let params = {
            warehouseId: '',
            productId:'',
            categoryId: '',
            orgId:'',
            customerId:''
        }
        const { data } = await CategoryService.inventoryList(params)
        console.log(data,11222)
    }
    private searchInputHandle (val:string) {
        this.categoryId = val;
        this.inventoryList()
        // console.log('input:', val)
    }
    private async onChange (picker:any, values:any) {
        picker.setColumnValues(1, this.citys[values[0]])
    }

    private onConfirm (value: any) {
        this.value = value
        this.showPicker = false
    }
    
}
