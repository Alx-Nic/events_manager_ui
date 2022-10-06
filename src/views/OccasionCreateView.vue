<template>
  <div>
    <div v-if="!postSubmit">
      <v-card flat>
        <v-form v-model="valid">
          <v-container>
            <v-col cols="12" lg="10">
              <v-text-field
                :rules="[rules.required]"
                v-model="payload.eventName"
                :label="$t('occasionCreate.eventNameLbl')"
              ></v-text-field>

              <datePicker
                v-model="payload.eventDate"
                :rules="[rules.required]"
                :label="$t('occasionCreate.eventDateLbl')"
              >
              </datePicker>

              <v-textarea
                v-model="payload.eventLocation"
                :label="$t('occasionCreate.eventLocation')"
                :rules="[rules.required]"
              ></v-textarea>

              <datePicker
                v-model="payload.deadLine"
                :label="$t('occasionCreate.deadLine')"
              ></datePicker>

              <v-btn v-on:click="submit" color="primary" :disabled="!valid"
                >{{$t('submit')}}</v-btn
              >
            </v-col>
          </v-container>
        </v-form>
      </v-card>
    </div>

    <div v-if="postSubmit">
      <v-alert prominent type="success">
       {{$t('occasionCreate.succesfullCreate')}}
      </v-alert>
    </div>
  </div>
</template>

<script>
import datePicker from "@/components/DatePicker.vue";
import { postOccasion } from "@/api/Occasions.api";

export default {
  components: { datePicker },
  data() {
    return {
      postSubmit: false,
      valid: false,
      payload: {
        eventName: "",
        eventDate: "",
        eventLocation: "",
        deadLine: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    submit: async function () {
      if (this.valid) {
        await postOccasion("v1", this.payload).then((res) => {
          if (res.status == 200) {
            this.postSubmit = true;
            setTimeout(() => this.$router.go(-1), 3000);
          }
        });
      }
    },
  },
  watch: {
    eventdate: function () {
      console.log(this.eventdate);
    },
  },
};
</script>

<style></style>
