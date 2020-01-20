import { Component, Vue, Prop,Watch } from 'vue-property-decorator'

@Component({})
export default class LoadMore extends Vue {
    @Prop() private enableLoadMore:any
    @Prop() private onLoadMore:any
    loadMoreText= "上拉加载更多"
    startX:any=0
    startY:any=0
    isLoading=false
    created () {
        console.log(this.$route.meta.title)
    }
    touchStart(e:any) {
        this.startY = e.targetTouches[0].pageY;
        this.startX = e.targetTouches[0].pageX;
    }
    scrollToEnd(e:any) {
        let scrollHeight = this.$el.scrollHeight; 
        let clientHeight = this.$el.clientHeight; 
        let scrollTop = this.$el.scrollTop;  
        if (scrollTop + clientHeight >= scrollHeight || this.enableLoadMore) {
            this.doLoadMore()  
        } 
    }
    touchEnd(e:any) {
        if (this.isLoading) {
            return;
        }
        let endX = e.changedTouches[0].pageX
        let endY = e.changedTouches[0].pageY
        let dy = this.startY - endY
        let dx = endX - this.startX
        if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
            return;
        }
        if (endY < this.startY) {
            this.scrollToEnd(e)
        }
    }
    doLoadMore() {
        this.isLoading = true
        this.loadMoreText = '加载中...'
        this.onLoadMore(this.loadDone);
    }
    loadDone() {
        this.isLoading = false
        this.loadMoreText = '上拉加载更多'
    }
}



