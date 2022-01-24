<template>
  <div id="admin-page">
    <loader :loading="loading" :key="loaderKey" />
    <div>
      <h1>Add a Barber</h1>
      <v-text-field
        dark
        v-model="newBarberName"
        label="Barber Name"
      ></v-text-field>
      <a @click="createBarber(newBarberName)">Add</a>
    </div>
    <div>
      <h1>Manage Barbers</h1>
      <barber-selector
        v-model="selectedBarberInfo"
        :key="bsKey"
        :forAdmin="true"
      />
    </div>
    <calendar
      v-model="calendarInfo"
      :roster="selectedBarberInfo.roster"
      :givenMonth="calendarInfo.selectedMonth"
      :givenYear="calendarInfo.selectedYear"
      :key="cKey"
    />
    <div
      v-if="
        selectedBarberInfo.name != '' && calendarInfo.selectedDays.length > 0
      "
    ></div>
    <a @click="roster()">
      Roster
    </a>
  </div>
</template>

<script>
import * as fb from "@/fb";
import Calendar from "../components/Calendar.vue";
import BarberSelector from "../components/BarberSelector.vue";
import Loader from "../components/Loader.vue";
export default {
  components: { Calendar, BarberSelector, Loader },
  data() {
    return {
      loading: false,
      bsKey: 0,
      cKey: 1,
      loaderKey: "l",
      newBarberName: "",
      selectedBarberInfo: {
        name: "",
        roster: [],
      },
      calendarInfo: {
        selectedDays: [],
        selectedYear: null,
        selectedMonth: null,
      },
    };
  },
  methods: {
    createBarber: async function(barberName) {
      if (barberName !== "") await fb.createBarber(barberName);
      this.newBarberName = "";
      (this.selectedBarberInfo = {
        name: "",
        roster: [],
      }),
        // re-render components

        (this.bsKey += 1);
      this.cKey += 1;
    },
    roster: async function() {
      this.loading = true;
      await fb.roster(
        this.selectedBarberInfo.name,
        this.calendarInfo.selectedDays
      );
      for (let day in this.calendarInfo.selectedDays) {
        this.selectedBarberInfo.roster.push(
          this.calendarInfo.selectedDays[day]
        );
      }
      // re-render calendar components
      this.cKey += 1;
      this.loaderKey += 1;
      this.calendarInfo.selectedDays = [];
      this.loading = false;
    },
  },
};
</script>

<style scoped>
#admin-page {
  min-height: 100vh;
  background-color: rgb(30, 30, 32);
  padding: 70px 0 0 0;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
