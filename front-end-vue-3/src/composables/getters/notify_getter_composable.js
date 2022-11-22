import { useStore } from 'vuex';
import { computed } from 'vue';

export default function useNotifyGetterComposable() {
	const store = useStore();

	const timeout = computed(() => {
		return store.state.notify_module.timeout;
	});
	const error_messages_from_server = computed(() => {
		return store.state.notify_module.error_messages_from_server;
	});

	const response_message = computed(() => {
		return store.state.notify_module.response_message;
	});
	return {
		timeout,
		error_messages_from_server,
		response_message
	};
}
