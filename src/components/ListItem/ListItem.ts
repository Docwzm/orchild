import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class ListItem extends Vue {
    @Prop() private itemData:any;
    @Prop() private headText:any;
    @Prop() private conText1:any;
    @Prop() private conText2:any;
    @Prop() private conText3:any;
    @Prop() private listItemClick:any;
    @Prop() private iconStr:any;
    @Prop() private statusStr:any;

    private onLoad () {

    }

    private itemClick () {
        this.$emit('listItemClick', this.itemData)
    }
}
