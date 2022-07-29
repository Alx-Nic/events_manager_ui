<template>
  <div>
    <div v-show="preSubmit">
      <v-card flat>
        <v-card-title> Register Client </v-card-title>
        <v-form class="px-4" v-model="valid">
          <v-container>
            <v-col cols="12" lg="10">
              <v-text-field
                label="Customer`s name"
                v-model="payload.customerName"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                label="Customer`s reference"
                v-model="payload.customerReference"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                v-model="payload.numberOfEvents"
                label="Number of events"
                type="number"
                :rules="[rules.required]"
              ></v-text-field>

              <v-btn
                @click.prevent="submit"
                :disabled="!valid"
                class="mt-4"
                color="primary"
                >Submit</v-btn
              >
            </v-col>
          </v-container>
        </v-form>
      </v-card>
      <v-alert dismissible type="error" v-model="errorPosting">
        {{ errorMessage }}
      </v-alert>
    </div>

    <div v-show="!preSubmit">
      <v-alert type="success" dismissible>
        Client correctly registered.
      </v-alert>
      <v-container>
        <v-col>
          <v-card>
            <v-card-title primary-title>
              {{ customer.customerName }}
            </v-card-title>
            <v-card-subtitle>
              Number of Events : {{ customer.numberOfEvents }}
            </v-card-subtitle>
            <v-card-actions class="mx-auto">
              <v-btn outlined color="primary" @click="createInviteCode">
                Get Invite Code
                <v-icon right>mdi-qrcode-scan</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-container>

      <v-snackbar v-model="snackbar">
        Link copied to clipboard.
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { postNewCustomer, getCustomerById } from "@/api/Customers.Api";

export default {
  data() {
    return {
      snackbar: false,
      errorPosting: false,
      errorMessage: "",
      valid: false,
      preSubmit: true,
      payload: {},
      rules: {
        required: (value) => !!value || "Required.",
      },
      customer: {},
    };
  },
  methods: {
    submit: async function () {
      if (this.valid) {
        await postNewCustomer("v1", this.payload)
          .then((res) => {
            let customerId = res.data;
            getCustomerById("v1", customerId).then((res) => {
              this.customer = res.data;
              this.preSubmit = false;
            });
          })
          .catch((res) => {
            this.errorPosting = true;
            this.errorMessage = res.message;
          });
      }
    },
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
