<template>
	<div class="card">
		<div class="card-body">
			<div class="error-body text-center">
				<img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzdGMzkzMjFBRDE0MTFFODhCNzFCNTE5NDkzRTMyOEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzdGMzkzMjJBRDE0MTFFODhCNzFCNTE5NDkzRTMyOEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDN0YzOTMxRkFEMTQxMUU4OEI3MUI1MTk0OTNFMzI4QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDN0YzOTMyMEFEMTQxMUU4OEI3MUI1MTk0OTNFMzI4QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrP3JVMAAABbSURBVHjaYpTaWfGfgUJwaNYaRiiTYrOYGAYZGHXQqINGHTTqoFEHjTpo1EFUBoz3n76i2BCFK/7DN4RYqNGoAoX0aANt1EGjDhp10KiDRh006qBRBxEHAAIMACbZC4OYUcclAAAAAElFTkSuQmCC"
					alt="homepage"
					class="light-logo mt-5"
					width="80"
				/>
				<h3 v-if="is_admin_authenticate" class="error-subtitle mt-5 mb-5">
					Welcome to Admin Portal
				</h3>
				<h3 v-else-if="is_user_authenticate" class="error-subtitle mt-5 mb-5">
					Welcome to User Portal
				</h3>
				<h3 v-else class="error-subtitle mt-5 mb-5">
					Welcome to User Portal
				</h3>
			</div>
		</div>
	</div>
</template>

<script>
import useBreadcrumbAndTitle from '../../composables/breadcrumb_and_title_composable';
import useIsAuthenticate from '../../composables/getters/is_authenticate_composable';
import useNotifyGetterComposable from '../../composables/getters/notify_getter_composable';
import { cheange_response_message_and_error_messages_from_server } from '../../services/generel';
import { onMounted, onUnmounted, onUpdated } from 'vue';
import { useStore } from 'vuex';

export default {
	name: 'IndexComponent',
	setup() {
		const store = useStore();
		const { timeout } = useNotifyGetterComposable();

		const {
			cheange_breadcrumb_links,
			cheange_breadcrumb_heading_and_title_heading
		} = useBreadcrumbAndTitle();

		const { is_admin_authenticate, is_user_authenticate } = useIsAuthenticate();

		function set_breadcrumb_heading_and_title_heading_and_breadcrumb_links() {
			let value = null;

			if (is_admin_authenticate.value == true) {
				value = 'Admin';
			} else if (is_user_authenticate.value == true) {
				value = 'User';
			} else {
				value = 'User';
			}
			cheange_breadcrumb_heading_and_title_heading(`${value} Portal`);

			cheange_breadcrumb_links([
				{ name: `${value} Portal`, name_of_route: 'home', disabled: true }
			]);
		}

		set_breadcrumb_heading_and_title_heading_and_breadcrumb_links();

		onMounted(() => {
			let timeout = setTimeout(() => {
				cheange_response_message_and_error_messages_from_server('', []);
			}, 5000);
			store.commit('notify_module/cheange_timeout', timeout);
		});

		onUpdated(() => {
			set_breadcrumb_heading_and_title_heading_and_breadcrumb_links();
		});

		onUnmounted(() => {
			clearTimeout(timeout.value);
		});

		return {
			is_admin_authenticate,
			is_user_authenticate
		};
	}
};
</script>

<style></style>
