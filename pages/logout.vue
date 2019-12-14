<template>
  <div></div>
</template>

<script>
export default {
  name: "logout",
  created() {
    this.$store.commit("auth/setUser", null);
    this.$router.replace({ name: "index" });
  }
};
</script>

<style></style>
