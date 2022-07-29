<template>
  <div @keyup.enter="submit">
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
          
          <v-btn  @click.prevent="submit" :disabled="!valid" color="primary"
            >login</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
    };
  },
  methods: {
    ...mapActions(["performLogIn"]),
    async submit() {
      if (this.valid) this.performLogIn(this.payload);      
    },
  },
};
</script>

<style></style>
