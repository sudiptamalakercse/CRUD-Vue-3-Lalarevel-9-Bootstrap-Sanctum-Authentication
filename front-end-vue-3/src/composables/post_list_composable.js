import { ref, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useNotifyGetterComposable from "./getters/notify_getter_composable";
import usePostGetterComposable from "./getters/post_getter_composable";
import useIsAuthenticateComposable from "../composables/getters/is_authenticate_composable";
import axios_object_with_base_url_and_token_and_common_headers from "../services/axios_object_base_url_and_token_and_common_headers";
import {
  setTimeout_,
  cheange_response_message_and_error_messages_from_server,
} from "../services/generel";
import useDeletePostByCheckboxComposable from "../composables/delete_post_by_checkbox";
import useDeleteSingleRecordComposable from "../composables/delete_single_record";

export default function usePostListComposable() {
  const store = useStore();
  const router = useRouter();
  const { timeout, response_message } = useNotifyGetterComposable();
  const { search_value } = usePostGetterComposable();
  const { user_data } = useIsAuthenticateComposable();

  const post_list = ref([]);
  const laravel_data = ref({});

  const is_btn_deactive = ref(true);

  const onShowPostList = async (page = 1) => {
    let finally_done = false;
    cheange_response_message_and_error_messages_from_server("Loading...", []);
    let all_errors = [];
    let is_server_or_net_on = true;

    let axios_object = axios_object_with_base_url_and_token_and_common_headers(
      user_data.value.token
    );

    store.commit("post_module/cheange_recent_page_value", page);

    all_select.value = false;

    ids_for_delete.value = [];

    let request_link = null;

    if (search_value.value) {
      request_link = `posts/search/${search_value.value}?page=${page}`;
    } else {
      request_link = `posts?page=${page}`;
    }

    await axios_object
      .get(request_link)
      .then(function (response) {
        console.log(response);
        if (response.status == 200 && response.statusText == "OK") {
          post_list.value = response.data.data;
          laravel_data.value = response.data;
          finally_done = true;
        }
      })
      .catch(function (error) {
        if (
          error.response.data.all_ok == "no" &&
          error.response.data.message == "Record is Not Found!"
        ) {
          post_list.value = [];
          laravel_data.value = error.response.data;
          finally_done = true;
          cheange_response_message_and_error_messages_from_server(
            error.response.data.message,
            []
          );
        }
        if (error.code == "ERR_BAD_REQUEST") {
          if (error.response.data.message == "Unauthenticated.") {
            localStorage.removeItem("user_data");
            store.commit("authentication_module/set_user_data", {});
            router.push({ name: "home" });
          }
        } else if (
          error.code == "ERR_BAD_RESPONSE" ||
          error.code == "ERR_NETWORK"
        ) {
          is_server_or_net_on = false;
        } else {
          let errors = error.response.data.errors;
          for (const key in errors) {
            all_errors.push(errors[key][0]);
          }
        }
      });

    if (is_server_or_net_on == false) {
      cheange_response_message_and_error_messages_from_server("", [
        "You Are Not Connected With Internet or Server is Down!",
      ]);
      setTimeout_(5000);
    } else {
      if (all_errors.length > 0) {
        cheange_response_message_and_error_messages_from_server("", all_errors);
        setTimeout_(5000);
      } else {
        if (finally_done == true) {
          if (post_list.value.length > 0) {
            cheange_response_message_and_error_messages_from_server(
              "Records are Loaded Successfully!",
              []
            );
          }
        } else {
          cheange_response_message_and_error_messages_from_server("", [
            "Wrong Occurs in Server!",
          ]);
        }

        setTimeout_(5000);
      }
    }
  };

  const change_search_value = (search_value) => {
    store.commit("post_module/cheange_search_value", search_value);
    onShowPostList();
  };

  watch(search_value, (new_search_value, old_search_value) => {
    if (new_search_value !== old_search_value) {
      all_select.value = false;
      ids_for_delete.value = [];
      onShowPostList();
    }
  });

  watch(response_message, (new_response_message) => {
    if (new_response_message == "Loading...") {
      is_btn_deactive.value = true;
    } else {
      is_btn_deactive.value = false;
    }
  });

  onUnmounted(() => {
    clearTimeout(timeout.value);
  });

  const {
    is_checked_delete_btn_deactive,
    delete_selected_posts,
    select_all_via_check_box,
    all_select,
    ids_for_delete,
  } = useDeletePostByCheckboxComposable(post_list, onShowPostList);

  const { delete_single_record } =
    useDeleteSingleRecordComposable(onShowPostList);

  return {
    onShowPostList,
    post_list,
    is_btn_deactive,
    laravel_data,
    change_search_value,
    search_value,
    is_checked_delete_btn_deactive,
    delete_selected_posts,
    delete_single_record,
    select_all_via_check_box,
    all_select,
    ids_for_delete,
  };
}
