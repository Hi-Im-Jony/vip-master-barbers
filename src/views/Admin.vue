<template>
  <div id="admin-page">
    <loader :loading="loading" :key="loaderKey" />
    <div>
      <h1>Add a Barber</h1>
      <div id="input-container">
        <v-text-field
          dark
          v-model="newBarberName"
          label="Barber Name"
        ></v-text-field>
        <a @click="createBarber(newBarberName)">Add</a>
      </div>
    </div>

    <h1>Manage Barbers</h1>
    <barber-selector
      v-model="selectedBarberInfo"
      :key="bsKey"
      :forAdmin="true"
    />

    <calendar
      v-model="calendarInfo"
      :roster="selectedBarberInfo.roster"
      :givenMonth="calendarInfo.selectedMonth"
      :givenYear="calendarInfo.selectedYear"
      :key="cKey"
    />
    <div
      class="btn-container"
      v-if="
        selectedBarberInfo.name != '' && calendarInfo.selectedDays.length > 0
      "
    >
      <a id="deroster-btn" @click="deroster()"> De-Roster</a>
      <a id="roster-btn" @click="roster()"> Roster</a>
    </div>
    <div class="btn-container" v-else></div>
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
        if (
          !this.selectedBarberInfo.roster.includes(
            this.calendarInfo.selectedDays[day]
          )
        )
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
    deroster: async function() {
      this.loading = true;

      for (let day in this.calendarInfo.selectedDays) {
        if (
          this.selectedBarberInfo.roster.includes(
            this.calendarInfo.selectedDays[day]
          )
        ) {
          await fb.deroster(this.selectedBarberInfo.name, [
            this.calendarInfo.selectedDays[day],
          ]);
          this.selectedBarberInfo.roster.splice(
            this.selectedBarberInfo.roster.indexOf(
              this.calendarInfo.selectedDays[day]
            ),
            1
          );
        }
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
  padding: 70px 0 20px 0;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#input-container {
  display: flex;
  align-items: center;
}
#input-container a {
  margin: 0 0 0 20px;
  border: solid grey;
  border-width: 1px;

  color: aliceblue;
  padding: 1px 10px 1px 10px;
  background: gray;
}
.btn-container {
  padding-top: 10px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75vw;
  height: 60px;
}
#deroster-btn {
  color: aliceblue;
  padding: 1px 10px 1px 10px;
  background: rgb(161, 25, 25);
  margin: 10px;
}

#roster-btn {
  color: aliceblue;
  padding: 1px 10px 1px 10px;
  background: rgb(27, 117, 19);
  margin: 10px;
}
</style>
