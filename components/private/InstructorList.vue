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
                :color="
                  user.student.instructors.includes(instructors.id)
                    ? 'error'
                    : 'success'
                "
                >{{
                  user.student.instructors.includes(instructors.id)
                    ? $t("action.unfollow")
                    : $t("action.follow")
                }}</v-btn
              >
            </v-card-actions>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import { API_URL } from "~/utils/vars";

export default {
  name: "instructorsList",
  data: () => ({
    instructors: []
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
          console.error(err);
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
