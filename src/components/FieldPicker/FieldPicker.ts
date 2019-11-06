/**
 * 普通搜索框
 * @desc 普通搜索框【带🔍图标】
 * @author qinmenghuan
 */

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class FieldPicker extends Vue {
    @Prop() private placeholderText: any;
    @Prop() private labelText:any;
    value: any = ''
    showPicker: any = false
    columns: any = ['杭州', '宁波', '温州', '嘉兴', '湖州']

    private onConfirm (value: any) {
        this.value = value
        this.showPicker = false
    }
}
