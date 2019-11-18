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
        this.businessDataText=null
    }
    mounted() {
        this.businessNo = this.$route.query.businessNo
        this.warehouseListData(this.businessNo)
    }
    // 仓库列表
    private async warehouseListData(val:any) {
        let params = {
            businessNo:val,
            applierId: this.$store.state.base.loginUserCurrentOrganization.memberId,
            applierOrgId: this.$store.state.base.loginUserCurrentOrganization.organizationId,
        }
        const result = await CategoryService.warehouseList(params)
        result.data.forEach((v:any) => {
            v.text = v.warehouseName
        })
        this.columnsData = result.data
        if (this.columnsData.length >= 0) {
            this.businessDataText = this.columnsData[0].text
            this.warehouseId = this.columnsData[0].warehouseId
            this.cameraListData()
        }
    }
    //监听picker选择器
    onChange(val: any) {
        this.warehouseId = val.warehouseId
        this.cameraListData()
    }
    //监控列表
    private async cameraListData() {
        let params = {
            warehouseId: this.warehouseId
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
