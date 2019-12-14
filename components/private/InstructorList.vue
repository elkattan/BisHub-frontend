<template>
  <v-container>
    <v-row justify="center">
      <v-subheader class="display-2 ma-6">{{
        $t("role.instructors")
      }}</v-subheader>

      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="(instructor, i) in instructors"
          :key="i"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="4" sm="2" md="1">
                <v-avatar size="54px" :color="getRandomColor()">
                  <span class="white--text headline"
                    >{{
                      instructor.name.split(" ")[0][0].toUpperCase() +
                        instructor.name.split(" ")[1][0].toUpperCase()
                    }}
                  </span>
                </v-avatar>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="3">
                <strong> {{ instructor.name }} </strong>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="3">
                <strong> {{ instructor.subject }} </strong>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="3">
                <strong>
                  Graduated
                  {{ new Date(instructor.graduation_date).toDateString() }}
                </strong>
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div class="pa-10">
              {{ instructor.bio }}
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="!user.isInstructor"
                @click="toggleFollow(instructor.id)"
                :loading="loading"
                :color="
                  user.student.instructors.includes(instructor.id)
                    ? 'error'
                    : 'success'
                "
                >{{
                  user.student.instructors.includes(instructor.id)
                    ? $t("action.unfollow")
                    : $t("action.follow")
                }}</v-btn
              >
            </v-card-actions>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <!-- Error Notification -->
    <v-snackbar v-model="notifyError.show" color="error" right>
      <v-icon>mdi-alert</v-icon>
      {{ notifyError.text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { API_URL } from "~/utils/vars";

export default {
  name: "instructorsList",
  data: () => ({
    instructors: [],
    loading: false,
    notifyError: {
      text: "",
      show: false
    }
  }),
  async created() {
    if (this.$store.state.auth.user) {
      const res = await this.$axios
        .get(`${API_URL}/api/instructors`, {
          headers: {
            Authorization: "Bearer " + this.$store.state.auth.user.accessToken
          }
        })
        .catch(err => {
          this.notifyError.text = this.$t("error.connection");
          this.notifyError.show = true;
        });
      if (res && res.status === 200) {
        for (let ins in res.data) {
          ins = res.data[ins];
          // Only add if it is not the current user
          if (this.user.isInstructor && ins.id === this.user.instructor.id)
            continue;
          this.instructors.push(ins);
        }
      }
    }
  },
  methods: {
    getRandomColor() {
      let colors = ["error", "indiago", "success", "secondary", "warning"];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    async toggleFollow(id) {
      this.loading = true;
      let res = null;
      if (this.user.student.instructors.includes(id)) {
        console.log("LSA");
        res = await this.$axios
          .delete(`${API_URL}/api/students/${this.user.student.id}/add/${id}`, {
            headers: {
              Authorization: "Bearer " + this.user.accessToken
            }
          })
          .catch(() => {
            this.notifyError.text = this.$t("error.connection");
            this.notifyError.show = true;
          });
      } else {
        res = await this.$axios
          .post(
            `${API_URL}/api/students/${this.user.student.id}/add/${id}`,
            {},
            {
              headers: {
                Authorization: "Bearer " + this.user.accessToken
              }
            }
          )
          .catch(() => {
            this.notifyError.text = this.$t("error.connection");
            this.notifyError.show = true;
          });
      }
      if (res && res.status === 200) {
        this.$store.commit("auth/updateStudent", res.data);
      }
      this.loading = false;
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  }
};
</script>

<style></style>
