export default {
	namespaced: true,
	state: {
		items: [
			{
				url: '/resume',
				text: 'My resume',
			}
		]
	},
	getters: {
		items(state){
			return state.items;
		}
	}
};