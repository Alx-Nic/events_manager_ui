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
    </v-card-subtitle>
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
            <div>
              <v-btn icon color="blue" @click.prevent="qrCodeDialog = true"
                ><v-icon>mdi-qrcode-scan</v-icon></v-btn
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

    <v-dialog v-model="qrCodeDialog" >
      <v-card>
        <v-card-title primary-title> Share QrCode </v-card-title>
        <v-card-subtitle>
          <div>Use this qrcode to share your invitaion.</div>
        </v-card-subtitle>
        <v-card-text>
          <QrcodeVue
            :value="shareLink"
            :size="qrCodeSize"
            render-as="canvas"
          ></QrcodeVue>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="qrCodeDialog = !qrCodeDialog"
            >Close</v-btn
          >
        </v-card-actions>
        <br>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  props: {
    occasionCardDetails: {},
  },
  components: {
    QrcodeVue,
  },
  data() {
    return {
      qrCodeSize: 0,
      shareLink: "",
      qrCodeDialog: false,
      snackbar: false,
    };
  },
  methods: {
    copyLinkToClipboard: function () {
      navigator.clipboard.writeText(this.shareLink);
      this.snackbar = true;
    },
    computeScreenSize: function(screensize){
      return screensize > 500 ? 450 : screensize * 0.7;
    }
  },
  computed:{
    screenSize: function(){
      return this.$vuetify.breakpoint.width
    }
  },
  watch:{
    screenSize: function(val){
     this.qrCodeSize=  this.computeScreenSize(val)
    }
  },
  created: async function () {
    this.qrCodeSize =  this.computeScreenSize(this.screenSize);
   
    this.shareLink =
      location.origin +
      "/registerguest?eventcode=" +
      encodeURIComponent(this.occasionCardDetails.eventCode);
  },
  mounted() {},
};
</script>

<style></style>
