import { reactive, ref, watch, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useNotifyGetterComposable from "./getters/notify_getter_composable";
import {
  setTimeout_,
  cheange_response_message_and_error_messages_from_server,
} from "../services/generel";

export default function useSignUpComposable() {
  const store = useStore();
  const router = useRouter();
  const { timeout, response_message } = useNotifyGetterComposable();

  const error_messages = reactive({
    name: "",
    email: "",
    password: "",
  });

  const inputed_sign_up_form_data = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const validation_errors = ref(false);
  let from_submmited_with_no_error = false;
  const is_submit_btn_deactive = ref(true);

  function sign_up_validation(sign_up_inputed_form_data) {
    error_messages.name = "";
    error_messages.email = "";
    error_messages.password = "";
    validation_errors.value = false;

    if (sign_up_inputed_form_data.name == "") {
      error_messages.name = "Name is Required!";
      validation_errors.value = true;
    }
    if (sign_up_inputed_form_data.email == "") {
      error_messages.email = "Email is Required!";
      validation_errors.value = true;
    }
    if (sign_up_inputed_form_data.password == "") {
      error_messages.password = "Password and Confirm Password are Required!";
      validation_errors.value = true;
    }
    if (sign_up_inputed_form_data.password_confirmation == "") {
      error_messages.password = "Password and Confirm Password are Required!";
      validation_errors.value = true;
    }
    if (
      sign_up_inputed_form_data.password !=
      sign_up_inputed_form_data.password_confirmation
    ) {
      error_messages.password =
        "Password and Confirm Password are not Matched!";
      validation_errors.value = true;
    }
  }

  watch(inputed_sign_up_form_data, (new_inputed_sign_up_form_data) => {
    if (from_submmited_with_no_error == false) {
      sign_up_validation(new_inputed_sign_up_form_data);
      if (validation_errors.value == false) {
        is_submit_btn_deactive.value = false;
      } else {
        is_submit_btn_deactive.value = true;
      }
    }

    from_submmited_with_no_error = false;
  });

  watch(response_message, (new_response_message) => {
    if (
      new_response_message == "Loading..." ||
      (new_response_message == "" &&
        inputed_sign_up_form_data.name == "" &&
        inputed_sign_up_form_data.email == "" &&
        inputed_sign_up_form_data.password == "" &&
        inputed_sign_up_form_data.password_confirmation == "") ||
      new_response_message != ""
    ) {
      is_submit_btn_deactive.value = true;
    } else {
      is_submit_btn_deactive.value = false;
    }
  });

  const remove_inputed_sign_up_form_data = () => {
    inputed_sign_up_form_data.name = "";
    inputed_sign_up_form_data.email = "";
    inputed_sign_up_form_data.password = "";
    inputed_sign_up_form_data.password_confirmation = "";
    from_submmited_with_no_error = true;
  };

  const onSignUp = async (payload) => {
    if (
      error_messages.name == "" &&
      error_messages.email == "" &&
      error_messages.password == ""
    ) {
      cheange_response_message_and_error_messages_from_server("Loading...", []);

      let all_errors = [];
      let is_server_or_net_on = true;
      try {
        // await sign_up(payload);
        await store.dispatch("authentication_module/sign_up", payload);
      } catch (error) {
        if (error.code == "ERR_BAD_RESPONSE" || error.code == "ERR_NETWORK") {
          is_server_or_net_on = false;
        } else {
          let errors = error.response.data.errors;
          for (const key in errors) {
            all_errors.push(errors[key][0]);
          }
        }
      }
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
          remove_inputed_sign_up_form_data();
          cheange_response_message_and_error_messages_from_server(
            "Your Account is Successfully Created!",
            []
          );

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
    onSignUp,
    inputed_sign_up_form_data,
    is_submit_btn_deactive,
  };
}
