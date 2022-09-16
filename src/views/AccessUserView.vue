<template>
  <div v-if="dataReady">
   <AccessUserCard v-if="accessUser.id" :accessUser=accessUser></AccessUserCard>
    <div v-if="!accessUser.id">
        <p>Access user has not registered yet.</p>
        <v-btn color="primary">create user</v-btn>
    </div>
  </div>
</template>

<script>
import { getAccessUserByClientId } from "@/api/AccessUser.Api";
import AccessUserCard from "@/components/AccessUserCard.vue"

export default {
    components: {AccessUserCard},
  data() {
    return {
      accessUser: {},
      dataReady: false
    };
  },
  async mounted() {
    await getAccessUserByClientId("v1", this.$route.params.customerId).then(
      (res) => {
        if (res.status == 200) {
          this.accessUser = res.data;          
        }
      }
    );
    this.dataReady = true;
  },
};
</script>

<style></style>
