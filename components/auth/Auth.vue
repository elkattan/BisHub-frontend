<template>
  <div class="auth-container">
    <v-row>
      <v-col
        class="auth-intro"
        :class="{ 'auth-intro-rtl': isRtl }"
        lg="6"
        md="6"
        sm="12"
        cols="12"
      >
        <h2 class="display-2 mb-12 intro-text">{{ $t("auth.header") }}</h2>
        <v-img contain width="50rem" :src="introImage" alt="Fill The Form" />
        <div class="intro-arrow" @click="scrolToHandlers">
          <v-icon large>mdi-chevron-double-down</v-icon>
        </div>
      </v-col>
      <v-col
        class="auth-handler"
        lg="6"
        md="6"
        sm="12"
        cols="12"
        ref="authHandler"
      >
        <v-tabs height="3rem" v-model="tab" grow centered center-active>
          <v-tab key="login">
            {{ $t("auth.login.title") }}<v-icon>mdi-account-key</v-icon>
          </v-tab>
          <v-tab key="register">
            {{ $t("auth.register.title")
            }}<v-icon>mdi-account-multiple-plus</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item key="login">
            <Login />
          </v-tab-item>
          <v-tab-item key="register">
            <Register />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Login from "~/components/auth/Login";
import Register from "~/components/auth/Register";

export default {
  name: "Auth",
  data: () => ({
    tab: null,
    introImage: ""
  }),
  created() {
    var images = [
      require("~/assets/images/welcoming.svg"),
      require("~/assets/images/fill_forms.svg"),
      require("~/assets/images/mobile_pay.svg"),
      require("~/assets/images/social_expert.svg"),
      require("~/assets/images/social_sharing.svg")
    ];
    this.introImage = images[Math.floor(Math.random() * images.length)];
    this.$vuetify.rtl = this.isRtl;
  },
  computed: {
    isRtl() {
      return this.$store.state.localization.rtl.includes(
        this.$store.state.localization.locale
      );
    }
  },
  methods: {
    scrolToHandlers() {
      this.$refs.authHandler.scrollIntoView();
    }
  },
  components: {
    Login,
    Register
  }
};
</script>

<style>
.auth-container {
  width: 100vw;
  background-color: var(--white-bg-color);
  overflow: auto;
}

.auth-intro {
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 50vw;
  border: none;
  border-top-right-radius: 5rem;
  border-bottom-right-radius: 5rem;
  background-color: var(--tertiary-bg-color);
  -webkit-box-shadow: 10px 0px 20px 5px rgba(0, 0, 0, 0.6);
  box-shadow: 10px 0px 20px 5px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.auth-intro-rtl {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 5rem;
  border-bottom-left-radius: 5rem;
}

.intro-text {
  color: var(--white-text-color);
  margin-top: 4rem;
  text-align: center;
  padding: 1vh 0;
}

.intro-ilustration {
  align-self: center;
  margin: 0 10%;
  width: 80%;
}

.intro-arrow {
  display: none;
  position: absolute;
  text-align: center;
  top: 85vh;
  left: 50%;
  transform: translateX(-50%);
}

.auth-handler {
  height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  width: 50vw;
  padding: 2rem 5%;
}

.v-tab > i {
  padding: 0 0.7rem;
}

.row {
  margin-left: 0;
  margin-right: 0;
}

@media screen and (max-width: 960px) {
  .auth-intro {
    width: 100vw;
    border-radius: 0;
    border-bottom-right-radius: 5rem;
    border-bottom-left-radius: 5rem;
  }

  .intro-arrow {
    display: block;
  }
}
</style>
