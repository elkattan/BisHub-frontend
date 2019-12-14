<template>
  <div class="login-container" dir="auto">
    <h2 class="title is-2">{{ $t("auth.login.title") }}</h2>
    <v-form>
      <v-text-field
        v-model="username"
        :label="$t('auth.login.fields.username.label')"
        :rules="[required]"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :label="$t('auth.login.fields.password.label')"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[required]"
        :type="showPass ? 'text' : 'password'"
        @click:append="showPass = !showPass"
      ></v-text-field>

      <v-btn block :loading="loading">{{ $t("auth.login.action") }}</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    showPass: false,
    loading: false
  }),
  methods: {
    required(value) {
      return !!value || this.$t("validation.required");
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  margin: 0 4rem;
  padding: 4rem 0;
}

.login-container button {
  margin-top: 2rem;
}

.login-container > * {
  padding: 1rem 0;
}
</style>
