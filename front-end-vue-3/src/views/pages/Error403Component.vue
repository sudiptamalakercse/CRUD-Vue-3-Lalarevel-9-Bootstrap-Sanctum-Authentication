<template>
	<div class="card">
		<div class="card-body">
			<div class="error-body text-center">
				<h1 class="error-title text-danger">403</h1>
				<h3 class="text-uppercase error-subtitle">PAGE NOT FOUND !</h3>
				<p class="text-muted mt-4 mb-4">
					YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
				</p>

				<router-link
					v-if="is_admin_authenticate"
					:to="{ name: 'home' }"
					class="btn btn-danger btn-rounded waves-effect waves-light mb-5 text-white"
					>Back to Admin Portal</router-link
				>
				<router-link
					v-else
					:to="{ name: 'home' }"
					class="btn btn-danger btn-rounded waves-effect waves-light mb-5 text-white"
					>Back to Admin & User Portal</router-link
				>
			</div>
		</div>
	</div>
</template>
<script>
import useBreadcrumbAndTitle from '../../composables/breadcrumb_and_title_composable';
import useIsAuthenticate from '../../composables/getters/is_authenticate_composable';
import useNotifyComposable from '../../composables/notify_composable';
import { onMounted } from 'vue';

export default {
	name: 'Error403Component',
	setup() {
		const {
			cheange_breadcrumb_links,
			cheange_breadcrumb_heading_and_title_heading
		} = useBreadcrumbAndTitle();

		const { is_admin_authenticate, is_user_authenticate } = useIsAuthenticate();
		const { clear_notify_messages } = useNotifyComposable();

		cheange_breadcrumb_heading_and_title_heading('Error 403');

		let user_type = null;

		if (is_admin_authenticate.value) {
			user_type = 'Admin';
		} else if (is_user_authenticate.value) {
			user_type = 'User';
		} else {
			user_type = 'Admin & User';
		}

		cheange_breadcrumb_links([
			{
				name: `${user_type} Portal`,
				name_of_route: 'home',
				disabled: false
			},
			{
				name: 'Error 403',
				name_of_route: 'error403component',
				disabled: true
			}
		]);

		onMounted(() => {
			clear_notify_messages();
		});

		return { is_admin_authenticate };
	}
};
</script>

<style></style>
