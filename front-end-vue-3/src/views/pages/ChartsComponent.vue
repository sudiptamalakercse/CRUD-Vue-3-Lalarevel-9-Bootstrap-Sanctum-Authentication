<template>
	<div class="card">
		<div class="card-body">
			<h1>Some Charts Will Be Here...</h1>
		</div>
	</div>
</template>

<script>
import useBreadcrumbAndTitle from '../../composables/breadcrumb_and_title_composable';
import useNotifyComposable from '../../composables/notify_composable';
import { onMounted } from 'vue';

export default {
	name: 'ChartsComponent',
	setup() {
		const {
			cheange_breadcrumb_links,
			cheange_breadcrumb_heading_and_title_heading
		} = useBreadcrumbAndTitle();

		const { clear_notify_messages } = useNotifyComposable();

		cheange_breadcrumb_heading_and_title_heading('Charts');

		cheange_breadcrumb_links([
			{ name: 'Admin Portal', name_of_route: 'home', disabled: false },
			{ name: 'Charts', name_of_route: 'charts', disabled: true }
		]);

		onMounted(() => {
			clear_notify_messages();
		});

		return {};
	}
};
</script>

<style></style>
