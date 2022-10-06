<template>
  <div>
    <div>
      <h3>{{$t('registrantView.greeting')}} {{ currentUser.firstName }},</h3>
      <p>{{$t('registrantView.message')}}</p>
    </div>

    <div>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card>
              <v-toolbar dark flat color="primary">
                <v-toolbar-title>{{$t('registrantView.customersCard.title')}}</v-toolbar-title>
              </v-toolbar>
              <v-card-actions>
                <v-btn color="primary" small text to="registerclient"
                  >Add Customer</v-btn
                >
                <v-btn color="secondary" small text to="customers"
                  >View Customer</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-toolbar dark flat color="primary">
                <v-toolbar-title>Access User</v-toolbar-title>
              </v-toolbar>
              <v-card-actions>
                <v-btn color="primary" small text>Add User</v-btn>
                <v-btn color="secondary" small text>View User</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-toolbar dark flat color="primary">
                <v-toolbar-title>Occasions</v-toolbar-title>
              </v-toolbar>
              <v-card-actions>
                <v-btn color="primary" small text>Add Occasion</v-btn>
                <v-btn color="secondary" small text>View Occasion</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            ><v-card>
              <v-toolbar dark flat color="primary">
                <v-toolbar-title>Guest</v-toolbar-title>
              </v-toolbar>
              <v-card-actions>
                <v-btn color="primary" small text>Add Guest</v-btn>
                <v-btn color="secondary" small text>View Guest</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["currentUser"]),
  },
};
</script>

<style scoped></style>
