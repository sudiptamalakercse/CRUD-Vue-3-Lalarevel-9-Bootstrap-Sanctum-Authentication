import { useStore } from 'vuex';
import { computed } from 'vue';
import { is_authenticate } from '../../services/generel';

export default function useIsAuthenticateComposable() {
	const store = useStore();

	const is_admin_authenticate = computed(() => {
		return is_authenticate('admin');
	});

	const is_user_authenticate = computed(() => {
		return is_authenticate('user');
	});

	const user_data = computed(() => {
		let user_data = store.state.authentication_module.user_data;
		return user_data;
	});

	const token = computed(() => {
		let user_data = store.state.authentication_module.user_data;
		return user_data.token;
	});

	return {
		is_admin_authenticate,
		is_user_authenticate,
		user_data,
		token
	};
}
