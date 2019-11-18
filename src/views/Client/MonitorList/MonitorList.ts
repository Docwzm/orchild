import { Component, Vue } from 'vue-property-decorator'
import Cell from '@/components/Cell/Cell.vue'
import { CategoryService } from '@/api'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import 'videojs-contrib-hls'

@Component({
    components: { Cell }
})

export default class MonitorList extends Vue {
    list = []
    currentDate: any
    loading = false
    finished = false
    showTimeMask = false
    showVideo = false
    videoSrc = ''
    businessDataText:any = ""
    warehouseId = ''
    videoObj = ''
    businessNo:any=''
    columnsData: any = []
    created() {
    }
    mounted() {
        this.businessNo = this.$route.query.businessNo
        this.warehouseListData(this.businessNo)
    }
    // 仓库列表
    private async warehouseListData(val:any) {
        let params = {
            businessNo: '201904170289637626',
            applierId: 500271,
            applierOrgId: 96376,
            // businessNo:val 
            // applierId: this.$store.state.base.loginUserCurrentOrganization.memberId,
            // applierOrgId: this.$store.state.base.loginUserCurrentOrganization.organizationId,
        }
        const result = await CategoryService.warehouseList(params)
        this.columnsData = result.data
        this.columnsData.forEach((v:any) => {
            v.text = v.warehouseName
        })
        if (this.columnsData.length > 0) {
            this.businessDataText = this.columnsData[0].text
            this.warehouseId = this.columnsData[0].warehouseId
            this.cameraListData()
        }
    }
    //监听picker选择器
    onChange(val: any) {
        this.businessDataText = val.text
        this.warehouseId = val.id
        this.cameraListData()
    }
    //监控列表
    private async cameraListData() {
        let params = {
            warehouseId: 96
            // warehouseId: this.warehouseId
        }
        const { data } = await CategoryService.cameraList(params)
        this.list = data
    }
    //打开视频
    openVideo(item: any) {
        this.showVideo = true
        this.videoSrc = item.pcUrl
    }

    loadstart() {
        (videojs as any)('myVideo', {
            preload: 'none',
            bigPlayButton: true,
            textTrackDisplay: true,
            posterImage: true,
            errorDisplay: true
        });
    }

    //关闭视频
    closeVideo() {
        this.showVideo = !this.showVideo
    }
}
