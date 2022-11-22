<template>
	<div class="row" id="alert1">
		<div class="col">
			<div
				v-if="response_message"
				class="alert alert-success text-center m-0 p-1"
				role="alert"
			>
				{{ response_message }}
			</div>
			<span v-if="error_messages_from_server.length > 0">
				<div
					v-for="error_message in error_messages_from_server"
					class="alert alert-danger text-center m-0 p-1"
					role="alert"
					:key="error_message"
				>
					{{ error_message }}
				</div>
			</span>
		</div>
	</div>
</template>

<script>
import useNotifyGetterComposable from '../composables/getters/notify_getter_composable';

export default {
	name: 'AlertComponent',
	setup() {
		const { error_messages_from_server, response_message } =
			useNotifyGetterComposable();

		return {
			error_messages_from_server,
			response_message
		};
	}
};
</script>

<style scoped>
#alert1 {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100000;
}
</style>
