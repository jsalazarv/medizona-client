import Vue from "vue";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  localize,
} from "vee-validate";
import { required } from "vee-validate/dist/rules";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

localize("en");

extend("required", required);
