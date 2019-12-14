<template>
  <div>
    <Home v-if="$store.state.auth.user" />
    <Auth v-else />
  </div>
</template>

<script>
import Auth from "~/components/auth/Auth";
import Home from "~/components/private/Home";

export default {
  head() {
    return { title: this.$t("home.title") };
  },
  components: {
    Auth,
    Home
  }
};
</script>

<style>
html {
  /* BackGround Colors*/
  --white-bg-color: #ffffff;
  --primary-bg-color: #0f111a;
  --secondary-bg-color: #0c0e15;
  --tertiary-bg-color: #0f2130;

  /* Text Colors */
  --white-text-color: #ffffff70;
  --primary-text-color: #777;

  /* Buttons Colors */
  --white-btn-color: #ffffff;
  --primary-btn-color: #0074d3;
}
</style>
