import { reactive, ref, watch, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useNotifyGetterComposable from "./getters/notify_getter_composable";
import axios_object_with_base_url_and_token_and_common_headers from "../services/axios_object_base_url_and_token_and_common_headers";
import {
  setTimeout_,
  cheange_response_message_and_error_messages_from_server,
} from "../services/generel";
import usePostGetterComposable from "./getters/post_getter_composable";

export default function useAddAndEditPostByAdminComposable() {
  const store = useStore();
  const router = useRouter();
  const { timeout, response_message, error_messages_from_server } =
    useNotifyGetterComposable();
  const { search_value } = usePostGetterComposable();

  const error_messages = reactive({
    task: "",
  });

  const inputed_add_and_edit_post_form_data = reactive({
    id: "",
    task: "",
  });

  const validation_errors = ref(false);
  let from_submmited_with_no_error = false;
  const is_submit_btn_deactive = ref(true);

  function add_and_edit_post_validation(add_and_edit_post_inputed_form_data) {
    error_messages.task = "";
    validation_errors.value = false;

    if (add_and_edit_post_inputed_form_data.task == "") {
      error_messages.task = "Task is Required!";
      validation_errors.value = true;
    }
  }

  watch(
    inputed_add_and_edit_post_form_data,
    (new_inputed_add_and_edit_post_form_data) => {
      if (from_submmited_with_no_error == false) {
        add_and_edit_post_validation(new_inputed_add_and_edit_post_form_data);
        if (validation_errors.value == false) {
          is_submit_btn_deactive.value = false;
        } else {
          is_submit_btn_deactive.value = true;
        }
      }

      from_submmited_with_no_error = false;
    }
  );

  watch(response_message, (new_response_message) => {
    if (
      new_response_message == "Loading..." ||
      (new_response_message == "" &&
        inputed_add_and_edit_post_form_data.task == "") ||
      new_response_message != ""
    ) {
      is_submit_btn_deactive.value = true;
    } else {
      is_submit_btn_deactive.value = false;
    }
  });

  const remove_inputed_add_and_edit_post_form_data = () => {
    inputed_add_and_edit_post_form_data.task = "";
    from_submmited_with_no_error = true;
  };

  const onAddOrEditPost = async (payload) => {
    let finally_done = false;

    if (error_messages.task == "") {
      cheange_response_message_and_error_messages_from_server("Loading...", []);

      let all_errors = [];
      let is_server_or_net_on = true;

      let axios_object =
        axios_object_with_base_url_and_token_and_common_headers(payload.token);

      let request_type_to_server = null;

      if (payload.action_type == "add") {
        request_type_to_server = "post";
        if (search_value.value == "") {
          store.commit("post_module/cheange_recent_page_value", 1);
        }
      } else if (payload.action_type == "update") {
        request_type_to_server = "put";
      }

      await axios_object[request_type_to_server](
        payload.request_link,
        payload.data
      )
        .then(function (response) {
          if (
            (response.status == 201 && response.statusText == "Created") ||
            (response.status == 200 && response.statusText == "OK")
          ) {
            finally_done = true;
          }
        })
        .catch(function (error) {
          if (error.code == "ERR_BAD_REQUEST") {
            if (error.response.data.message == "Unauthenticated.") {
              localStorage.removeItem("user_data");
              store.commit("authentication_module/set_user_data", {});
              router.push({ name: "home" });
            } else if (error.response.data.message == "Unauthorized!!") {
              let mess = error.response.data.message;
              cheange_response_message_and_error_messages_from_server("", [
                mess,
              ]);
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
          cheange_response_message_and_error_messages_from_server(
            "",
            all_errors
          );
          setTimeout_(5000);
        } else {
          remove_inputed_add_and_edit_post_form_data();

          if (finally_done == true) {
            if (payload.action_type == "add") {
              cheange_response_message_and_error_messages_from_server(
                "Your Record is Created Successfully!",
                []
              );
            } else if (payload.action_type == "update") {
              cheange_response_message_and_error_messages_from_server(
                "Your Record is Updated Successfully!",
                []
              );
            }
          } else if (error_messages_from_server.value.length == 0) {
            cheange_response_message_and_error_messages_from_server("", [
              "Wrong Occurs in Server!",
            ]);
          }

          setTimeout_(5000);
          router.push({ name: "show_posts_for_admin_and_user" });
        }
      }
    }
  };

  onUnmounted(() => {
    clearTimeout(timeout.value);
  });

  return {
    error_messages,
    validation_errors,
    onAddOrEditPost,
    inputed_add_and_edit_post_form_data,
    is_submit_btn_deactive,
  };
}
