<template>
  <div id="admin-page">
    <loader :loading="loading" :key="loaderKey" />

    <v-expansion-panels dark v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header
          ><h1>Add a Barber</h1></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <div id="input-container">
            <v-text-field
              dark
              v-model="newBarberName"
              label="Barber Name"
            ></v-text-field>
            <a @click="createBarber(newBarberName)">Add</a>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header
          ><h1>Manage Barbers</h1></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <div id="content-container">
            <barber-selector
              v-model="selectedBarberInfo"
              :key="bsKey"
              :forAdmin="true"
            />

            <div id="calendar-container">
              <transition name="fade">
                <calendar
                  v-if="showCalendar"
                  v-model="calendarInfo"
                  :roster="selectedBarberInfo.roster"
                  :givenMonth="calendarInfo.selectedMonth"
                  :givenYear="calendarInfo.selectedYear"
                  :key="cKey"
                />
              </transition>
            </div>

            <div
              class="btn-container"
              v-if="
                selectedBarberInfo.name != '' &&
                  calendarInfo.selectedDays.length > 0
              "
            >
              <a id="deroster-btn" @click="deroster()"> De-Roster</a>
              <a id="roster-btn" @click="roster()"> Roster</a>
            </div>
            <div class="btn-container" v-else></div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h1>Services and Products</h1>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div id="input-container">
            <v-text-field
              dark
              v-model="newBarberName"
              label="Barber Name"
            ></v-text-field>
            <a @click="createBarber(newBarberName)">Add</a>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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

      panel: [],
    };
  },
  computed: {
    showCalendar: function() {
      return !this.loading && this.selectedBarberInfo.name != "";
    },
  },
  methods: {
    createBarber: async function(barberName) {
      if (barberName !== "") await fb.createBarber(barberName);
      this.newBarberName = "";
      this.selectedBarberInfo = {
        name: "",
        roster: [],
      };

      // re-render components
      this.bsKey += 1;
      this.cKey += 1;
    },
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

      this.calendarInfo.selectedDays = [];
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

      this.calendarInfo.selectedDays = [];
      // ugly way to fix rendering bug
      this.rerender++;
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
#content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#calendar-container {
  height: 400px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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
