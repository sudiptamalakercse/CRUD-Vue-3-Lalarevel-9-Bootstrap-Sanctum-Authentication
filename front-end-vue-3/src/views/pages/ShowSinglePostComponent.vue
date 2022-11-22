<template>
	<!-- ============================================================== -->
	<!-- Start Page Content -->
	<!-- ============================================================== -->
	<div class="row">
		<div class="col-md-3"></div>
		<div class="col-md-6">
			<div class="card">
				<div
					class="card-body border-bottom d-flex justify-content-end py-2 p-3"
				>
					<button
						type="button"
						:class="{
							btn: true,
							'btn-primary': true
						}"
						@click="onBackClick()"
					>
						Back
					</button>
				</div>

				<form class="form-horizontal">
					<div class="card-body">
						<h4 class="card-title mt-1 mb-3 text-center">Single Post</h4>

							<div class="form-group row">
							<label
								for="name"
								class="col-sm-3 text-end control-label col-form-label"
								>Id</label
							>
							<div class="col-sm-9">
								<input
									name="id"
									type="text"
									class="form-control"
									id="id"
									v-model="inputed_add_and_edit_post_form_data.id"
									readonly
								/>
							</div>
						</div>					
						<div class="form-group row">
							<label
								for="task"
								class="col-sm-3 text-end control-label col-form-label"
								>Task</label
							>
							<div class="col-sm-9">
								<input
									name="task"
									type="text"
									class="form-control"
									id="task"
									v-model="inputed_add_and_edit_post_form_data.task"
									readonly
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="col-md-3"></div>
	</div>
	<!-- ============================================================== -->
	<!-- End PAge Content -->
	<!-- ============================================================== -->
	<!-- ============================================================== -->
	<!-- Right sidebar -->
	<!-- ============================================================== -->
	<!-- .right-sidebar -->
	<!-- ============================================================== -->
	<!-- End Right sidebar -->
	<!-- ============================================================== -->
</template>
<script>
import useBreadcrumbAndTitle from '../../composables/breadcrumb_and_title_composable';
import useAddAndEditPostByAdminComposable from '../../composables/add_and_edit_post_by_admin_composable';
import useRetrieveSingleRecordComposable from '../../composables/retrieve_single_record';
import useIsAuthenticate from '../../composables/getters/is_authenticate_composable';
import { useRouter } from 'vue-router';

export default {
	name: 'ShowSinglePostComponent',
	props: {
		post_id: {
			type: String,
			required: true
		}
	},
	setup(props) {
		// Breadcrumb And Title related composables
		const router = useRouter();
		const { is_admin_authenticate, is_user_authenticate } = useIsAuthenticate();
		const {
			cheange_breadcrumb_links,
			cheange_breadcrumb_heading_and_title_heading
		} = useBreadcrumbAndTitle();

		// SignUp related composables
		const {
			inputed_add_and_edit_post_form_data,
			response_message,
			error_messages_from_server
		} = useAddAndEditPostByAdminComposable();

		// Breadcrumb And Title related code
		cheange_breadcrumb_heading_and_title_heading('Single Post');

		if (
			is_admin_authenticate.value == true ||
			is_user_authenticate.value == true
		) {
			let user_type = null;
			if (is_admin_authenticate.value) {
				user_type = 'Admin';
			} else if (is_user_authenticate.value) {
				user_type = 'User';
			}

			cheange_breadcrumb_links([
				{
					name: `${user_type} Portal`,
					name_of_route: 'home',
					disabled: false
				},

				{
					name: 'Posts',
					name_of_route: 'show_posts_for_admin_and_user',
					disabled: false
				},
				{
					name: 'Single Post',
					name_of_route: 'show_single_post',
					params: { post_id: props.post_id },
					disabled: true
				}
			]);
		}
		const { retrieve_single_record } = useRetrieveSingleRecordComposable();

		let result = retrieve_single_record(props.post_id);

		result.then(
			res => {
				inputed_add_and_edit_post_form_data.task = res.task;
                inputed_add_and_edit_post_form_data.id = res.id;         
			},
			e => {
				console.log(e);
			}
		);

		const onBackClick = () => {
			router.push({ name: 'show_posts_for_admin_and_user' });
		};

		return {
			inputed_add_and_edit_post_form_data,
			response_message,
			error_messages_from_server,
			onBackClick
		};
	}
};
</script>

<style scoped>
.disable_btn {
	cursor: not-allowed;
	pointer-events: none;

	/*Button disabled - CSS color class*/
	color: #c0c0c0;
	background-color: #ffffff;
}
</style>
