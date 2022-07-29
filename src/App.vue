<template>
  <v-app>
    <myNavBar></myNavBar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import  myNavBar from "@/components/system/myNavBar.vue";

export default {
  components: { myNavBar },
  name: "App",
  data: () => ({}),
};
</script>
