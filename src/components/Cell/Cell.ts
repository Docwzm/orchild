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
    @Prop() private columns: any;

    showPicker: any = false
    // columns: any = []

    chooseValueEvt() {
        this.showPicker = true
    }
    onConfirm(value: any) {
        this.showPicker = false;
        this.$emit('onChange', value)
    }
}
