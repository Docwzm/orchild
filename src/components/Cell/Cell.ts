/**
 * 单元格
 * @desc 单元格【带选择下拉框】
 * @author hqx
 * @time 2019/11/8
 */

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class Cell extends Vue {
    @Prop() private title: any;
    @Prop() private value: any;
    @Prop() private leftIcon: any;

    showPicker: any = false
    columns: any = []

    private chooseValueEvt () {
        this.showPicker = true
    }
    private onConfirm () {

    }
}
