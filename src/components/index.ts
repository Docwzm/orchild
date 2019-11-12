/**
 * Created by guanyj on  11/12/19
 */
import OrchidVerifyCodeTextField from './VerifyCodeTextField/verifyCodeTextField.vue';
import Vue from 'vue';

export class OrchidComponents {
    static install(vue: typeof Vue) {
        vue.component('orchid-verify-code-text-field', OrchidVerifyCodeTextField);
    }
}
