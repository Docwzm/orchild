import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class IncCircle extends Vue {
    @Prop() private rate:any;
    @Prop() private speed:any;
    @Prop() private text:any;
    @Prop() private currentRate:any;
    @Prop() private strokeWidth:any;
}
