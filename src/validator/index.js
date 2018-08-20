import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import messagesBr from "vee-validate/dist/locale/pt_BR";

Validator.localize('pt_BR', messagesBr);
Vue.use(VeeValidate);

