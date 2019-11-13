import { Component, Vue, Prop } from 'vue-property-decorator'
import JXCircle from '@/components/JXCircle/JXCircle.vue';

@Component({
    components: {
        JXCircle
    }
})
export default class Refound extends Vue {
    show = false;
    dateShow = false;
    value = "";
    currentDate = "";
}