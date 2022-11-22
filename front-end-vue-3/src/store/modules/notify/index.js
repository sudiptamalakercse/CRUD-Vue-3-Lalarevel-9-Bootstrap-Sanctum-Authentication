import mutations from './mutations';

export default {
	namespaced: true,
	state() {
		return {
			timeout: null,
			error_messages_from_server: '',
			response_message: ''
		};
	},
	mutations
};
