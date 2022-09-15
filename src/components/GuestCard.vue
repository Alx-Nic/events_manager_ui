<template>
  <v-card class="mx-auto my-2" min-height="220" min-width="280" max-width="360">
    <v-app-bar flat color="light-blue">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-toolbar-title class="white--text">
        {{ guest.firstName + " " + guest.lastName }}
      </v-toolbar-title>
    </v-app-bar>
    <v-card-subtitle>
      <div>Participating: {{ guest.participatingStatus }}</div>
      <div>
        <v-container>
          <v-row>
            <v-col>
              <v-icon>mdi-human-male-female</v-icon>
              <span>{{guest.adults}}</span>
            </v-col>
             <v-col>
              <v-icon>mdi-human-male-child</v-icon>
              <span>{{guest.childrens}}</span>
            </v-col>
            <v-col>
              <v-icon>mdi-human-baby-changing-table</v-icon>
              <span>{{ guest.babies }}</span>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div>Total persons: {{ guest.totalPersons }}</div>
      <div>Phone number: {{ guest.phoneNumber }}</div>
      <div>Email: {{ guest.emailAddress }}</div>
    </v-card-subtitle>

    <v-card-actions v-if="guest.specialNotes">
      <v-btn text color="blue accent-4" @click="reveal = !reveal">
        Special Request :
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-card
        flat
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-2">
          <p class="text-h6 text--primary">Special Request</p>
          <p>
            {{ guest.specialNotes }}
          </p>
        </v-card-text>
        <v-card-actions class="pt-0 ml-2">
          <v-btn color="blue" small @click="reveal = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    guest: {},
  },
  data() {
    return {
      initialData: {},
      shareLink: "",
      reveal: false,
    };
  },
  mounted() {
    //console.log(this.guest);
  },
};
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
