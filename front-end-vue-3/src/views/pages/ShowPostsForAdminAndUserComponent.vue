<template>
	<!-- ============================================================== -->
	<!-- Start Page Content -->
	<!-- ============================================================== -->
	<div class="row">
		<div class="col">
			<div class="card mb-2">
				<div class="card-body">
					<h5 class="card-title d-inline">All Posts</h5>
					<input
						@keyup.enter="onChangeSearchValue"
						type="text"
						style="float: right"
						placeholder="Search &amp; Enter"
						:value="search_value"
					/>
				</div>
				<div class="table-responsive">
					<table class="table">
						<thead class="thead-light">
							<tr>
								<th class="text-center align-middle">
									<span v-if="post_list.length > 1">
										{{ all_select == true ? 'Uncheck All' : 'Check All' }}
									</span>
									<br />
									<input
										v-if="post_list.length > 1"
										type="checkbox"
										id="mainCheckbox"
										@click="onSelectAllViaCheckBox"
										v-model="all_select"
									/>
								</th>
								<th class="text-center align-middle" scope="col">Id</th>
								<th class="text-center align-middle" scope="col">Task</th>
								<th class="text-center align-middle" scope="col">Actions</th>
							</tr>
						</thead>
						<tbody class="customtable">
							<tr v-if="post_list.length == 0">
								<td colspan="5" class="text-center">No Record!</td>
							</tr>

							<tr
								v-else
								v-for="post in post_list"
								:key="post.id"
								:class="{
									background: ids_for_delete.includes(post.id)
								}"
							>
								<th class="text-center">
									<input
										v-if="post_list.length > 1"
										type="checkbox"
										class="listCheckbox"
										v-model="ids_for_delete"
										:value="post.id"
									/>
								</th>
								<td class="text-center">{{ post.id }}</td>
								<td class="text-center">{{ post.task }}</td>
								<td class="text-center">
									<span
										style="cursor: pointer"
										@click="onShowSingleRecord(post.id)"
										:class="{
											disable_btn: is_btn_deactive,
											badge: true,
											'rounded-pill': true,
											'bg-success': true
										}"
										>View</span
									>
									<span
										v-if="is_user_authenticate == true"
										@click="onEditSingleRecord(post.id)"
										style="cursor: pointer"
										:class="{
											disable_btn: is_btn_deactive,
											badge: true,
											'rounded-pill': true,
											'bg-primary': true,
											'mx-1': true
										}"
										>Edit</span
									>
									<span
										v-if="is_user_authenticate == true"
										@click="onDeleteSingleRecord(post.id)"
										style="cursor: pointer"
										:class="{
											disable_btn: is_btn_deactive,
											badge: true,
											'rounded-pill': true,
											'bg-danger': true
										}"
										>Delete</span
									>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div
					class="text-center"
					v-if="post_list.length > 1 && is_user_authenticate == true"
				>
					<span
						@click="onDeleteSelectedPosts"
						style="cursor: pointer"
						:class="{
							disable_btn: is_checked_delete_btn_deactive,
							badge: true,
							'rounded-pill': true,
							'bg-danger': true,
							'mb-4': true
						}"
						>Delete Selected Records</span
					>
				</div>
			</div>

			<pagination
				:data="laravel_data"
				@pagination-change-page="onShowPostList"
				:show-disabled="true"
				align="center"
			>
				<template #prev-nav>
					<span>Previous</span>
				</template>
				<template #next-nav>
					<span>Next</span>
				</template>
			</pagination>
		</div>
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
import useNotifyComposable from '../../composables/notify_composable';
import useIsAuthenticate from '../../composables/getters/is_authenticate_composable';
import usePostListComposable from '../../composables/post_list_composable';
import useNotifyGetterComposable from '../../composables/getters/notify_getter_composable';
import LaravelVuePagination from 'laravel-vue-pagination';
import usePostGetterComposable from '../../composables/getters/post_getter_composable';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
	name: 'ShowPostsForAdminAndUserComponent',
	components: {
		Pagination: LaravelVuePagination
	},
	setup() {
		const router = useRouter();
		// Breadcrumb And Title related composable
		const {
			cheange_breadcrumb_links,
			cheange_breadcrumb_heading_and_title_heading
		} = useBreadcrumbAndTitle();

		const { clear_notify_messages } = useNotifyComposable();

		const { is_admin_authenticate, is_user_authenticate } = useIsAuthenticate();

		const {
			onShowPostList,
			post_list,
			laravel_data,
			is_btn_deactive,
			change_search_value,
			search_value,
			is_checked_delete_btn_deactive,
			delete_selected_posts,
			delete_single_record,
			select_all_via_check_box,
			all_select,
			ids_for_delete
		} = usePostListComposable();

		const { response_message, error_messages_from_server } =
			useNotifyGetterComposable();

		const { recent_page_value } = usePostGetterComposable();

		function set_breadcrumb_heading_and_title_heading_and_breadcrumb_links() {
			cheange_breadcrumb_heading_and_title_heading('Posts');

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
						disabled: true
					}
				]);
			}
		}

		set_breadcrumb_heading_and_title_heading_and_breadcrumb_links();

		const onChangeSearchValue = event => {
			change_search_value(event.target.value);
		};

		const onSelectAllViaCheckBox = () => {
			select_all_via_check_box();
		};
		const onDeleteSelectedPosts = () => {
			delete_selected_posts();
		};
		const onDeleteSingleRecord = id_for_delete => {
			delete_single_record(id_for_delete);
		};
		const onEditSingleRecord = id_for_update => {
			router.push({
				name: 'update_post_by_admin',
				params: { post_id: id_for_update }
			});
		};
		const onShowSingleRecord = id_for_show_single_record => {
			router.push({
				name: 'show_single_post',
				params: { post_id: id_for_show_single_record }
			});
		};
		setTimeout(() => {
			if (recent_page_value.value != 1) {
				onShowPostList(recent_page_value.value);
			} else {
				onShowPostList();
			}
		}, 1000);

		onMounted(() => {
			if (
				response_message.value !== 'Your Record is Created Successfully!' &&
				response_message.value !== 'Your Record is Updated Successfully!' &&
				error_messages_from_server.value[0] !== 'Unauthorized!!'
			) {
				clear_notify_messages();
			}
		});

		return {
			is_user_authenticate,
			post_list,
			laravel_data,
			is_btn_deactive,
			onShowPostList,
			onChangeSearchValue,
			search_value,
			is_checked_delete_btn_deactive,
			onDeleteSelectedPosts,
			onSelectAllViaCheckBox,
			all_select,
			ids_for_delete,
			onDeleteSingleRecord,
			onEditSingleRecord,
			onShowSingleRecord
		};
	}
};
</script>

<style scoped>
.disable_btn {
	cursor: not-allowed;
	pointer-events: none;
	color: #c0c0c0;
	background-color: #ffffff;
}
.background {
	background-color: #acddde;
}
</style>
