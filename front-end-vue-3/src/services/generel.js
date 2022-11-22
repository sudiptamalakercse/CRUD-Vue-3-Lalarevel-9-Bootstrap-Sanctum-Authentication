import store from "../store/index";

const set_page_num_after_deleting_record = (
  response,
  search_value,
  axios_object,
  recent_page_value,
  onShowPostList,
  ids_for_delete,
  all_select
) => {
  if (response.status == 200 && response.statusText == "OK") {
    let request_link = null;

    if (search_value.value) {
      request_link = `posts/search/${search_value.value}`;
    } else {
      request_link = "posts";
    }

    axios_object
      .get(request_link)
      .then(function (res) {
        if (res.status == 200 && res.statusText == "OK") {
          let total_records = res.data.meta.total;

          let records_per_page = res.data.meta.per_page;

          let total_page_num = Math.ceil(total_records / records_per_page);

          let page = null;

          if (recent_page_value.value <= total_page_num) {
            page = recent_page_value.value;
          } else {
            page = total_page_num;
          }

          onShowPostList(page);

          if (ids_for_delete != null) {
            ids_for_delete.value = [];
          }

          if (all_select != null) {
            all_select.value = false;
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        onShowPostList();
      });
  }
};
const toUpperCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const setTimeout_ = (time) => {
  let timeout = setTimeout(() => {
    store.commit("notify_module/cheange_error_messages_from_server", []);
    store.commit("notify_module/cheange_response_message", "");
  }, time);
  store.commit("notify_module/cheange_timeout", timeout);
};

const cheange_response_message_and_error_messages_from_server = (
  response_message = "",
  error_messages_from_server = []
) => {
  store.commit("notify_module/cheange_response_message", response_message);

  store.commit(
    "notify_module/cheange_error_messages_from_server",
    error_messages_from_server
  );
};

const is_authenticate = (user_type) => {
  let user_data = store.state.authentication_module.user_data;
  if (user_data.user_type == user_type && user_data.token != "") {
    return true;
  } else {
    return false;
  }
};

const log_out_ = (
  is_admin_authenticate,
  is_user_authenticate,
  user_data,
  log_out
) => {
  let user_type = null;
  if (is_admin_authenticate.value) {
    user_type = "admin";
  } else if (is_user_authenticate.value) {
    user_type = "user";
  }
  log_out({
    request_link: `logout/${user_type}`,
    user_type: user_type,
    token: user_data.value.token,
  });
};

export {
  set_page_num_after_deleting_record,
  toUpperCase,
  setTimeout_,
  cheange_response_message_and_error_messages_from_server,
  is_authenticate,
  log_out_,
};
