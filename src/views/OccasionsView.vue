<template>
  <div>
    <p>Occassions View</p>
    <OcasionCard></OcasionCard>
    <OcasionCard></OcasionCard>
    <OcasionCard></OcasionCard>
  </div>
</template>

<script>
import OcasionCard from "@/components/OccasionCard.vue";

export default {
  components: { OcasionCard },
  data() {
    return {
      initialData: {},
    };
  },
  mounted() {
    var mockdata = [
      {
        id: "5f32a4ff-2642-48bf-7a12-08da6e4be2ef",
        dateCreated: "2022-07-25T14:42:06.5329198",
        dateModified: "2022-07-25T14:42:06.5329198",
        modifiedBy: "string",
        eventCode: "aW7vvR7cGUSrrK0Z+2d/9Q",
        guests: null,
        eventDate: "2022-07-25T14:36:55.24",
        eventLocation: "CreatedFromAPI",
        deadLine: "2022-07-25T14:36:55.24",
      },
    ];

    this.initialData = mockdata;
  },
};
</script>

<style></style>
OccasionCard
