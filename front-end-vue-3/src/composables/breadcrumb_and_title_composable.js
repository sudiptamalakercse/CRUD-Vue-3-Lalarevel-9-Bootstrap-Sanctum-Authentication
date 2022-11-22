import { useStore } from 'vuex';
import { computed } from 'vue';

export default function useBreadcrumbAndTitle() {
	const store = useStore();

	function cheange_breadcrumb_links(links) {
		store.dispatch('breadcrumb_module/cheange_breadcrumb_links', links);
	}

	function cheange_breadcrumb_heading_and_title_heading(heading) {
		document.title = heading;
		store.dispatch('breadcrumb_module/cheange_breadcrumb_heading', heading);
	}

	const bread_crumb_links = computed(
		() => store.state.breadcrumb_module.bread_crumb_links
	);

	const bread_crumb_heading = computed(
		() => store.state.breadcrumb_module.bread_crumb_heading
	);

	return {
		bread_crumb_links,
		bread_crumb_heading,
		cheange_breadcrumb_links,
		cheange_breadcrumb_heading_and_title_heading
	};
}
