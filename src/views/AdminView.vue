<template>
  <div v-if="ready">
    <div v-if="usersOccasions.length != 0">
      <p>
        {{$t('greeting')}} {{ currentUser.firstName }},      
      <br>{{$t('adminView.message')}}
      </p>
    </div>
    <div v-if="usersOccasions.length == 0">
      <p>
        {{$t('greeting')}} {{ currentUser.firstName }}, 
        <br>{{$t('adminView.noEventsMessage')}}
      </p>
    </div>
    <v-container>
      <v-row>
        <v-col
          xs="12"
          sm="6"
          md="6"
          lg="4"
          class="mx-auto"
          v-for="occ in usersOccasions"
          :key="occ.id"
        >
          <OcasionCard :occasionCardDetails="occ"></OcasionCard>
        </v-col>
      </v-row>
    </v-container>
    <div>
      <v-btn color="primary" to="createOccasion">{{$t('adminView.newOccasionBtn')}}</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAllOccasionsForUser } from "@/api/Occasions.api";
import OcasionCard from "@/components/OccasionCard.vue";

export default {
  components: { OcasionCard },

  data() {
    return {
      ready: false,
      usersOccasions: [],
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {},
  created: async function () {
    let userId = this.currentUser.userId;

    await getAllOccasionsForUser("v1", userId)
      .then((res) => {
        if (res.status == 200) {
          this.usersOccasions = res.data.map((a) => ({
            id: a.id,
            eventName: a.eventName,
            eventCode: a.eventCode,
            eventDate: a.eventDate.substr(0, 10),
            eventLocation: a.eventLocation,
            deadline: a.deadLine.substr(0, 10),
          }));
        }
      })
      .catch();
  },
  mounted() {
    this.ready = true;
  },
};
</script>

<style></style>
