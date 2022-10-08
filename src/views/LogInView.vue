<template>
  <div @keyup.enter="submit" v-if="dataReady">
    <v-alert type="error" :value="!backendReachable">{{$t('loginScreen.backendNotReachable')}}</v-alert>
    <v-alert type="warning" prominent :value="!cookiesEnabled">
      {{$t('loginScreen.technicalCookiesRequired')}}
    </v-alert>
    <v-card flat max-width="500">
      <v-card-title>
        <p>{{$t('loginScreen.title')}}</p>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" class="px-4">
          <v-text-field
            :label="$t('loginScreen.usernameLabel')"
            :rules="[rules.required]"
            v-model="payload.username"
          ></v-text-field>
          <v-text-field
            :label="$t('loginScreen.passwordLabel')"
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
            >{{$t('loginScreen.loginButtonLabel')}}</v-btn
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
      this.backendReachable = false;
      this.error = err
    });
    this.cookiesEnabled = navigator.cookieEnabled;
    this.dataReady = true;
  },
};
</script>

<style></style>
