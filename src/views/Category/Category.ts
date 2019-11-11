import { Component, Vue } from 'vue-property-decorator'
import IncCircle from '@/components/IncCircle/IncCircle.vue';


@Component({

})
export default class Category extends Vue {
    value = 0;
    currentRate = 60;
    gradientColor = "#F89B3A";
    option = [
        { text: '全部商品士大夫撒地方阿斯顿发送到', value: 0 },
        { text: '新款商品撒打发斯蒂芬', value: 1 },
        { text: '活动商品撒的发生的', value: 2 }
    ]

    get text() {
        return this.currentRate.toFixed(0) + '%'
    }

    lookLog() {
        this.$router.push({name:"BusinessList"});
    }

    bindPickerChange(e: Number) {
        console.log(typeof e);

    }

    created() {
        
    }
}
