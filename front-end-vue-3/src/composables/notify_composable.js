import { useStore } from 'vuex';
import { cheange_response_message_and_error_messages_from_server } from '../services/generel';

export default function useNotifyComposable() {
	const store = useStore();
	function clear_notify_messages() {
		cheange_response_message_and_error_messages_from_server('', []);
		store.commit('notify_module/cheange_timeout', null);
	}

	return {
		clear_notify_messages
	};
}
