<template>
  <v-card class="mx-auto my-5" width="310">
    <v-app-bar flat color="#6A76AB">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-toolbar-title>
        {{ occasionCardDetails.eventName }}
      </v-toolbar-title>
    </v-app-bar>
    <v-card-subtitle>
      <div>
        Location : <b>{{ occasionCardDetails.eventLocation }}</b>
      </div>
    </v-card-subtitle >
    <v-container class="mt-n6">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <div>Event date:</div>
            <div>
              <b>{{ occasionCardDetails.eventDate }}</b>
            </div>
            <div>Deadline:</div>
            <div>
              <b>{{ occasionCardDetails.deadline }}</b>
            </div>
          </v-col>

          <v-col cols="3" class="px-1">
            <div>Guests</div>
            <div>
              <v-btn
                icon
                color="blue"
                :to="{
                  name: 'GuestsView',
                  params: { id: occasionCardDetails.id },
                }"
                ><v-icon>mdi-eye</v-icon></v-btn
              >
            </div>
          </v-col>

          <v-col cols="3" class="px-1">
            <div>Share</div>
            <div>
              <v-btn icon color="blue" @click.prevent="copyLinkToClipboard"
                ><v-icon>mdi-export-variant</v-icon></v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-container>

    <v-snackbar v-model="snackbar">
      Link copied to clipboard.
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  props: {
    occasionCardDetails: {},
  },
  data() {
    return {
      shareLink: "",
      snackbar: false,
    };
  },
  methods: {
    copyLinkToClipboard: function () {
      console.log(this.shareLink);
      navigator.clipboard.writeText(this.shareLink);
      this.snackbar = true;
    },
  },
  created: async function () {
    // console.log("Received Data: ");
    // console.log(this.occasionCardDetails);
    this.shareLink =
      location.origin +
      "/registerguest?eventcode=" +
      encodeURIComponent(this.occasionCardDetails.eventCode);
  },
  mounted() {},
};
</script>

<style></style>
