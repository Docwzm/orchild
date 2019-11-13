
import { Component, Vue, Prop, Model } from 'vue-property-decorator'

@Component({})
export default class CellPicker extends Vue {
    @Model('change') value!: string;

    @Prop({default: []}) columns!: Array<{label: string, value: any}>;
    @Prop({default: false}) required!: boolean;
    @Prop({default: '请选择'}) placeholder!: string;
    @Prop({default: ''}) label!: string;

    pickerVisible = false;

    get pickerList(): Array<string> {
        return (this.columns).map(item => item.label);
    }

    get hintText(): string {
        let target = (this.columns || []).find(item => item.value === this.value);
        if (target) {
            return target.label;
        }
        return '';
    }

    public onConfirm(item: {label: string, value: any}) {
        this.$emit('change', item.value);
        this.pickerVisible = false;
    }

    public onCancel() {
        this.pickerVisible = false;
    }
}
