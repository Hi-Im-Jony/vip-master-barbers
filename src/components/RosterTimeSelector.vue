<template>
  <div id="roster-time-selector">
    <h2>Select Hours</h2>

    <v-carousel
      v-if="!rosterMultiple"
      v-model="carouselModel"
      id="carousel"
      hide-delimiters
      :key="carouselKey"
    >
      <v-carousel-item v-for="date in dates" :key="date" dark>
        <div style="font-size:20px;" id="top-row">
          <p>{{ parseDate(date) }}</p>
          <v-checkbox
            id="quick-checkbox"
            dark
            v-model="quickEnabled"
            label="Quick Select"
            color="success"
            hide-details
          ></v-checkbox>
        </div>

        <v-card v-if="!loading">
          <v-list
            :id="dates.indexOf(date) + '-time-list'"
            class="time-list"
            dark
          >
            <v-list-item-group
              v-model="timesSelected[date]"
              multiple
              color="success"
              style="font-size:26px"
            >
              <v-list-item class="time-slot" @click="quickSelect(0)">
                <v-list-item-content>
                  <p>00:20</p>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                class="time-slot"
                v-for="time in 47"
                :key="time"
                @click="quickSelect(time)"
              >
                <v-list-item-content
                  :id="dates.indexOf(date) + '-' + (time - 1)"
                >
                  <div v-if="time % 2 == 0">
                    <p v-if="time / 2 < 10">0{{ time / 2 }}:20</p>
                    <p v-else>{{ time / 2 }}:20</p>
                  </div>
                  <div v-else>
                    <p v-if="time / 2 < 10">0{{ time / 2 - 0.5 }}:50</p>
                    <p v-else>{{ time / 2 - 0.5 }}:50</p>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <div>
          <preloader v-if="loading" color="whitesmoke" :scale="0.3" />
        </div>
      </v-carousel-item>
    </v-carousel>
    <v-carousel
      v-else-if="rosterMultiple"
      v-model="carouselModel"
      id="carousel"
      hide-delimiters
      :show-arrows="false"
      :key="carouselKey"
    >
      <v-carousel-item dark>
        <div style="font-size:20px;" id="top-row">
          <p>For All</p>
          <v-checkbox
            id="quick-checkbox"
            dark
            v-model="quickEnabled"
            label="Quick Select"
            color="success"
            hide-details
          ></v-checkbox>
        </div>

        <v-card v-if="!loading">
          <v-list :id="'time-list'" class="time-list" dark>
            <v-list-item-group
              v-model="timesSelected['ForAll']"
              multiple
              color="success"
              style="font-size:26px"
            >
              <v-list-item class="time-slot" @click="quickSelect(0)">
                <v-list-item-content>
                  <p>00:20</p>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                class="time-slot"
                v-for="time in 47"
                :key="time"
                @click="quickSelect(time)"
              >
                <v-list-item-content>
                  <div v-if="time % 2 == 0">
                    <p v-if="time / 2 < 10">0{{ time / 2 }}:20</p>
                    <p v-else>{{ time / 2 }}:20</p>
                  </div>
                  <div v-else>
                    <p v-if="time / 2 < 10">0{{ time / 2 - 0.5 }}:50</p>
                    <p v-else>{{ time / 2 - 0.5 }}:50</p>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <div>
          <preloader v-if="loading" color="whitesmoke" :scale="0.3" />
        </div>
      </v-carousel-item>
    </v-carousel>
    <div v-if="!loading" class="btn-container">
      <v-btn id="submit-btn" @click="submit()"> Submit</v-btn>
    </div>
  </div>
</template>

<script>
import * as fb from "@/fb";
import Vue from "vue";
import Preloader from "./Preloader.vue";
export default {
  props: [
    "barber",

    "currentRoster",
    "newDates",
    "visibility",
    "rosterMultiple",
  ],
  components: { Preloader },
  data() {
    return {
      carouselModel: [],
      carouselKey: 0,
      timesSelected: {},
      loading: false,
      dates: this.newDates,
      quickEnabled: false,
    };
  },
  computed: {
    dateSelected: function() {
      return this.dates[this.carouselModel];
    },
  },
  watch: {
    visibility: async function(visible) {
      if (visible) {
        this.loading = true;
        this.dates = this.sortDates(this.newDates);
        this.carouselModel = 0;

        await this.reset();
        this.scroll();
        this.loading = false;
      }
    },
    carouselModel: function(newVal) {
      if (newVal == null) return;
      // scroll to "09:00"
      this.scroll();
    },
  },
  created: async function() {
    this.loading = true;
    Vue.set(this.timesSelected, "ForAll", []);
    this.dates = this.sortDates(this.newDates);
    this.carouselModel = 0;
    await this.reset();

    this.scroll();
    this.loading = false;
  },
  methods: {
    quickSelect: function(newestClick) {
      if (!this.quickEnabled) return;
      let times = this.rosterMultiple
        ? this.timesSelected["ForAll"]
        : this.timesSelected[this.dateSelected];
      if (times.length < 1) return; // nothing to do

      // numerical sort
      times.sort(function(a, b) {
        return a - b;
      });

      let startTime = times[0];
      let endTime = times[times.length - 1];

      if (newestClick <= startTime) {
        // "fill" from old startTime to new startTime
        for (let i = startTime - 1; i > newestClick; i--) {
          times.unshift(i);
        }
      }

      // if in between, do nothing
      else if (newestClick >= endTime) {
        for (let i = endTime + 1; i < newestClick; i++) {
          times.push(i);
        }
      }
    },
    // sort newDates using insertion sort
    sortDates: function(dates) {
      let n = dates.length;
      for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = dates[i];
        // The last element of our sorted subarray
        let j = i - 1;
        while (j > -1 && this.isLessThan(current, dates[j])) {
          dates[j + 1] = dates[j];
          j--;
        }
        dates[j + 1] = current;
      }
      this.carouselKey++;
      return dates;
    },
    isLessThan: function(date1, date2) {
      const arr1 = date1.split(":");
      const arr2 = date2.split(":");
      // parse to int
      for (let i = 0; i < 3; i++) {
        arr1[i] = parseInt(arr1[i]);
        arr2[i] = parseInt(arr2[i]);
      }

      // year1 < year2
      if (arr1[2] < arr2[2]) return true;
      // year1 == year2 && month1 < month2
      if (arr1[2] == arr2[2] && arr1[1] < arr2[1]) return true;
      // year1 == year2 && month1 == month 2 && day1 < day2
      if (arr1[2] == arr2[2] && arr1[1] == arr2[1] && arr1[0] < arr2[0])
        return true;

      return false;
    },
    reset: async function() {
      // reset data structure
      for (let date in this.newDates) {
        const key = this.newDates[date];
        if (!this.timesSelected.hasOwnProperty(key)) {
          Vue.set(this.timesSelected, key, []);
        }
      }

      for (let date in this.currentRoster) {
        // get rostered times of selected days
        if (this.newDates.includes(this.currentRoster[date])) {
          this.timesSelected[
            this.currentRoster[date]
          ] = await fb.getRosteredDayTimes(
            this.barber,
            this.currentRoster[date]
          );
        }
        this.timesSelected["ForAll"] = [];
      }
      this.carouselKey++;
    },
    // scroll to "09:00"
    scroll: function() {
      const scrollableElID = this.rosterMultiple
        ? "time-list"
        : this.carouselModel + "-time-list";
      setTimeout(function() {
        const scrollableEl = document.getElementById(scrollableElID);
        if (scrollableEl) scrollableEl.scrollTo(0, 1150);
      }, 100);
    },
    submit: async function() {
      this.$emit("rostering");

      let updatedRoster = this.currentRoster;
      for (let day in this.timesSelected) {
        console.log(day);
        let timesSelected = this.rosterMultiple
          ? this.timesSelected["ForAll"]
          : this.timesSelected[day];
        if (timesSelected.length > 0) {
          // actually roster
          await fb.roster(this.barber, day, timesSelected);
          // update front end roster
          if (!updatedRoster.includes(day)) updatedRoster.push(day);
        } else {
          // actually deroster
          await fb.deroster(this.barber, [day]);
          // remove from front end roster
          if (updatedRoster.includes(day))
            updatedRoster.splice(updatedRoster.indexOf(day), 1);
        }
      }
      this.$emit("done", updatedRoster);
      this.timesSelected = {};
    },

    parseDate: function(date) {
      const dateSplit = date.split(":");
      let dateDisplayed = new Date(
        dateSplit[2],
        dateSplit[1] - 1,
        dateSplit[0]
      );

      var options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
      };
      dateDisplayed = dateDisplayed.toLocaleDateString("en-US", options);

      return dateDisplayed;
    },
  },
};
</script>

<style scoped>
#roster-time-selector {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  widows: 100%;
  height: 600px;
  background: rgb(34, 34, 34);
  color: whitesmoke;
  padding: 20px 0 0 0;
}
#top-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#top-row * {
  margin: 10px 0 10px 0;
  padding: 0;
}

.time-list {
  text-align: center;
  height: 450px;
  overflow: scroll;
  position: relative;
}
.time-slot {
  width: 100%;
  text-align: center;
  position: relative;
}

.btn-container {
  padding-top: 10px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  text-align: center;
}

#submit-btn {
  color: aliceblue;
  padding: 1px 10px 1px 10px;
  background: rgb(50, 122, 43);
  margin: 20px;
  width: 100px;
}
</style>
