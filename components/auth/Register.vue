<template>
  <div class="register-container">
    <v-row>
      <v-icon
        class="display-1 mb-3 mr-2"
        v-show="showSpecialized"
        @click="showSpecialized = false"
        >{{ $vuetify.rtl ? "mdi-arrow-right" : "mdi-arrow-left" }}</v-icon
      >

      <h2 class="display-1 mb-4">
        {{
          $t("auth.register.title") +
            (showSpecialized
              ? ` | ${
                  isInstructor ? $t("role.instructor") : $t("role.student")
                }`
              : "")
        }}
      </h2>
    </v-row>

    <v-form>
      <div v-show="!showSpecialized">
        <v-text-field
          v-model="username"
          :label="$t('auth.register.fields.username.label')"
          :rules="[required, validLength4]"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :label="$t('auth.register.fields.email.label')"
          :rules="[required, validMail]"
          type="email"
        ></v-text-field>

        <v-row fluid>
          <v-text-field
            v-model="password"
            :label="$t('auth.register.fields.password.label')"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[required]"
            :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
            class="pr-6"
          ></v-text-field>

          <v-text-field
            v-model="rePassword"
            :label="$t('auth.register.fields.rePassword.label')"
            :append-icon="showRePass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[required, passMissMatch]"
            :type="showRePass ? 'text' : 'password'"
            @click:append="showRePass = !showRePass"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-switch
            v-model="isInstructor"
            :label="
              ` ${$t('abs.iam')} ${
                isInstructor ? $t('role.instructor') : $t('role.student')
              } `
            "
          ></v-switch>
          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                large
                fab
                v-on="on"
                @click="showSpecialized = true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("abs.next") }}</span>
          </v-tooltip>
        </v-row>
      </div>

      <div class="specialized-form" v-show="showSpecialized">
        <v-text-field
          v-model="fullName"
          :label="$t('auth.register.fields.name.label')"
          :rules="[required, validLength10]"
        ></v-text-field>

        <v-text-field
          v-model="citizenId"
          :label="$t('auth.register.fields.citizenId.label')"
          :rules="[required]"
          counter="14"
        ></v-text-field>

        <div v-show="isInstructor">
          <v-menu
            ref="birthMenu"
            :close-on-content-click="false"
            :return-value.sync="birthDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="birthDate"
                :label="$t('auth.register.fields.birthDate.label')"
                prepend-icon="mdi-cake"
                :rules="[required]"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="birthDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="$refs.birthMenu.save(birthDate)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>

          <v-menu
            ref="graduationMenu"
            :close-on-content-click="false"
            :return-value.sync="graduationDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="graduationDate"
                :label="$t('auth.register.fields.graduationDate.label')"
                prepend-icon="mdi-school"
                :rules="[required]"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="graduationDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="$refs.graduationMenu.save(graduationDate)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>

          <v-text-field
            v-model="subject"
            :label="$t('auth.register.fields.subject.label')"
            :rules="[required, validLength4]"
          ></v-text-field>
          <v-textarea
            v-model="bio"
            :label="$t('auth.register.fields.bio.label')"
            :rules="[validLength10]"
            counter="200"
          ></v-textarea>
        </div>

        <div v-show="!isInstructor">
          <v-row>
            <v-text-field
              v-model="studentId"
              :label="$t('auth.register.fields.studentId.label')"
              :rules="[required]"
              type="number"
              class="pr-4"
            ></v-text-field>
            <v-text-field
              v-model="level"
              :label="$t('auth.register.fields.level.label')"
              :rules="[required]"
              type="number"
              class="pr-4"
            ></v-text-field>

            <v-text-field
              v-model="gpa"
              :label="$t('auth.register.fields.gpa.label')"
              :rules="[required]"
              type="number"
            ></v-text-field>
          </v-row>

          <v-textarea
            v-model="status"
            :label="$t('auth.register.fields.status.label')"
            :rules="[validLength10]"
            counter="100"
          ></v-textarea>
        </div>

        <v-btn block color="primary" :loading="loading" @click="signup">{{
          $t("auth.register.action")
        }}</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { API_URL } from "~/utils/vars";

export default {
  name: "Register",
  data: () => ({
    fullName: "",
    username: "",
    citizenId: "",
    email: "",
    password: "",
    rePassword: "",
    isInstructor: false,

    subject: "",
    bio: "",
    birthDate: null,
    graduationDate: null,

    studentId: null,
    level: 1,
    gpa: 4.0,
    status: "",

    showPass: false,
    showRePass: false,
    showSpecialized: false,
    loading: false
  }),
  methods: {
    required(val) {
      return !!val || this.$t("validation.required");
    },
    passMissMatch(val) {
      return this.password === val || this.$t("validation.passMissMatch");
    },
    validLength4(val) {
      return (val || "").length > 3 || this.$t("validation.invalidLength");
    },
    validLength10(val) {
      return (val || "").length > 9 || this.$t("validation.invalidLength");
    },
    validMail(val) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(val) || this.$t("validation.invalidEmail");
    },
    async signup() {
      this.loading = true;
      console.log("SIGNING UP", this.validMail(this.email));

      // Validation
      if (
        this.username.length > 3 &&
        this.password.length > 5 &&
        this.password === this.rePassword &&
        this.validMail(this.email) === true &&
        this.fullName.length > 10 &&
        this.citizenId.length === 14
      ) {
        console.log("USER VALID");

        const now = new Date();
        if (
          this.isInstructor &&
          (!this.birthDate ||
          !this.graduationDate ||
          now.getFullYear() - 35 > this.birthDate.getFullYear() || // Can not be more than 35 years old
          now.getFullYear() - 18 < this.birthDate.getFullYear() || // Can not be younger Than 18...
          now.getFullYear() - 6 > this.graduationDate.getFullYear() || // Graduated 6 Years ago MAX
          now.getFullYear() < this.graduationDate.getFullYear() || // Graduated at most the past year
            this.subject.length <= 3)
        ) {
          console.log("INSTRUCTOR INVALID");

          return; // Instructor is selected but data is not valid
        } else if (
          isNaN(this.gpa) ||
          isNaN(this.studentId) ||
          isNaN(this.level) ||
          this.level > 4 ||
          this.level < 1 ||
          this.gpa > 4 ||
          this.gpa < 1
        ) {
          console.log("STUDENT INVALID");

          return; // student is selected but data is not valid
        }
        console.log("REQUESTING");

        // Requesting
        await this.submit();
      }
      this.loading = false;
    },
    async submit() {
      let payload = {
        username: this.username,
        password: this.password,
        email: this.email,
        citizen_id: this.citizenId,
        image_url: ""
      };
      if (this.isInstructor) {
        payload.instructor = {
          name: this.name,
          birth_date: `${this.birthDate.getFullYear()}-${this.birthDate.getMonth() +
            1}-${this.birthDate.getDate()}`,
          graduation_date: `${this.graduationDate.getFullYear()}-${this.graduationDate.getMonth() +
            1}-${this.graduationDate.getDate()}`,
          subject: this.subject,
          bio: this.bio
        };
      } else {
        payload.student = {
          id: this.studentId,
          name: this.fullName,
          level: this.level,
          gpa: this.gpa,
          status: this.status
        };
      }
      const { data, status } = await this.$axios.post(
        `${API_URL}/api/users/register`,
        payload
      );

      // Error Handling
      console.log(status, data);

      if (status >= 200) {
        this.$store.commit("auth/setUser", data);
      }
      console.log("AUTH: ", this.$store.state.auth.user);
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  margin: 0 4rem;
  padding: 4rem 0;
}
.specialized-form > button {
  margin-top: 4rem;
}
</style>
