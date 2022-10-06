import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import en  from 'vuetify/src/locale/en.ts'
import it  from 'vuetify/src/locale/it.ts'
import ro from 'vuetify/src/locale/ro.ts'

Vue.use(Vuetify);



export default new Vuetify({
    lang: {
        locales: { en, it,ro },
        current: 'en',
      },
});
