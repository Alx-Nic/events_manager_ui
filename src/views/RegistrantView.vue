<template>
  <div>
    <div>
      <h3>Hello {{ currentUser.firstName }},</h3>
      <p>Welcome to your dashboard. Here are some things for you:</p>
    </div>

    <div>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Customer</v-card-title>
              <v-card-actions>
                <v-btn color="primary" small text to="registerclient"
                  >Add Customer</v-btn
                >
                <v-btn color="primary" small text>View Customer</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Access User</v-card-title>
              <v-card-actions>
                <v-btn color="primary" small text>Add User</v-btn>
                <v-btn color="primary" small text>View User</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Occasions</v-card-title>
              <v-card-actions>
                <v-btn color="primary" small text>Add Occasion</v-btn>
                <v-btn color="primary" small text>View Occasion</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            ><v-card>
              <v-card-title>Guest</v-card-title>
              <v-card-actions>
                <v-btn color="primary" small text>Add Guest</v-btn>
                <v-btn color="primary" small text>View Guest</v-btn>
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
