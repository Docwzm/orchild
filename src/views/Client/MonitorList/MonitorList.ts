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

    private onLoad () {
    }

    private created () {
        this.cameraList()
    }
    
    // 仓库列表
    private async warehouseList () {
        let params = {
            // businessNo: option.businessNo,
            // applierId: this.__app.data.userInfo.memberId,
            // applierOrgId: this.__app.data.orgId,
        }
        const { data } = await CategoryService.warehouseList(params)
        this.list = data
    }
    //监控列表
    private async cameraList () {
        let params = {
            warehouseId: 96
        }
        const { data } = await CategoryService.cameraList(params)
        this.list = data
        console.log( this.list , 22222)
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
