import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Resume from './components/Resume';
import E404 from './components/E404';

import {store} from './store';

const routes = [
	{
		path: '',
		redirect: {name: 'resume'},
	},
	//{
	//	name: 'products',
	//	path: '/products',
	//	component: ProductList,
	//	beforeEnter(from, to, next){
	//		store.dispatch('products/loadItems');
	//		next();
	//	}
	//},
	{
		name: 'resume',
    path: '/aspp/resume',
		component: Resume,
	},
	{
		name: 'E404',
    path: '*',
		component: E404,
	}
];

export const router = new VueRouter({
	routes,
	mode: 'history',
});