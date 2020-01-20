import {Component, Model, Prop, Vue} from "vue-property-decorator";

/**
 * 表单内日期选择器
 * @desc 结合`van-cell-group`使用。
 * @author guanyj
 * @time 2019/11/13
 * @class CellAreaPicker
 */
@Component({})
export default class CellDatetimePicker extends Vue {
    @Model('change') value!: Date;

    @Prop({default: false}) required!: boolean;
    @Prop({default: '请选择'}) placeholder!: string;
    @Prop({default: ''}) label!: string;
    @Prop({default: 'yyyy/MM/dd'}) format!: string;
    @Prop({default: 'date'}) type!: string;

    pickerVisible = false;

    get hintText(): string {
        if (this.value) {
            return this.$utils.format(this.value, this.format);
        }
        return '';
    }

    public onConfirm(event: any) {
        this.$emit('change', event);
        this.pickerVisible = false;
    }
}
