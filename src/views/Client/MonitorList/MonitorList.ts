import { Component, Vue } from 'vue-property-decorator'
import Cell from '@/components/Cell/Cell.vue'
import { CategoryService } from '@/api'
// import 'video.js/dist/video-js.css'
// import videojs from 'video.js'
// import 'videojs-contrib-hls'
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
    columnsData:any = []
    private onLoad () {
        // videojs('my-video', {
        //     bigPlayButton: false,
        //     textTrackDisplay: false,
        //     posterImage: true,
        //     errorDisplay: false,
        //     controlBar: true
        //     }, function () {
        //         this.play()
        // })
    }

    private created () {
        this.warehouseListData()
    }
    
    // 仓库列表
    private async warehouseListData () {
        let params = {
            businessNo: '201904170289637626',
            applierId: 500271,
            applierOrgId: 96376,
        }
        const result  = await CategoryService.warehouseList(params)
        this.columnsData = result.data
        this.columnsData.forEach(v => {
            v.text = v.warehouseName
        })
        if(this.columnsData.length > 0 ){
            this.businessData = this.columnsData[0].warehouseName
            this.warehouseId = this.columnsData[0].warehouseId
            this.cameraListData()
        }
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
            warehouseId:96
        }
        const { data } = await CategoryService.cameraList(params)
        this.list = data
    }

    //打开视频
    private async openVideo (item:any) {
        this.showVideo = true
        this.videoSrc = item.pcUrl
    }
    //关闭视频
    private async closeVideo () {
        this.showVideo = !this.showVideo
    }
}
