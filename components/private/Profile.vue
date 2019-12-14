<template>
  <div class="container">
    <h2 class="display-2">
      {{ $t("abs.hello") + " " + $store.state.auth.user.name }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "profile"
};
</script>

<style></style>
