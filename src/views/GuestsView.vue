<template>
  <div v-if="ready">
    <div v-if="totalAnswers == 0">
      <p>No guest has responded to you invitation.</p>
    </div>

    <div>
      <v-card max-width="320px" v-if="totalAnswers >0" flat>
        <v-card-title primary-title>
          Total number of guests: {{ totalNumberOfGuests }}
        </v-card-title>

        <v-card-subtitle>Total answers: {{ totalAnswers }}</v-card-subtitle>
        <v-card-text>
          <v-container class="d-flex justify-start mt-n3">
            <p class="mx-3">{{ totalNumberOfAdults }} Adults</p>
            <p class="mx-3">{{ totalNumberOfChildrens }} Childrens</p>
            <p class="mx-3">{{ totalNumberOfBabies }} Babies</p>
          </v-container>
        </v-card-text>
        <v-card-actions class="mt-n10">
          <v-btn color="blue" class="white--text">email report</v-btn>
        </v-card-actions>
      </v-card>

      <v-container v-if="totalAnswers > 0">
        <v-row>
          <v-col
            xs="12"
            sm="6"
            md="4"
            lg="4"
            v-for="guest in filteredGuests"
            :key="guest.id"
          >
            <GuestCard :guest="guest"></GuestCard>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-app-bar fixed bottom>
      <v-toolbar-title> Answers </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-badge color="success" overlap offset-x="25" offset-y="20">
        <span slot="badge">{{ participatingGuests.length }}</span>
        <v-btn icon @click="one = !one" :color="one ? 'primary' : 'grey'">
          <v-icon>mdi-account-check-outline</v-icon>
        </v-btn>
      </v-badge>

      <v-badge color="error" overlap offset-x="25" offset-y="20">
        <span slot="badge">{{ decliningGuests.length }}</span>
        <v-btn icon @click="two = !two" :color="two ? 'primary' : 'grey'">
          <v-icon>mdi-account-remove</v-icon>
        </v-btn>
      </v-badge>

      <v-badge color="orange" overlap offset-x="25" offset-y="20">
        <span slot="badge">{{ unsureGuests.length }}</span>
        <v-btn icon @click="three = !three" :color="three ? 'primary' : 'grey'">
          <v-icon>mdi-account-clock-outline</v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>
  </div>
</template>

<script>
import GuestCard from "@/components/GuestCard.vue";
import { getAllGuestByOccasionId } from "@/api/Guests.Api";

export default {
  components: { GuestCard },
  data() {
    return {
      one: true,
      two: true,
      three: true,
      ready: false,
      guests: [],
      totalGuests: 0,
      totalAnswers: 0,
      participatingGuests: [],
      decliningGuests: [],
      unsureGuests: [],
      selectedFilters: ['Yes', 'No', 'Maybee'],
    };
  },
  computed: {
    computedSelection() {
      let selection = [];

      if (this.one) {
        selection.push('Yes');
      }
      if (this.two) {
        selection.push('No');
      }
      if (this.three) {
        selection.push('Maybee');
      }
      return selection;
    },
    filteredGuests() {
      return this.guests.filter((guest) =>
        this.computedSelection.includes(guest.participatingStatus)
      );
    },
    totalNumberOfGuests() {
      let numberOfGuests = 0;

      if (this.guests.length != 0) {
        this.guests.forEach((x) => {
          numberOfGuests += x.totalPersons;
        });
      }
      return numberOfGuests;
    },
    totalNumberOfBabies() {
      let baby = 0;

      if (this.guests.length != 0) {
        this.guests.forEach((x) => {
          baby += x.babies;
        });
      }

      return baby;
    },
    totalNumberOfChildrens() {
      let child = 0;
      if (this.guests.length != 0) {
        this.guests.forEach((x) => {
          child += x.childrens;
        });
      }

      return child;
    },
    totalNumberOfAdults() {
      let adults = 0;
      if (this.guests.length != 0) {
        this.guests.forEach((x) => {
          adults += x.adults;
        });
      }

      return adults;
    },
  },
  created: async function () {
    await getAllGuestByOccasionId("v1", this.$route.params.id).then((res) => {
      if (res.status === 200) {
        //this.guests = res.data;
        //console.log(this.data);
        this.guests = res.data.map((x) => ({
          firstName: x.firstName,
          lastName: x.lastName,
          phoneNumber: x.phoneNumber,
          emailAddress: x.emailAddress,
          participatingStatus: x.participatingStatus,
          specialNotes: x.specialNotes,
          babies: x.babies,
          childrens: x.childrens,
          adults: x.adults,
          eventCode: x.eventCode,
          totalPersons: x.babies + x.childrens + x.adults,
        }));

        this.totalAnswers = this.guests.length;

        this.totalGuests = this.guests.forEach((x) => {
          this.totalGuests += x.totalPersons;
        });

        this.decliningGuests = this.guests.filter(
          (x) => x.participatingStatus == 'No'
        );
        this.participatingGuests = this.guests.filter(
          (x) => x.participatingStatus == 'Yes'
        );
        this.unsureGuests = this.guests.filter(
          (x) => x.participatingStatus == 'Maybee'
        );
      }
    });

    this.ready = true;
  },
  mounted() {},
};
</script>

<style></style>