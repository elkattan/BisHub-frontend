<template>
  <v-container>
    <v-row justify="center">
      <v-subheader class="display-2 ma-6">{{
        $t("role.students")
      }}</v-subheader>

      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="(student, i) in students"
          :key="i"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="4" sm="2" md="1">
                <v-avatar size="54px" :color="getRandomColor()">
                  <span class="white--text headline"
                    >{{
                      student.name.split(" ")[0][0].toUpperCase() +
                        student.name.split(" ")[1][0].toUpperCase()
                    }}
                  </span>
                </v-avatar>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="3">
                <strong> {{ student.name }} </strong>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="3">
                <strong> Level {{ student.level }} </strong>
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div class="pa-10">
              {{ student.status }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import { API_URL } from "~/utils/vars";

export default {
  name: "studentList",
  data: () => ({
    students: []
  }),
  async created() {
    if (this.user) {
      const res = await this.$axios
        .get(`${API_URL}/api/students`, {
          headers: {
            Authorization: "Bearer " + this.user.accessToken
          }
        })
        .catch(err => {
          console.error(err);
        });
      if (res && res.status === 200) {
        for (let st in res.data) {
          st = res.data[st];
          // Only add if it is not the current user
          if (!this.user.isInstructor && st.id === this.user.student.id)
            continue;
          this.students.push(st);
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
