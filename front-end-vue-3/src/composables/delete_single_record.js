import { onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useNotifyGetterComposable from './getters/notify_getter_composable';
import usePostGetterComposable from './getters/post_getter_composable';
import useIsAuthenticateComposable from './getters/is_authenticate_composable';
import axios_object_with_base_url_and_token_and_common_headers from '../services/axios_object_base_url_and_token_and_common_headers';
import { set_page_num_after_deleting_record } from '../services/generel';
import {
	setTimeout_,
	cheange_response_message_and_error_messages_from_server
} from '../services/generel';

export default function useDeleteSingleRecordComposable(onShowPostList) {
	const store = useStore();
	const router = useRouter();
	const { timeout, error_messages_from_server } = useNotifyGetterComposable();
	const { recent_page_value, search_value } = usePostGetterComposable();

	const { user_data } = useIsAuthenticateComposable();

	const delete_single_record = async id_for_delete => {
		let finally_done = false;
		cheange_response_message_and_error_messages_from_server('Loading...', []);

		let all_errors = [];
		let is_server_or_net_on = true;

		let axios_object = axios_object_with_base_url_and_token_and_common_headers(
			user_data.value.token
		);

		await axios_object
			.delete(`posts/${id_for_delete}`)
			.then(function (response) {
				finally_done = true;
				set_page_num_after_deleting_record(
					response,
					search_value,
					axios_object,
					recent_page_value,
					onShowPostList,
					null,
					null
				);
			})
			.catch(function (error) {
				if (error.code == 'ERR_BAD_REQUEST') {
					if (error.response.data.message == 'Unauthenticated.') {
						localStorage.removeItem('user_data');
						store.commit('authentication_module/set_user_data', {});
						router.push({ name: 'home' });
					} else if (error.response.data.message == 'Unauthorized!!') {
						let mess = error.response.data.message;
						cheange_response_message_and_error_messages_from_server('', [mess]);
					}
				} else if (
					error.code == 'ERR_BAD_RESPONSE' ||
					error.code == 'ERR_NETWORK'
				) {
					is_server_or_net_on = false;
				} else {
					let errors = error.response.data.errors;
					for (const key in errors) {
						all_errors.push(errors[key][0]);
					}
				}
			});

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
				if (finally_done == true) {
					cheange_response_message_and_error_messages_from_server(
						'Record is Deleted Successfully!',
						[]
					);
				} else if (error_messages_from_server.value.length == 0) {
					cheange_response_message_and_error_messages_from_server('', [
						'Wrong Occurs in Server!'
					]);
				}

				setTimeout_(5000);
			}
		}
	};

	onUnmounted(() => {
		clearTimeout(timeout.value);
	});

	return {
		delete_single_record
	};
}
