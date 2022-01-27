<template>
  <div id="barber-manager">
    <loader :loading="loading" />
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
      <a @click="deroster()">
        <v-icon id="deroster-btn">
          mdi-calendar-remove-outline
        </v-icon>
      </a>
      <a @click="showTimes = true">
        <v-icon id="roster-default-btn">
          mdi-calendar-multiple-check
        </v-icon>
      </a>
      <a @click="showTimes = true">
        <v-icon id="roster-btn">
          mdi-calendar-clock-outline
        </v-icon>
      </a>
    </div>
    <div v-else class="btn-container"></div>
    <v-dialog open-delay="0" v-model="showTimes">
      <roster-time-selector
        :barber="selectedBarberInfo.name"
        :currentRoster="selectedBarberInfo.roster"
        :newDates="calendarInfo.selectedDays"
        :visibility="showTimes"
        :key="rtsKey"
        @rostering="loading = true"
        @done="rosteringDone"
      />
    </v-dialog>
  </div>
</template>

<script>
import * as fb from "@/fb";
import BarberSelector from "./BarberSelector.vue";
import Calendar from "./Calendar.vue";
import RosterTimeSelector from "./RosterTimeSelector.vue";
import Loader from "./Loader.vue";

export default {
  components: { BarberSelector, Calendar, RosterTimeSelector, Loader },
  data() {
    return {
      // info emitted from barber selector
      selectedBarberInfo: {
        name: "",
        roster: [],
      },

      // info emitted from calendar
      calendarInfo: {
        selectedDays: [],
        selectedYear: null,
        selectedMonth: null,
      },
      rtsKey: "rtsKey",
      calendarKey: "calendarKey", // used for key-based re-rendering
      loading: false, // model loader
      showTimes: false, // model times dialog
    };
  },
  watch: {
    calendarInfo: function() {
      // console.log(this.calendarInfo.selectedDays);
    },
  },

  computed: {
    showCalendar: function() {
      if (!this.loading && this.selectedBarberInfo.name == "") {
        this.calendarInfo.selectedMonth = null;
        this.calendarInfo.selectedYear = null;
        this.calendarInfo.selectedDays = [];
      }

      return !this.loading && this.selectedBarberInfo.name != "";
    },
  },
  methods: {
    rosteringDone: function(updatedRoster) {
      // console.log(updatedRoster);
      // this.selectedBarberInfo.roster = updatedRoster;
      this.loading = false;
      this.showTimes = false;
      this.calendarInfo.selectedDays = [];
      this.calendarKey = this.calendarKey + 1;
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
      this.calendarKey = this.calendarKey + 1;
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
  text-align: center;
}
#deroster-btn {
  padding: 1px 10px 1px 10px;
  color: rgb(161, 25, 25);
  margin: 10px;
  font-size: 35px;
}

#roster-default-btn {
  padding: 1px 10px 1px 10px;
  color: rgb(36, 161, 25);
  margin: 10px;
  font-size: 35px;
}

#roster-btn {
  padding: 1px 10px 1px 10px;
  color: rgb(35, 70, 185);
  margin: 10px;
  font-size: 35px;
}
</style>
