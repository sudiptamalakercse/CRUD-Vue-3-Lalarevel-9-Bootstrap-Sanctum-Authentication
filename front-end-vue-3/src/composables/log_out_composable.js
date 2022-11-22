import { onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useNotifyGetterComposable from './getters/notify_getter_composable';
import {
	setTimeout_,
	cheange_response_message_and_error_messages_from_server
} from '../services/generel';

export default function useLogOutComposable() {
	const store = useStore();
	const router = useRouter();
	const { timeout } = useNotifyGetterComposable();
	const is_btn_deactive = ref(false);

	const log_out = async payload => {
		//Logout code
		is_btn_deactive.value = true;
		cheange_response_message_and_error_messages_from_server('Logouting...', []);
		let all_errors = [];
		let is_server_or_net_on = true;
		try {
			// await sign_up(payload);
			await store.dispatch('authentication_module/log_out', payload);
		} catch (error) {
			if (error.code == 'ERR_BAD_REQUEST') {
				if (error.response.data.message == 'Unauthenticated.') {
					router.push({ name: 'home' });
				}
			}
			if (error.code == 'ERR_BAD_RESPONSE' || error.code == 'ERR_NETWORK') {
				is_server_or_net_on = false;
			} else {
				let errors = error.response.data.errors;
				for (const key in errors) {
					all_errors.push(errors[key][0]);
				}
			}
		}
		if (is_server_or_net_on == false) {
			cheange_response_message_and_error_messages_from_server('', [
				'You Are Not Connected With Internet or Server is Down!'
			]);
			setTimeout_(5000);
		} else {
			if (all_errors.length > 0) {
				cheange_response_message_and_error_messages_from_server('', all_errors);
				setTimeout_(5000);
			} else {
				cheange_response_message_and_error_messages_from_server(
					'Your Are Loged Out Sccessfuly!',
					[]
				);
				setTimeout_(5000);
				router.push({ name: 'home' });
			}
		}
		is_btn_deactive.value = false;
	};

	onUnmounted(() => {
		clearTimeout(timeout.value);
	});

	return {
		log_out,
		is_btn_deactive
	};
}
