<template>
  <div v-if="dataReady">
    <div>
      <h2>Registered clients:</h2>
    </div>
    <v-toolbar color="white" flat>
      <v-text-field
        rounded
        dense
        outlined
        hide-details="auto"
        name="search"
        label="Find client"
        v-model="textToSearch"
      ></v-text-field>
    </v-toolbar>
    <v-container fluid>
      <v-row justify="center">
        <v-col v-for="customer in filteredCustomers" :key="customer.id">
          <CustomerCard :customer="customer" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getAllCustomers } from "@/api/Customers.Api";
import CustomerCard from "@/components/CustomerCard.vue";

export default {
  components: {
    CustomerCard,
  },
  data() {
    return {
      textToSearch: "",
      dataReady: false,
      customers: [],
    };
  },
  computed: {
    filteredCustomers() {
      let filtered = this.customers.filter((c) => {
        return (
          c.customerName.toLowerCase().includes(this.textToSearch) ||
          c.customerReference.toLowerCase().includes(this.textToSearch)
        );
      });

      return filtered;
    },
  },
  created: async function () {
    await getAllCustomers("v1").then((res) => {
      if (res.status == 200) {
        this.customers = res.data.map((c) => ({
          id: c.id,
          customerName: c.customerName,
          customerReference: c.customerReference,
          inviteCode: c.inviteCode,
          numberOfEvents: c.numberOfEvents,
          dateCreated: c.dateCreated.substr(0, 10),
          dateModified: c.dateModified.substr(0, 10),
        }));
      }

      this.dataReady = true;
    });
  },
};
</script>

<style></style>
