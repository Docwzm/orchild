
import { Component, Vue, Prop, Model } from 'vue-property-decorator'

/**
 * 表单内普通选择器
 * @desc 结合`van-cell-group`使用。详见 vant 官网中 `Picker选择器`中【搭配弹出层使用】
 * @author guanyj
 * @time 2019/11/13
 * @class CellAreaPicker
 */
@Component({})
export default class CellPicker extends Vue {
    @Model('change') value!: string;

    @Prop({default: []}) columns!: Array<{label: string, value: any}>;
    @Prop({default: false}) required!: boolean;
    @Prop({default: '请选择'}) placeholder!: string;
    @Prop({default: ''}) label!: string;

    pickerVisible = false;

    /**
     * 下拉配置
     */
    get pickerList(): Array<string> {
        return (this.columns).map(item => item.label);
    }

    /**
     * 计算cell-content
     */
    get hintText(): string {
        let target = (this.columns || []).find(item => item.value === this.value);
        if (target) {
            return target.label;
        }
        return '';
    }

    /**
     * 确定按钮事件
     * @param item
     */
    public onConfirm(item: {label: string, value: any}) {
        this.$emit('change', item.value);
        this.pickerVisible = false;
    }

    public onCancel() {
        this.pickerVisible = false;
    }
}
