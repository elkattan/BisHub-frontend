<template>
  <div>
    <div class="home-container ms-12 mt-12 ps-12">
      <Profile v-if="selected === 'news'" />
      <InstructorList v-else-if="selected === 'instructors'" />
      <StudentList v-else-if="selected === 'students'" />
    </div>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      :right="$vuetify.rtl"
      absolute
      permanent
    >
      <v-list-item>
        <v-list-item-avatar color="info">
          <span class="white--text headline">{{
            user.name.split(" ")[0][0].toUpperCase() +
              user.name.split(" ")[1][0].toUpperCase()
          }}</span>
        </v-list-item-avatar>

        <v-list-item-title>{{ user.name }}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="selected = item.select"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text icon color="secondary" v-on="on" @click="logout">
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("auth.logout.action") }}</span>
          </v-tooltip>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- Info Notification -->
    <v-snackbar v-model="notifyInfo.show" top right>
      {{ notifyInfo.text }}
      <v-icon color="white">{{ notifyInfo.icon }}</v-icon>
    </v-snackbar>
  </div>
</template>

<script>
import InstructorList from "~/components/private/InstructorList";
import StudentList from "~/components/private/StudentList";
import Profile from "~/components/private/Profile";

export default {
  name: "Home",
  data() {
    return {
      drawer: false,
      mini: true,
      selected: "news",
      items: [
        {
          title: this.$t("home.menu.news"),
          icon: "mdi-comment-quote",
          select: "news"
        },
        {
          title: this.$t("home.menu.findInstructor"),
          icon: "mdi-account-group-outline",
          select: "instructors"
        },
        {
          title: this.$t("home.menu.findStudent"),
          icon: "mdi-school",
          select: "students"
        }
      ],
      notifyInfo: {
        show: false,
        text: "",
        icon: "mdi-alert-circle"
      }
    };
  },
  created() {
    this.notifyInfo.text = this.$t("abs.welcome") + ` ${this.user.name}`;
    this.notifyInfo.icon = "mdi-emoticon-excited";
    this.notifyInfo.show = true;
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logout() {
      this.$store.commit("auth/setUser", null);
    },
    getRandomColor() {
      let colors = ["error", "indiago", "success", "accent", "warning", "info"];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  },
  components: {
    InstructorList,
    StudentList,
    Profile
  }
};
</script>

<style scoped></style>
