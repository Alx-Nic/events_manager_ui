<template>
  <div @keyup.enter="submit">
    <v-alert type="error" dismissible :value="loginFailed.failed">
     {{loginFailed.message}}
    </v-alert>
    <v-card flat max-width="500">
      <v-card-title>
        <p>Please Login</p>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" class="px-4" >
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
          
          <v-btn :loading="dataSent"  @click.prevent="submit" :disabled="!valid" color="primary"
            >login</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
      dataSent: false
    };
  },
  computed: {
    ...mapGetters({loginFailed: 'hasLoginFailed'})
  },
  methods: {
    ...mapActions(["performLogIn"]),
    async submit() {
      if (this.valid) 
      {
        this.performLogIn(this.payload);
        this.dataSent = true
        
      }
    },
  },
  watch: {
    loginFailed(){
      if (this.loginFailed.failed == true) {
        this.dataSent = false
      }
    }
  },
  mounted() {
  },
};
</script>

<style></style>
