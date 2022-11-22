import mutations from './mutations';

export default {
	namespaced: true,
	state() {
		return {
			search_value: '',
			recent_page_value: 1
		};
	},
	mutations
};
