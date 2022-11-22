<template>
	<header class="topbar" data-navbarbg="skin5">
		<nav class="navbar top-navbar navbar-expand-md navbar-dark">
			<div class="navbar-header" data-logobg="skin5">
				<!-- ============================================================== -->
				<!-- Logo -->
				<!-- ============================================================== -->
				<router-link
					:to="{ name: 'home' }"
					class="navbar-brand"
					href="index.html"
				>
					<!-- Logo icon -->
					<b class="logo-icon ps-2">
						<!--You can put here icon as well // <i class="wi wi-sunset"></i> //-->
						<!-- Dark Logo icon -->
						<img
							src="../../../public/frontend/assets/images/logo-icon.png"
							alt="homepage"
							class="light-logo"
							width="25"
						/>
					</b>
					<!--End Logo icon -->
					<!-- Logo text -->

					<span
						v-if="is_admin_authenticate"
						class="logo-text ms-2 light-logo text-danger mt-2"
					>
						<!-- dark text -->
						Admin Portal
					</span>
					<span
						v-else-if="is_user_authenticate"
						class="logo-text ms-2 light-logo text-danger mt-2"
					>
						<!-- dark text -->
						User Portal
					</span>
					<span v-else class="logo-text ms-2 light-logo text-danger mt-2">
						<!-- dark text -->
						Admin & User Portal
					</span>
					<!-- Logo icon -->
					<!-- <b class="logo-icon"> -->
					<!--You can put here icon as well // <i class="wi wi-sunset"></i> //-->
					<!-- Dark Logo icon -->
					<!-- <img src="../../../public/frontend/assets/images/logo-text.png" alt="homepage" class="light-logo" /> -->

					<!-- </b> -->
					<!--End Logo icon -->
				</router-link>
				<!-- ============================================================== -->
				<!-- End Logo -->
				<!-- ============================================================== -->
				<!-- ============================================================== -->
				<!-- Toggle which is visible on mobile only -->
				<!-- ============================================================== -->
				<a
					class="nav-toggler waves-effect waves-light d-block d-md-none"
					href="javascript:void(0)"
					><i class="ti-menu ti-close"></i
				></a>
			</div>
			<!-- ============================================================== -->
			<!-- End Logo -->
			<!-- ============================================================== -->
			<div
				class="navbar-collapse collapse"
				id="navbarSupportedContent"
				data-navbarbg="skin5"
			>
				<!-- ============================================================== -->
				<!-- toggle and nav items -->
				<!-- ============================================================== -->
				<ul class="navbar-nav float-start me-auto">
					<li class="nav-item d-none d-lg-block">
						<a
							class="nav-link sidebartoggler waves-effect waves-light"
							href="javascript:void(0)"
							data-sidebartype="mini-sidebar"
							><i class="mdi mdi-menu font-24"></i
						></a>
					</li>
					<!-- ============================================================== -->
					<!-- create new -->
					<!-- ============================================================== -->
					<li
						v-if="is_admin_authenticate || is_user_authenticate"
						class="nav-item dropdown"
					>
						<a
							class="nav-link dropdown-toggle"
							href="#"
							id="navbarDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<span class="d-none d-md-block"
								>Posts <i class="fa fa-angle-down"></i
							></span>
							<span class="d-block d-md-none"><i class="fa fa-plus"></i></span>
						</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
							<li><hr class="dropdown-divider" /></li>
							<li v-if="is_user_authenticate">
								<router-link
									:to="{ name: 'add_post_by_admin' }"
									class="dropdown-item"
								>
									Add Post</router-link
								>
							</li>
							<li><hr class="dropdown-divider" /></li>
							<li v-if="is_user_authenticate">
								<router-link
									:to="{ name: 'show_posts_for_admin_and_user' }"
									class="dropdown-item"
								>
									View All Posts</router-link
								>
							</li>
							<li><hr class="dropdown-divider" /></li>
						</ul>
					</li>
					<!-- ============================================================== -->
					<!-- Search -->
					<!-- ============================================================== -->
				</ul>
				<ul
					v-if="is_admin_authenticate || is_user_authenticate"
					class="navbar-nav float-start me-auto"
				>
					<li class="nav-item d-flex align-items-center">
						<input
							style="width: 400px"
							type="text"
							class="form-control"
							placeholder="Search &amp; Enter"
							:value="search_value"
							@keyup.enter="onChangeSearchValue"
						/>
					</li>
				</ul>
				<!-- ============================================================== -->
				<!-- Right side toggle and nav items -->
				<!-- ============================================================== -->
				<ul
					v-if="is_admin_authenticate || is_user_authenticate"
					class="navbar-nav float-end"
				>
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
							href="#"
							id="navbarDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<img
								src="../../../public/frontend/assets/images/users/1.jpg"
								alt="user"
								class="rounded-circle"
								width="31"
							/>
							{{ user_data.name }} ({{ user_data.email }})
						</a>
						<ul
							class="dropdown-menu dropdown-menu-end user-dd animated"
							aria-labelledby="navbarDropdown"
						>
							<div class="dropdown-divider"></div>
							<span
								@click="onLogOut"
								style="cursor: pointer"
								:class="{
									disable_btn: is_btn_deactive,
									'dropdown-item': true
								}"
								href="javascript:void(0)"
								><i class="fa fa-power-off me-1 ms-1"></i> Logout</span
							>
							<div class="dropdown-divider"></div>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
import useIsAuthenticateComposable from '../../composables/getters/is_authenticate_composable';
import useLogOutComposable from '../../composables/log_out_composable';
import usePostListComposable from '../../composables/post_list_composable';
import { log_out_ } from '../../services/generel';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
	name: 'TopbarComponent',
	setup() {
		const store = useStore();
		const router = useRouter();
		const { is_admin_authenticate, is_user_authenticate, user_data } =
			useIsAuthenticateComposable();

		const { log_out, is_btn_deactive } = useLogOutComposable();

		const { search_value } = usePostListComposable();

		const onLogOut = () => {
			log_out_(is_admin_authenticate, is_user_authenticate, user_data, log_out);
		};

		const onChangeSearchValue = event => {
			//event.preventDefault();
			store.commit('post_module/cheange_search_value', event.target.value);
			router.push({ name: 'show_posts_for_admin_and_user' });
		};

		return {
			is_admin_authenticate,
			is_user_authenticate,
			user_data,
			onLogOut,
			is_btn_deactive,
			onChangeSearchValue,
			search_value
		};
	}
};
</script>

<style scoped>
li .router-link-exact-active {
	background: #27a9e3;
	color: #ffffff;
}
.disable_btn {
	cursor: not-allowed;
	pointer-events: none;

	/*Button disabled - CSS color class*/
	color: #c0c0c0;
	background-color: #ffffff;
}
</style>
