import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class GridMenu extends Vue {
    @Prop() private gridMenuData:any;
    @Prop() private menuSkipHandle:any;

    private menuClick (item:any) {
        this.$emit('menuSkipHandle', item)
    }
}
