<template>
  <nav>
    <!-- <v-navigation-drawer v-model="drawer" app>
    </v-navigation-drawer> -->

    <v-app-bar
      flat
      dense
      app
      color="rgba(0,0,0,0.7)"
      :style="{ 'backdrop-filter': 'saturate(180%)' + 'blur(20px)' }"
    >
      <template> </template>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title class="white--text">RSVP</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-icon class="" large color="white">mdi-email-open-outline</v-icon>
      <v-spacer></v-spacer>

      <v-btn
        @click.prevent="logMeOut"
        icon
        v-show="!routes.includes(this.$route.name)"
      >
        <v-icon color="white">mdi-logout-variant</v-icon>
      </v-btn>

       <v-icon color="rgba(0,0,0,0.0)"
       v-show="routes.includes(this.$route.name)"
       >
        mdi-logout-variant
      </v-icon>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      routes: ["login", "registerGuest", "register"],
      drawer: null,
    };
  },
  methods: {
    ...mapActions(["logout"]),
    logMeOut: function () {
      this.logout();
    },
  },
};
</script>

<style></style>
