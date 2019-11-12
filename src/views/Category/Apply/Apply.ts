import { Component, Vue } from 'vue-property-decorator';
import JXCircle from '@/components/JXCircle/JXCircle.vue';

@Component({
    components: { JXCircle}
})
export default class Apply extends Vue {
    value = 0;
    currentRate = 60;
    gradientColor = {
        '0%': '#F77321',
        '100%': '#FAD45E'
    };
    get text() {
        return this.currentRate.toFixed(0) + '%'
    }
}
