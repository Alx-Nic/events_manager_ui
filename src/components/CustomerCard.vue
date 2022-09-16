<template>
  <v-card min-width="280px" max-width="400px">
    <v-app-bar flat color="light-blue">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-toolbar-title class="white--text">
        {{ customer.customerName }}
      </v-toolbar-title>
    </v-app-bar>

    <v-card-text>
      <div>Customer reference : {{ customer.customerReference }}</div>
      <div>Number of events : {{ customer.numberOfEvents }}</div>
      <div>Date created : {{ customer.dateCreated }}</div>
      <div>Date last modified : {{ customer.dateModified }}</div>
      <div>Invite code : {{ customer.inviteCode }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn small tile color="primary" @click.prevent="createInviteCode"
        >Invite link</v-btn
      >
      <v-btn
        x-small        
        tile
        color="secondary"
        :to="{
          name: 'viewAccessUser',
          params: { customerId: customer.id },
        }"
        >View user</v-btn
      >
      <v-btn x-small tile color="secondary">View Occasions</v-btn>
    </v-card-actions>
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
    customer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
    };
  },
  methods: {
    getInviteCode() {
      return (
        location.origin +
        "/register?inviteCode=" +
        encodeURIComponent(this.customer.inviteCode)
      );
    },
    createInviteCode() {
      let inviteCode = this.getInviteCode();
      navigator.clipboard.writeText(inviteCode);
      this.snackbar = true;
    },
  },
};
</script>

<style></style>
