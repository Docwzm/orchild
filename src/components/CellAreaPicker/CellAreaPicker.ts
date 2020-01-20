
import {Component, Vue, Prop, Model, Emit, Ref} from 'vue-property-decorator'
import AreaPicker from "@/components/AreaPicker/AreaPicker";

/**
 * 表单内省市区选择器
 * @desc 结合`van-cell-group`使用。
 * @author guanyj
 * @time 2019/11/13
 * @class CellAreaPicker
 */
@Component({
    name: 'CellAreaPicker'
})
export default class CellAreaPicker extends Vue {
    @Model('change') value!: string;

    @Prop({default: false}) required!: boolean;
    @Prop({default: '请选择'}) placeholder!: string;
    @Prop({default: ''}) label!: string;

    @Ref('areaPicker') readonly areaPicker!: AreaPicker;
    pickerVisible = false;

    /**
     * cell-content
     */
    get hintText(): string {
        // 显式调用 `this.value` 触发vue检测此计算属性。这一行不可省略
        const codes = this.value;
        if (this.areaPicker) {
            return (this.areaPicker as AreaPicker).getAreaFullNameByCode(codes);
        }
        return '';
    }

    public onConfirm(event: string) {
        console.log(event);
        this.$emit('change', event);
        this.pickerVisible = false;
    }

    public onClose() {
        this.pickerVisible = false;
    }
}
