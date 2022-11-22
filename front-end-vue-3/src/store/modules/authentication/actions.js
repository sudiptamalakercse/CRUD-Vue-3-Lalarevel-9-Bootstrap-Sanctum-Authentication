import axios_object_with_base_url_and_common_headers from '../../../services/axios_object_base_url_and_common_headers';
import axios_object_with_base_url_and_token_and_common_headers from '../../../services/axios_object_base_url_and_token_and_common_headers';

export default {
	response_status_check_and_do_something(context, payload) {
		let response = payload.response;
		if (
			(response.status == 201 && response.statusText == 'Created') ||
			(response.status == 200 && response.statusText == 'OK')
		) {
			let user_data = payload.user_data;
			localStorage.setItem('user_data', JSON.stringify(user_data));
			context.commit('set_user_data', user_data);
			context.commit('post_module/cheange_recent_page_value', 1, {
				root: true
			});
			context.commit('post_module/cheange_search_value', '', {
				root: true
			});
		}
	},

	async sign_up(context, payload) {
		await axios_object_with_base_url_and_common_headers
			.post(payload.request_link, payload.data)
			.then(function (response) {
				let user_data = {};
				let user_type = null;

				user_type = payload.user_type;

				user_data.token = response.data.token;
				user_data.id = response.data[`${user_type}`].id;
				user_data.name = response.data[`${user_type}`].name;
				user_data.email = response.data[`${user_type}`].email;
				user_data.created_at = response.data[`${user_type}`].created_at;
				user_data.updated_at = response.data[`${user_type}`].updated_at;
				user_data.user_type = user_type;

				let some_data = { response, user_data };
				context.dispatch('response_status_check_and_do_something', some_data);
			})
			.catch(function (error) {
				throw error;
			});
	},
	async log_in(context, payload) {
		await context.dispatch('sign_up', payload);
	},
	auto_log_in(context) {
		let user_data_string = localStorage.getItem('user_data');

		if (user_data_string) {
			let user_data = JSON.parse(user_data_string);
			context.commit('set_user_data', user_data);
		}
	},
	async log_out(context, payload) {
		let axios_object = axios_object_with_base_url_and_token_and_common_headers(
			payload.token
		);

		await axios_object
			.post(payload.request_link)
			.then(function (response) {
				if (response.status == 200 && response.statusText == 'OK') {
					localStorage.removeItem('user_data');
					context.commit('set_user_data', {});
				}
			})
			.catch(function (error) {
				if (error.code == 'ERR_BAD_REQUEST') {
					if (error.response.data.message == 'Unauthenticated.') {
						localStorage.removeItem('user_data');
						context.commit('set_user_data', {});
					}
				}
				throw error;
			});
	}
};
