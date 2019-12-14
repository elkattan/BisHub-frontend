<template>
  <div class="login-container" dir="auto">
    <h2 class="display-2 mb-4">{{ $t("auth.login.title") }}</h2>
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

      <v-btn block color="primary" @click="login" :loading="loading">{{
        $t("auth.login.action")
      }}</v-btn>
    </v-form>
    <!-- Info Notification -->
    <v-snackbar v-model="notifyInfo.show" right>
      <v-icon>mdi-alert-circle</v-icon>
      {{ notifyInfo.text }}
    </v-snackbar>

    <!-- Error Notification -->
    <v-snackbar v-model="notifyError.show" color="error" right>
      <v-icon>mdi-alert</v-icon>
      {{ notifyError.text }}
    </v-snackbar>
  </div>
</template>

<script>
import { API_URL } from "~/utils/vars";

export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    showPass: false,
    loading: false,
    notifyInfo: {
      show: false,
      text: ""
    },
    notifyError: {
      show: false,
      text: ""
    }
  }),
  methods: {
    required(value) {
      return !!value || this.$t("validation.required");
    },
    async login() {
      this.loading = true;
      // Validation
      if (this.username.length > 3 && this.password.length > 5) {
        // Requesting
        const res = await this.$axios
          .post(`${API_URL}/api/users/login`, {
            username: this.username,
            password: this.password
          })
          .catch(err => {
            if (this.$nuxt.isOffline) {
              this.notifyInfo.text = this.$t("error.offline");
              this.notifyInfo.show = true;
            } else {
              this.notifyError.text = this.$t("error.auth");
              this.notifyError.show = true;
            }
          });
        // Error Handling

        if (res && res.status >= 200) {
          this.$store.commit("auth/setUser", res.data);
        }
      }
      this.loading = false;
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
