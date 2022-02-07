<template>
  <div id="booking-page">
    <h1 id="page-title">Make a Booking</h1>
    <barber-selector
      v-model="selectedBarberInfo"
      :givenBarbers="barbers"
      :forAdmin="false"
      :getAttempted="getAttempted"
      @update="(newBarbers) => (barbers = newBarbers)"
    />
    <calendar
      v-model="calendarInfo"
      :roster="selectedBarberInfo.roster"
      :givenMonth="calendarInfo.selectedMonth"
      :givenYear="calendarInfo.selectedYear"
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
  created: function() {
    this.getBarbers();
  },
  data() {
    return {
      barbers: [],
      getAttempted: false,
      selectedBarberInfo: {
        name: "",
        roster: [],
      },
      calendarInfo: {
        selectedDays: [],
        selectedYear: null,
        selectedMonth: null,
      },
      bsKey: 0,
      cKey: 1,
    };
  },
  methods: {
    getBarbers: async function() {
      await fb.getAllBarbers().then((response) => {
        this.barbers = response;
      });
      this.getAttempted = true;
    },
    book: async function() {
      await fb.createBooking(
        this.selectedBarberInfo.name,
        this.calendarInfo.selectedDays
      );
      this.cKey += 1;
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
