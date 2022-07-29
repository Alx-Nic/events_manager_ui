<template v-if="ready">
  <div>
    <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :rules="[rules.required]"
          v-model="date"
          :label="label"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        @input="menu2 = false"
        :max="maxDate"
        :min="minDate"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: ['label'],
  data: () => ({
    date:'' 
    // new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    //   .toISOString()
    //   .substr(0, 10),
    ,
    menu2: false,
    minDate: "",
    maxDate: "",
    ready: false,
    rules: {
        required: (value) => !!value || "Required.",
      },
  }),
  methods: {},
  mounted() {
    var now = new Date(Date.now());
    var year = now.getFullYear();
    //var month = now.getMonth();
    //var day = now.getDate();
    this.minDate = new Date().toISOString().substring(0, 10);
    this.maxDate = new Date(year + 2, 11, 32).toISOString().substring(0, 10);

    this.ready = true;
  },
  watch: {
    date: function () {
      this.$emit("input", this.date);
    },
  },
};
</script>

<style></style>
