export default {
	cheange_timeout(state, payload) {
		state.timeout = payload;
	},
	cheange_error_messages_from_server(state, payload) {
		state.error_messages_from_server = payload;
	},
	cheange_response_message(state, payload) {
		state.response_message = payload;
	}
};
