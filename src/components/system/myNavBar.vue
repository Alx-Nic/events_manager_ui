<template>
  <nav>
    <!-- <v-navigation-drawer v-model="drawer" app>
    </v-navigation-drawer> -->

    <v-app-bar prominent flat app color="white" src="https://picsum.photos/1920/1080?random">
    <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.6), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title class="white--text">Events Manger</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click.prevent="logMeOut" icon v-if="!routes.includes(this.$route.name)">
        <v-icon color="white">mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>   
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      routes:['login', 'registerguest', 'register'],
      drawer: null,
    };
  },
  methods: {
    ...mapActions(["logout"]),
    logMeOut: function(){
      this.logout();
    }
  }
};
</script>

<style></style>
