<template>
  <div id="booking-page">
    <h1 id="page-title">Make a Booking</h1>
    <barber-selector v-model="selectedBarberInfo" :key="bsKey" />

    <calendar
      v-model="selectedDay"
      :roster="selectedBarberInfo.roster"
      :key="cKey"
    />
    <a @click="book()">Book</a>
  </div>
</template>

<script>
import * as fb from "@/fb";
import BarberSelector from "@/components/BarberSelector.vue";
import Calendar from "@/components/Calendar.vue";
export default {
  components: { BarberSelector, Calendar },
  data() {
    return {
      selectedBarberInfo: {
        name: "",
        roster: [],
      },
      selectedDay: [],
      bsKey: 0,
      cKey: 1,
    };
  },
  methods: {
    book: function() {
      fb.createBooking(this.selectedBarberInfo.name, this.selectedDay);
    },
  },
};
</script>

<style scoped>
#booking-page {
  min-height: 100vh;
  background-color: rgb(30, 30, 32);
  padding: 70px 0 0 0;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#page-title {
  width: 100%;
  text-align: center;
}
</style>
