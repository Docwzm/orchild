import { Component, Vue, Prop } from 'vue-property-decorator'
import JXCircle from '@/components/JXCircle/JXCircle.vue';

@Component({
    components: {
        JXCircle
    }
})
export default class Loan extends Vue {
    show = false;
    dateShow = false;
    value = "";
    currentDate = "";

    mounted() {
        setTimeout(() => {
            ['input', 'textarea'].includes(e.target.localName) && document.body.scrollIntoView(false)
          }, 500)
    }
}