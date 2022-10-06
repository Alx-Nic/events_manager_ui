<template>
  <div>
    <div v-if="!postSubmission">
      <v-card flat>
        <v-card-title primary-title> {{$t("registerGuest.title")}}</v-card-title>
        <v-form v-model="valid" class="px-4">
          <v-container>
            <v-row> </v-row>

            <v-col cols="12" lg="10">
              <v-text-field
                :label="$t('registerGuest.eventCodeLbl')"
                v-model="payload.eventCode"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                :label="$t('email')"
                v-model="payload.emailAddress"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                :label="$t('firstName')"
                v-model="payload.firstName"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                :label="$t('lastName')"
                v-model="payload.lastName"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                :label="$t('phoneNumber')"
                v-model="payload.phoneNumber"
                :rules="[rules.required]"
              ></v-text-field>

              <v-select
                :items="selectParticipatingStatus"
                :rules="[rules.required]"
                v-model="payload.participatingStatus"
                :label="$t('registerGuest.participatingStatusLbl')"
              ></v-select>
              <v-row>
                <v-col cols="4">
                  <v-select
                    :disabled="disableNotNecessaryFields"
                    :items="numberPersons"
                    v-model="payload.babies"
                    append-icon="mdi-human-baby-changing-table"
                    :label="$t('registerGuest.babies')"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    :disabled="disableNotNecessaryFields"
                    :items="numberPersons"
                    v-model="payload.childrens"
                    append-icon="mdi-human-male-child"
                    :label="$t('registerGuest.childrens')"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    :disabled="disableNotNecessaryFields"
                    :items="numberPersons"
                    v-model="payload.adults"
                    append-icon="mdi-human-male-female"
                    :rules="[rules.required]"
                    :label="$t('registerGuest.adults')"
                  ></v-select>
                </v-col>
              </v-row>

              <v-textarea
                :label="$t('registerGuest.specialRequest')"
                v-model="payload.specialNotes"
              ></v-textarea>
              <v-btn
                :loading="loading"
                :disabled="!valid"
                class="mt-4"
                color="primary"
                @click.prevent="submit"
                >{{$t('submit')}}</v-btn
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
        {{$t('registerGuest.thankYouMessage')}}
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
      numberPersons: [{ text: "0", value: 0 }, 1, 2, 3, 4, 5, 6],
      valid: false,
      payload: {},
      disableNotNecessaryFields: false,
      items: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
        { text: "Maybee", value: "Maybee" },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
      loading: false,
      errorMessage: "",
      errorPosting: false,
    };
  },
  methods: {
    submit: async function () {
      this.loading = true;
      await postNewGuest("v1", this.payload)
        .then((res) => {
          if (res.status == 200) {
            this.postSubmission = true;
          }
        })
        .catch((res) => {
          (this.loading = false),
            (this.errorPosting = true),
            (this.errorMessage = res.message);
        });
    },
  },
  computed: {
    selectParticipatingStatus: function(){
      return [
        { text: this.$t('yes'), value: "Yes" },
        { text: this.$t('no'), value: "No" },
        { text: this.$t('maybee'), value: "Maybee" },
      ]
    }
  },
  watch: {
    "payload.participatingStatus": function (val) {
      if (val == "No") {
        this.payload.adults = 1;
        this.disableNotNecessaryFields = true;
      } else {
        this.disableNotNecessaryFields = false;
      }
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
