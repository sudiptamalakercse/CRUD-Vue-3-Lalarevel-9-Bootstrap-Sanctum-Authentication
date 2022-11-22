<template>
	<!-- ============================================================== -->
	<!-- Preloader - style you can find in spinners.css -->
	<!-- ============================================================== -->
	<!-- ============================================================== -->
	<!-- Preloader - style you can find in spinners.css -->
	<!-- ============================================================== -->
	<PreloaderComponent></PreloaderComponent>
	<!-- ============================================================== -->
	<!-- Main wrapper - style you can find in pages.scss -->
	<!-- ============================================================== -->
	<div
		id="main-wrapper"
		data-layout="vertical"
		data-navbarbg="skin5"
		data-sidebartype="full"
		data-sidebar-position="absolute"
		data-header-position="absolute"
		data-boxed-layout="full"
	>
		<!-- ============================================================== -->
		<!-- Topbar header - style you can find in pages.scss -->
		<!-- ============================================================== -->
		<TopbarComponent></TopbarComponent>
		<!-- ============================================================== -->
		<!-- End Topbar header -->
		<!-- ============================================================== -->
		<!-- ============================================================== -->
		<!-- Left Sidebar - style you can find in sidebar.scss  -->
		<!-- ============================================================== -->
		<LeftSidebarComponent></LeftSidebarComponent>
		<!-- ============================================================== -->
		<!-- End Left Sidebar - style you can find in sidebar.scss  -->
		<!-- ============================================================== -->
		<!-- ============================================================== -->
		<!-- Page wrapper  -->
		<!-- ============================================================== -->
		<div class="page-wrapper">
			<!-- ============================================================== -->
			<!-- Bread crumb and right sidebar toggle -->
			<!-- ============================================================== -->
			<!-- have to use vuex store to update informations in PageBreadcrumbComponent -->
			<PageBreadcrumbComponent></PageBreadcrumbComponent>
			<!-- ============================================================== -->
			<!-- End Bread crumb and right sidebar toggle -->
			<!-- ============================================================== -->
			<!-- ============================================================== -->
			<!-- Container fluid  -->
			<!-- ============================================================== -->

			<div class="container-fluid">
				<!-- Alert Component -->
				<AlertComponent
					v-if="error_messages_from_server.length > 0 || response_message"
				></AlertComponent>
				<router-view />
			</div>
			<!-- ============================================================== -->
			<!-- End Container fluid  -->
			<!-- ============================================================== -->
			<!-- ============================================================== -->
			<!-- footer -->
			<!-- ============================================================== -->
			<FooterComponent></FooterComponent>
			<!-- ============================================================== -->
			<!-- End footer -->
			<!-- ============================================================== -->
		</div>
		<!-- ============================================================== -->
		<!-- End Page wrapper  -->
		<!-- ============================================================== -->
	</div>
	<!-- ============================================================== -->
	<!-- End Wrapper -->
	<!-- ============================================================== -->

	<!-- built files will be auto injected -->
</template>

<script>
import PreloaderComponent from '@/components/frontend/PreloaderComponent.vue';
import TopbarComponent from '@/components/frontend/TopbarComponent.vue';
import LeftSidebarComponent from '@/components/frontend/LeftSidebarComponent.vue';
import PageBreadcrumbComponent from '@/components/frontend/PageBreadcrumbComponent.vue';
import FooterComponent from '@/components/frontend/FooterComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import useNotifyGetterComposable from '../composables/getters/notify_getter_composable';

export default {
	name: 'MasterComponent',
	components: {
		PreloaderComponent,
		TopbarComponent,
		LeftSidebarComponent,
		PageBreadcrumbComponent,
		FooterComponent,
		AlertComponent
	},
	setup() {
		const { error_messages_from_server, response_message, all_errors } =
			useNotifyGetterComposable();

		return {
			error_messages_from_server,
			response_message,
			all_errors
		};
	}
};
</script>

<style></style>
