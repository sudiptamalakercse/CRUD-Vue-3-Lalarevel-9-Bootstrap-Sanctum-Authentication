<template>
	<div class="page-breadcrumb">
		<div class="row">
			<div class="col-12 d-flex no-block align-items-center">
				<h4 class="page-title">{{ bread_crumb_heading }}</h4>
				<div class="ms-auto text-end">
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							<li
								v-for="link in bread_crumb_links"
								:key="link.name_of_route"
								class="breadcrumb-item"
							>
								<a v-if="link.disabled == true">{{ link.name }}</a>

								<router-link
									v-else
									:to="{ name: link.name_of_route, params: { ...link.params } }"
									>{{ link.name }}</router-link
								>
							</li>
						</ol>
					</nav>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import useBreadcrumbAndTitle from '../../composables/breadcrumb_and_title_composable';

export default {
	name: 'PageBreadcrumbComponent',
	setup() {
		const { bread_crumb_links, bread_crumb_heading } = useBreadcrumbAndTitle();

		return {
			bread_crumb_links,
			bread_crumb_heading
		};
	}
};
</script>

<style></style>
