import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import VuexPersistence from "vuex-persist";
import { IRootState } from "@/store/types";

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  key: "vuex",
  storage: window.localStorage,
  reducer: (state: IRootState) => ({
    auth: state.auth,
  }),
});

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
  plugins: [vuexPersist.plugin],
});
