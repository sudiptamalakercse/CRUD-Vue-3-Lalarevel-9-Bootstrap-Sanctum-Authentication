<template>
  <MasterComponent></MasterComponent>
</template>

<script>
import { useStore } from "vuex";
import MasterComponent from "@/views/MasterComponent.vue";

export default {
  components: {
    MasterComponent,
  },
  setup() {
    const store = useStore();
    store.dispatch("authentication_module/auto_log_in");
  },
};
</script>

<style></style>
