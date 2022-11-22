import { createStore } from 'vuex';
import breadcrumb_module from './modules/page_breadcrumb/index';
import authentication_module from './modules/authentication/index';
import notify_module from './modules/notify/index';
import post_module from './modules/post/index';

export default createStore({
	modules: {
		breadcrumb_module,
		authentication_module,
		notify_module,
		post_module
	}
});
