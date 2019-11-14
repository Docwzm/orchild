import { Component, Vue } from 'vue-property-decorator'
import Cell from '@/components/Cell/Cell.vue'
import { CategoryService } from '@/api'
@Component({
    components: {Cell}
})
export default class MonitorList extends Vue {
    list = []
    currentDate: any
    loading = false
    finished = false
    showTimeMask = false
    showVideo = false
    videoSrc = ''
    businessData = ''
    warehouseId = ''
    columnsData:any = [
        {id:101,text: '光谷金信'},
        {id:103,text: '熊文俊'}
    ]
    private onLoad () {
    }

    private created () {
        this.warehouseListData()
        this.cameraListData()
    }
    
    // 仓库列表
    private async warehouseListData () {
        let params = {
            businessNo: '201904170289637626',
            applierId: 96376,
            applierOrgId: 500271,
        }
        const { data } = await CategoryService.warehouseList(params)
        if(this.columnsData.length > 0 ){
            this.businessData = this.columnsData[0].text
            this.warehouseId = this.columnsData[0].id
        }
        console.log(this.columnsData)
    }
    //监听picker选择器
    private async onChange (val: any) {
        this.businessData = val.text
        this.warehouseId = val.id
        this.cameraListData()
    }
    //监控列表
    private async cameraListData () {
        let params = {
            warehouseId: 96
        }
        const { data } = await CategoryService.cameraList(params)
        this.list = data
    }

    //打开视频
    private async openVideo (item:any) {
        this.showVideo = true
        this.videoSrc = item.h5Url
    }
    //关闭视频
    private async closeVideo () {
        this.showVideo = !this.showVideo
    }
}
