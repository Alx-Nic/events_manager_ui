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

      <!-- <v-btn @click.prevent="dialog=true" icon>
        <v-icon color="white">mdi-translate</v-icon>
      </v-btn> -->

      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="pickedLanguage">
            <v-list-item
              v-for="(language, index) in availableLanguages"
              :key="index"
            >
              <v-list-item-title>{{ language }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn
        @click.prevent="logMeOut"
        icon
        v-if="!routes.includes(this.$route.name)"
      >
        <v-icon color="white">mdi-logout-variant</v-icon>
      </v-btn >      
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
      availableLanguages: [],
      pickedLanguage: "",
      browserLanguage: "",
    };
  },
  methods: {
    ...mapActions(["logout"]),
    logMeOut: function () {
      this.logout();
    },
    setLanguage(language) {
      this.$root.$i18n.locale = language;
      this.$vuetify.lang.current = language;
    },
  },
  watch: {
    pickedLanguage: function (val) {
      this.setLanguage(this.availableLanguages[val]);
      // this.$root.$i18n.locale = this.availableLanguages[val];
      // this.$vuetify.lang.current = this.availableLanguages[val];
    },
  },
  mounted() {
    this.availableLanguages = this.$root.$i18n.availableLocales;
    this.browserLanguage = window.navigator.language.substring(0, 2);

    if (this.availableLanguages.includes(this.browserLanguage)) {
      this.setLanguage(this.browserLanguage);
      console.log("Language auto match:" + this.browserLanguage);
    }
  },
};
</script>

<style></style>
