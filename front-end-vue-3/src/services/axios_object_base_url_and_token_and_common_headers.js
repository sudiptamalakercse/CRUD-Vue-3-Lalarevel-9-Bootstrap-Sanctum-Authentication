import axios from 'axios';

const axios_object_with_base_url_and_token_and_common_headers = token => {
	const axios_object = axios.create({
		baseURL: 'http://127.0.0.1:8000/api/',
		Accept: 'application/json'
	});
	axios_object.defaults.headers.common['Authorization'] = 'Bearer ' + token;

	return axios_object;
};
export default axios_object_with_base_url_and_token_and_common_headers;
