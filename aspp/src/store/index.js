import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import page from './modules/page';

export const store = new Vuex.Store({
	modules: {
		page,
	},
	strict: process.env.NODE_ENV !== 'production'
});