<template>
  <div>
    <div v-if="preSubmit">
      <v-alert dismissible prominent type="error" v-model="userNameError" >
        Username already in use.<br>Please chose another one.
      </v-alert>

      <v-card flat class="mx-auto">
        <v-card-title>Register </v-card-title>
        <v-card-subtitle
          >Please use the invite code given for registering</v-card-subtitle
        >
        <v-form v-model="valid" class="px-4">
          <v-container>
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                label="Invite Code"
                v-model="payload.InviteCode"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                :error="userNameError"
                label="User Name"
                v-model="payload.UserName"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                @click:append="show = !show"
                v-model="payload.Password"
                label="Password"
                append-icon="mdi-eye"
                :type="!show ? 'password' : 'text'"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                label="E-mail"
                v-model="payload.Email"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                label="First Name"
                v-model="payload.FirstName"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                label="Last Name"
                v-model="payload.LastName"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                label="Phone Number"
                v-model="payload.PhoneNumber"
                :rules="[rules.required]"
              ></v-text-field>

              <v-btn
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
    </div>
    <div v-if="!preSubmit">
      <v-alert prominent type="success">
        Thank you for registering ! <br />
        You will be redirected to the login screen.
      </v-alert>
    </div>
  </div>
</template>

<script>
import { postAccessUser } from "@/api/AccessUser.Api";

export default {
  data() {
    return {
      userNameError: false,
      accessUserId: "",
      preSubmit: true,
      valid: "",
      show: false,
      payload: {},
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    async submit() {
      console.log(this.payload);
      await postAccessUser("v1", this.payload)
        .then((res) => {
          this.preSubmit = false;
          this.accessUserid = res.data;
          setTimeout(() => this.$router.push("login"), 4000);
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.status == 409) {
            this.valid = false;
            this.userNameError = true
          }
        });
    },
  },
  mounted() {
    if (this.$route.query.inviteCode != null) {
      this.payload.InviteCode = decodeURIComponent(
        this.$route.query.inviteCode        
      );
    }    
  },
};
</script>

<style></style>
