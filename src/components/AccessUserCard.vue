<template>
   <v-card max-width="380px">
      <v-app-bar flat color="light-blue">
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>
        <v-toolbar-title class="white--text">
          {{ accessUser.firstName }} {{accessUser.lastName}}
        </v-toolbar-title>
      </v-app-bar>
      <v-card-text>
        <div>user name: <b>{{ accessUser.userName }}</b></div>
        <div>email: <b>{{accessUser.email}}</b></div>
        <div>phone number: <b>{{accessUser.phoneNumber}}</b></div>
        <div>role: <b>{{accessUser.role}}</b></div>
        <div>email confirmed: <b>{{accessUser.emailVerified}}</b></div>
      </v-card-text>
      <v-card-actions>   
        <v-btn color="primary" tile small>edit user</v-btn>
        <v-btn color="secondary" tile x-small>delete user</v-btn>
        <v-btn color="secondary" tile x-small >reset password</v-btn>
        
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props:{
        accessUser:{
            type: Object,
            required: true
        }
    }

}
</script>

<style>

</style>