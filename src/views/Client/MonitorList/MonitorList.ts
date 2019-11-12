import { Component, Vue } from 'vue-property-decorator'
import Cell from '@/components/Cell/Cell.vue'
import { CategoryService } from '@/api'
@Component({
    components: {Cell}
})
export default class MonitorList extends Vue {
    list = [
        {name:'摄像头4',no:444,tip:'牛板筋',num:'100件',id:1,src:'http://vd2.bdstatic.com/mda-jihkiewwck6z0sja/sc/mda-jihkiewwck6z0sja.mp4'}
    ]
    currentDate: any
    loading = false
    finished = false
    showTimeMask = false
    showVideo = false
    videoSrc = ''

    private onLoad () {
        console.log(11111)
    }

    private created () {
        console.log(22222)
    }

    private async openVideo (item) {
        this.showVideo = true
        this.videoSrc = item.src
    }
    private async closeVideo () {
        this.showVideo = !this.showVideo
    }
}
