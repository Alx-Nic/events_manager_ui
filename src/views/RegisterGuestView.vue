<template>
  <div>
    <div v-if="!postSubmission">
      <v-card flat>
        <v-card-title primary-title> Register participation </v-card-title>
        <v-form v-model="valid" class="px-4">
          <v-container>
            <v-row> </v-row>

            <v-col cols="12" lg="10">
              <v-text-field
                label="Event Code"
                v-model="payload.eventCode"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                label="E-mail"
                v-model="payload.emailAddress"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                label="First Name"
                v-model="payload.firstName"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                label="Last Name"
                v-model="payload.lastName"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                label="Phone Number"
                v-model="payload.phoneNumber"
                :rules="[rules.required]"
              ></v-text-field>

              <v-select
                :items="items"
                :rules="[rules.required]"
                v-model="payload.participatingStatus"
                label="Participating status"
              ></v-select>
              <v-row>
                <v-col cols="4">
                  <v-select
                    :items="numberPersons"
                    v-model="payload.babies"
                    append-icon="mdi-human-baby-changing-table"
                    label="Babies"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    :items="numberPersons"
                    v-model="payload.childrens"
                    append-icon="mdi-human-male-child"
                    label="Childrens"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    :items="numberPersons"
                    v-model="payload.adults"
                    append-icon="mdi-human-male-female"
                    :rules="[rules.required]"
                    label="Adults"
                  ></v-select>
                </v-col>
              </v-row>

              <v-textarea
                label="Special requests"
                v-model="payload.specialNotes"
              ></v-textarea>
              <v-btn
                :loading="loading"
                :disabled="!valid"
                class="mt-4"
                color="primary"
                @click.prevent="submit"
                >Submit</v-btn
              >
            </v-col>
          </v-container>
        </v-form>
        <v-card-actions> </v-card-actions>
      </v-card>
       <v-alert dismissible type="error" v-model="errorPosting">
        {{ errorMessage }}
      </v-alert>
    </div>
    <div v-if="postSubmission">
      <v-alert prominent type="success">
        Grazie per aver registrato la tua risposta.
        <br />
        Una mail con tutti i dettagli è stata inviata al tuo indirizzo di posta
        elettronica
      </v-alert>
    </div>
  </div>
</template>

<script>
import { postNewGuest } from "@/api/Guests.Api";

export default {
  props: ["eventCode"],
  data() {
    return {
      postSubmission: false,
      numberPersons: [{ text: "none", value: 0 }, 1, 2, 3, 4, 5, 6],
      valid: false,
      payload: {},
      items: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
        { text: "Maybee", value: "Maybee" },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
      loading: false,
      errorMessage:"",
      errorPosting:false
    };
  },
  methods: {
    submit: async function () {
      this.loading = true;
      await postNewGuest("v1", this.payload).then((res) => {
        if (res.status == 200) {
          this.postSubmission = true;
        }
      }).catch((res) => {
        this.loading = false,
        this.errorPosting = true,
        this.errorMessage = res.message
      });
    },
  },
  mounted() {
    if (this.$route.query.eventcode != null) {
      console.log(this.$route.query.eventcode);
      this.payload.eventCode = decodeURIComponent(this.$route.query.eventcode);
    }
  },
};
</script>

<style></style>
