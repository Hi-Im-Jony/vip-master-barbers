<template>
  <div id="barber-manager">
    <barber-selector v-model="selectedBarberInfo" :forAdmin="true" />

    <div id="calendar-container" :key="calendarKey">
      <calendar
        v-if="showCalendar"
        v-model="calendarInfo"
        :roster="selectedBarberInfo.roster"
        :givenMonth="calendarInfo.selectedMonth"
        :givenYear="calendarInfo.selectedYear"
      />
    </div>

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
import BarberSelector from "./BarberSelector.vue";
import Calendar from "./Calendar.vue";

export default {
  components: { BarberSelector, Calendar },
  data() {
    return {
      selectedBarberInfo: {
        name: "",
        roster: [],
      },

      calendarKey: 0, // used for key-based re-rendering
      calendarInfo: {
        selectedDays: [],
        selectedYear: null,
        selectedMonth: null,
      },
    };
  },
  computed: {
    showCalendar: function() {
      return !this.loading && this.selectedBarberInfo.name != "";
    },
  },
  methods: {
    roster: async function() {
      this.loading = true;

      // wait for backend to roster selected days
      await fb.roster(
        this.selectedBarberInfo.name,
        this.calendarInfo.selectedDays
      );

      // for every day that was selected
      for (let day in this.calendarInfo.selectedDays) {
        // if frontend version of roster doesn't already include the day rostered
        if (
          !this.selectedBarberInfo.roster.includes(
            this.calendarInfo.selectedDays[day]
          )
        )
          // push this day to the front end roster
          this.selectedBarberInfo.roster.push(
            this.calendarInfo.selectedDays[day]
          );
      }

      // reset and rerender
      this.calendarInfo.selectedDays = [];
      this.calendarKey++;

      this.loading = false;
    },
    deroster: async function() {
      this.loading = true;

      // wait for backend to deroster selected days
      await fb.deroster(
        this.selectedBarberInfo.name,
        this.calendarInfo.selectedDays
      );

      // for every day that was selected
      for (let day in this.calendarInfo.selectedDays) {
        // if frontend version of roster does contain this day
        if (
          this.selectedBarberInfo.roster.includes(
            this.calendarInfo.selectedDays[day]
          )
        )
          // remove this day from front end roster
          this.selectedBarberInfo.roster.splice(
            this.selectedBarberInfo.roster.indexOf(
              this.calendarInfo.selectedDays[day]
            ),
            1
          );
      }

      // reset and rerender
      this.calendarInfo.selectedDays = [];
      this.calendarKey++;

      this.loading = false;
    },
  },
};
</script>

<style scoped>
#barber-manager {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#calendar-container {
  height: 400px;
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
