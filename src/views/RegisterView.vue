<template>
  <div>
    <div v-if="preSubmit">
      <v-alert dismissible prominent type="error" v-model="userNameError" >
        {{$t('registerView.usernameInUse')}}<br>{{$t('registerView.usernameInUsePt2')}}
      </v-alert>

      <v-card flat class="mx-auto">
        <v-card-title>{{$t('register')}}</v-card-title>
        <v-card-subtitle
          >{{$t('registerView.subtitle')}}</v-card-subtitle
        >
        <v-form v-model="valid" class="px-4">
          <v-container>
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                :label="$t('inviteCode')"
                v-model="payload.InviteCode"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                :error="userNameError"
                :label="$t('usernameLbl')"
                v-model="payload.UserName"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                @click:append="show = !show"
                v-model="payload.Password"
                :label="$t('passwordLbl')"
                append-icon="mdi-eye"
                :type="!show ? 'password' : 'text'"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                :label="$t('email')"
                v-model="payload.Email"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                :label="$t('firstName')"
                v-model="payload.FirstName"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                :label="$t('lastName')"
                v-model="payload.LastName"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                :label="$t('phoneNumber')"
                v-model="payload.PhoneNumber"
                :rules="[rules.required]"
              ></v-text-field>

              <v-btn
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
    </div>
    <div v-if="!preSubmit">
      <v-alert prominent type="success">
        {{$t('registerView.thankYouMessage')}} <br />
        {{$t('registerView.thankYouMessagePt2')}}
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
