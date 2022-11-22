<template>
	<!-- ============================================================== -->
	<!-- Start Page Content -->
	<!-- ============================================================== -->
	<div class="row">
		<div class="col-md-3"></div>
		<div class="col-md-6">
			<div class="card">
				<form class="form-horizontal" @submit.prevent="onSignUpClick()">
					<div class="card-body">
						<h4 class="card-title mt-3 mb-3 text-center">
							Sign Up As {{ upper_case_user_type }}
						</h4>
						<div class="form-group row">
							<label
								for="name"
								class="col-sm-3 text-end control-label col-form-label"
								>Name</label
							>
							<div class="col-sm-9">
								<input
									name="name"
									type="text"
									class="form-control"
									id="name"
									placeholder="Name Here"
									v-model.trim="inputed_sign_up_form_data.name"
								/>
								<span class="text-danger" v-if="error_messages.name">{{
									error_messages.name
								}}</span>
							</div>
						</div>
						<div class="form-group row">
							<label
								for="email"
								class="col-sm-3 text-end control-label col-form-label"
								>Email</label
							>
							<div class="col-sm-9">
								<input
									name="email"
									type="email"
									class="form-control"
									id="email"
									placeholder="Email Here"
									v-model.trim="inputed_sign_up_form_data.email"
								/>
								<span class="text-danger" v-if="error_messages.email">{{
									error_messages.email
								}}</span>
							</div>
						</div>
						<div class="form-group row">
							<label
								for="password"
								class="col-sm-3 text-end control-label col-form-label"
								>Password</label
							>
							<div class="col-sm-9">
								<input
									name="password"
									type="password"
									class="form-control"
									id="password"
									placeholder="Password Here"
									v-model.trim="inputed_sign_up_form_data.password"
								/>
							</div>
						</div>
						<div class="form-group row">
							<label
								for="password_confirmation"
								class="col-sm-3 text-end control-label col-form-label"
								>Confirm Password</label
							>
							<div class="col-sm-9">
								<input
									name="password_confirmation"
									type="password"
									class="form-control"
									id="password_confirmation"
									placeholder="Confirm Password Here"
									v-model.trim="inputed_sign_up_form_data.password_confirmation"
								/>
								<span class="text-danger" v-if="error_messages.password">{{
									error_messages.password
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
								Submit
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
import useSignUpComposable from '../../composables/sign_up_composable';
import useNotifyComposable from '../../composables/notify_composable';
import { toUpperCase } from '../../services/generel';
import { onMounted, ref } from 'vue';

export default {
	name: 'SignUpComponent',
	props: {
		user_type: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const upper_case_user_type = ref(toUpperCase(props.user_type));
		// Breadcrumb And Title related composables

		const {
			cheange_breadcrumb_links,
			cheange_breadcrumb_heading_and_title_heading
		} = useBreadcrumbAndTitle();
		const { clear_notify_messages } = useNotifyComposable();

		// SignUp related composables
		const {
			error_messages,
			onSignUp,
			inputed_sign_up_form_data,
			response_message,
			error_messages_from_server,
			is_submit_btn_deactive
		} = useSignUpComposable();

		// Breadcrumb And Title related code
		cheange_breadcrumb_heading_and_title_heading(
			`Sign Up As ${upper_case_user_type.value}`
		);

		cheange_breadcrumb_links([
			{ name: 'User Portal', name_of_route: 'home', disabled: false },
			{
				name: `Sign Up As ${upper_case_user_type.value}`,
				name_of_route: `sign_up_${props.user_type}`,
				disabled: true
			}
		]);

		//Sign Up Related code
		const onSignUpClick = () => {
			let payload = {
				request_link: `register/${props.user_type}`,
				data: inputed_sign_up_form_data,
				user_type: `${props.user_type}`
			};
			onSignUp(payload);
		};

		onMounted(() => {
			clear_notify_messages();
		});

		return {
			inputed_sign_up_form_data,
			onSignUpClick,
			error_messages,
			response_message,
			error_messages_from_server,
			is_submit_btn_deactive,
			upper_case_user_type
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
