<template>
	<!-- ============================================================== -->
	<!-- Start Page Content -->
	<!-- ============================================================== -->
	<div class="row">
		<div class="col-md-3"></div>
		<div class="col-md-6">
			<div class="card">
				<form class="form-horizontal" @submit.prevent="onUpdatePostClick()">
					<div class="card-body">
						<h4 class="card-title mt-3 mb-3 text-center">
							Update Post By User
						</h4>
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
									placeholder="Task Here"
									v-model.trim="inputed_add_and_edit_post_form_data.task"
								/>
								<span class="text-danger" v-if="error_messages.task">{{
									error_messages.task
								}}</span>
							</div>
						</div>
					</div>
					<div class="border-top">
						<div class="card-body" id="submit">
							<button
								type="submit"
								:class="{
									disable_btn: is_submit_btn_deactive,
									btn: true,
									'btn-primary': true
								}"
							>
								Update
							</button>
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
import useIsAuthenticateComposable from '../../composables/getters/is_authenticate_composable';
import useRetrieveSingleRecordComposable from '../../composables/retrieve_single_record';

export default {
	name: 'UpdatePostByAdminComponent',
	props: {
		post_id: {
			type: String,
			required: true
		}
	},
	setup(props) {
		// Breadcrumb And Title related composables
		const {
			cheange_breadcrumb_links,
			cheange_breadcrumb_heading_and_title_heading
		} = useBreadcrumbAndTitle();

		// SignUp related composables
		const {
			error_messages,
			onAddOrEditPost,
			inputed_add_and_edit_post_form_data,
			response_message,
			error_messages_from_server,
			is_submit_btn_deactive
		} = useAddAndEditPostByAdminComposable();
		const { user_data } = useIsAuthenticateComposable();

		// Breadcrumb And Title related code
		cheange_breadcrumb_heading_and_title_heading('Update Post By User');

		cheange_breadcrumb_links([
			{ name: 'User Portal', name_of_route: 'home', disabled: false },
			{
				name: 'Posts',
				name_of_route: 'show_posts_for_admin_and_user',
				disabled: false
			},
			{
				name: 'Update Post By User',
				name_of_route: 'update_post_by_admin',
				params: { post_id: props.post_id },
				disabled: true
			}
		]);

		//working...
		const { retrieve_single_record } = useRetrieveSingleRecordComposable();

		let result = retrieve_single_record(props.post_id);

		result.then(
			res => {
				inputed_add_and_edit_post_form_data.task = res.task;
			},
			e => {
				console.log(e);
			}
		);
		//console.log(name + city);

		//Sign Up Related code
		const onUpdatePostClick = () => {
			let payload = {
				request_link: `posts/${props.post_id}`,
				token: user_data.value.token,
				data: inputed_add_and_edit_post_form_data,
				action_type: 'update'
			};
			onAddOrEditPost(payload);
		};

		return {
			inputed_add_and_edit_post_form_data,
			onUpdatePostClick,
			error_messages,
			response_message,
			error_messages_from_server,
			is_submit_btn_deactive
		};
	}
};
</script>

<style scoped>
#submit {
	float: right;
}
.disable_btn {
	cursor: not-allowed;
	pointer-events: none;

	/*Button disabled - CSS color class*/
	color: #c0c0c0;
	background-color: #ffffff;
}
</style>
