<template>
  <div>
    <p>home view</p>
  </div>
</template>

<script>
import router from '@/router';
import { mapGetters } from 'vuex';

export default {
  name: "HomeView",
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted() {
    switch (this.currentUser.role) {
      case 'Admin':
        router.push('/AdminView')
        break;
      case 'Registrant':
        router.push('/RegistrantView')
        break;    
      default:
        console.log('Role not defined. Define how do you want to continue.');
        break;
    }
  },
};
</script>
