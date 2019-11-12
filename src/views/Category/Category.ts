import { Component, Vue } from 'vue-property-decorator';
import JXCircle from '@/components/JXCircle/JXCircle.vue';
import Cell from '@/components/Cell/Cell';

@Component({
    components: { JXCircle, Cell }
})
export default class Category extends Vue {
    value = 0;
    currentRate = 60;
    gradientColor = {
        '0%': '#F77321',
        '100%': '#FAD45E'
    };
    option = [
        { text: '全部商品士大夫撒地方', value: 0 },
        { text: '新款商品撒打发斯蒂芬', value: 1 },
        { text: '活动商品撒的发生的', value: 2 }
    ]

    get text() {
        return this.currentRate.toFixed(0) + '%'
    }

    lookLog() {
        this.$router.push({ name: "BusinessList" });
    }
    onChange(picker: any, value: any, index: any) {
    }
    apply() {
        this.$router.push("/apply")
    }
}
