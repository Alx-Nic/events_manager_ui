<template>
  <v-app>
    <myNavBar></myNavBar>
    <v-main>
      <v-container fluid>
        <v-alert type="error" :value="backendError.hasError" dismissible>
        {{backendError.errorMessage}}
        </v-alert>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import  myNavBar from "@/components/system/myNavBar.vue";
import { mapGetters } from "vuex";

export default {
  components: { myNavBar },
  name: "App",
  data: () => ({}),
  computed: {
    ...mapGetters(['backendError'])
  }
};
</script>
