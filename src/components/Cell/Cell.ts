/**
 * 单元格
 * @desc 单元格【带选择下拉框】
 * @author hqx
 * @time 2019/11/8
 */

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class Cell extends Vue {
    @Prop() title: any;
    @Prop() leftIcon: any;
    @Prop() columns: any;
    @Prop() rightIcon: any;
    @Prop() defaultValue: any;

    valueText = ""

    showPicker: any = false
    mounted() {
        // this.valueText = this.defaultValue
    }

    chooseValueEvt() {
        this.showPicker = true
    }
    onConfirm(value: any) {
        this.showPicker = false
        // this.valueText = value.text
        this.$emit('onChange', value)

    }
}
