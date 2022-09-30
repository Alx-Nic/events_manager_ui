<template>
  <div v-if="ready">
    <v-container grid-list-xs>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            name="CustomersName"
            label="Customers Name"
            id="CustomersName"
            v-model="payload.customerName"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            type="number"
            name="NumberOfEvents"
            label="Number of Events"
            id="NumberOfEvents"
            v-model.number="payload.numberOfEvents"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            name="CustomersReference"
            label="Customers Reference"
            id="CustomersReference"
            v-model="payload.customerReference"
          ></v-text-field></v-col
      ></v-row>
      <v-btn color="primary" v-on:click.prevent="submit">Save</v-btn>
    </v-container>
  </div>
</template>

<script>
import { putCustomer } from "@/api/Customers.Api";

export default {
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
        payload:{},
        ready:false
    }
  },
  methods: {
    submit: async function(){
        putCustomer('v1', this.payload)
        setTimeout(() => this.$router.go(-1), 3000);
    }
  },
  mounted() {    
    this.payload.id = this.client.id
    this.payload.customerName = this.client.customerName
    this.payload.numberOfEvents = this.client.numberOfEvents
    this.payload.customerReference = this.client.customerReference
    console.log(this.payload);
    this.ready = true
  },
};
</script>

<style></style>
