<template>
  <div @keyup.enter="submit" v-if="dataReady">
    {{error}}
    <!-- <div>backendReachable {{backendReachable}}</div>
    <div>cookieEnabled {{cookiesEnabled}}</div> -->
    <v-alert type="error" :value="!backendReachable">An error has occured. Please make sure Cross-Site communication is enabled.</v-alert>
    <v-alert type="error" dismissible :value="loginFailed.failed">
      {{ loginFailed.message }}
    </v-alert>
    <v-alert type="warning" prominent :value="!cookiesEnabled">
      This app requires cookies to function. Please enable them to continue.
    </v-alert>
    <v-card flat max-width="500">
      <v-card-title>
        <p>Please Login</p>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" class="px-4">
          <v-text-field
            label="Username"
            :rules="[rules.required]"
            v-model="payload.username"
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="payload.password"
            :rules="[rules.required]"
            :type="show ? 'text' : 'password'"
            append-icon="mdi-eye"
            @click:append="show = !show"
          ></v-text-field>

          <v-btn
            color="primary"
            :loading="dataSent"
            @click.prevent="submit"
            :disabled="!validation"
            >login</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getAPIServiceStatus } from "@/api/ServiceStatus.Api";

export default {
  data() {
    return {
      payload: {
        username: "",
        password: "",
      },
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      valid: false,
      dataSent: false,
      cookiesEnabled: false,
      backendReachable : false,
      dataReady: false,
      error:""
    };
  },
  computed: {
    ...mapGetters({ loginFailed: "hasLoginFailed" }),
    validation: function () {
      return this.valid && this.cookiesEnabled && this.backendReachable
    },
  },
  methods: {
    ...mapActions(["performLogIn"]),
    async submit() {
      if (this.validation) {
        this.performLogIn(this.payload);
        this.dataSent = true;
      }
    },
  },
  watch: {
    loginFailed() {
      if (this.loginFailed.failed == true) {
        this.dataSent = false;
      }
    },
  },
  async mounted() {
    await getAPIServiceStatus().then((res) => {
      if(res.status == 200) this.backendReachable = true;
    }).catch( err => {
      console.log(err.code);
      this.backendReachable = false;
      this.error = err
    });
    this.cookiesEnabled = navigator.cookieEnabled;
    this.dataReady = true;
  },
};
</script>

<style></style>
