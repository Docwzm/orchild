/**
 * Created by guanyj on  11/12/19
 */
import Vue from 'vue';
import OrchidVerifyCodeTextField from './VerifyCodeTextField/verifyCodeTextField.vue';
import OrchidCellPicker from './CellPicker/CellPicker.vue';
import OrchidCellDatetimePicker from './CellDatetimePicker/CellDatetimePicker.vue';
import OrchidAreaPicker from './AreaPicker/AreaPicker.vue';
import OrchidCellAreaPicker from './CellAreaPicker/CellAreaPicker.vue';

export class OrchidComponents {
    static install(vue: typeof Vue) {
        vue.component('orchid-verify-code-text-field', OrchidVerifyCodeTextField);
        vue.component('orchid-cell-picker', OrchidCellPicker);
        Vue.component('orchid-cell-datetime-picker', OrchidCellDatetimePicker);
        Vue.component('orchid-area-picker', OrchidAreaPicker);
        Vue.component('orchid-cell-area-picker', OrchidCellAreaPicker);
    }
}
