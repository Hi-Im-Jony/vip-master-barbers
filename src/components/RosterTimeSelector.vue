<template>
  <div id="roster-time-selector">
    <h2>Select Hours</h2>
    <v-carousel
      v-model="carouselModel"
      id="carousel"
      hide-delimiters
      :key="carouselKey"
    >
      <v-carousel-item v-for="date in dates" :key="date" dark>
        <p style="font-size:25px;">{{ currentDateSelected }}</p>

        <v-card>
          <v-list
            :id="dates.indexOf(date) + '-time-list'"
            class="time-list"
            dark
          >
            <v-list-item-group
              v-model="timesSelected[date]"
              multiple
              color="success"
            >
              <v-list-item
                class="time-slot"
                v-for="time in 24"
                :key="time"
                @click="
                  currentDateSelected = date;
                  quickSelect(time);
                "
              >
                <v-list-item-content
                  :id="dates.indexOf(date) + '-' + (time - 1)"
                  style="font-size:26px"
                >
                  <p v-if="time - 1 < 10">0{{ time - 1 }}:00</p>
                  <p v-else>{{ time - 1 }}:00</p>

                  <!-- <p>{{ dates.indexOf(date) + "-" + (time - 1) }}</p> -->
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-carousel-item>
    </v-carousel>
    <a id="roster-btn" @click="roster()"> Roster</a>
  </div>
</template>

<script>
import * as fb from "@/fb";
import Vue from "vue";
export default {
  props: ["barber", "currentRoster", "newDates", "visibility"],
  data() {
    return {
      carouselModel: [],
      carouselKey: 0,
      timesSelected: {},
      currentDateSelected: "",
      dates: this.newDates,
    };
  },
  watch: {
    visibility: function(visible) {
      if (visible) {
        this.dates = this.sortDates(this.newDates);
        this.reset();
        this.scroll();
        this.carouselModel = 0;
      }
    },
    carouselModel: function(newVal) {
      if (newVal == null) return;
      // scroll to "09:00"
      this.scroll();
    },
  },
  created: function() {
    this.dates = this.sortDates(this.newDates);
    this.reset();
    this.scroll();
    this.carouselModel = 0;
  },
  methods: {
    quickSelect: function(newestClick) {
      newestClick--;
      let times = this.timesSelected[this.currentDateSelected];
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

      if (arr1[2] < arr2[2]) return true;
      if (arr1[2] == arr2[2] && arr1[1] < arr2[1]) return true;
      if (arr1[2] == arr2[2] && arr1[1] == arr2[1] && arr1[0] < arr2[0])
        return true;

      return false;
    },
    reset: function() {
      // reset data structure
      for (let date in this.newDates) {
        const key = this.newDates[date];
        if (!this.timesSelected.hasOwnProperty(key)) {
          Vue.set(this.timesSelected, key, []);
        }
      }
      this.carouselKey++;
    },
    // scroll to "09:00"
    scroll: function() {
      const scrollableElID = this.carouselModel + "-time-list";
      setTimeout(function() {
        const scrollableEl = document.getElementById(scrollableElID);
        if (scrollableEl) scrollableEl.scrollTo(0, 600);
      }, 100);
    },
    roster: async function() {
      this.$emit("rostering");

      let updatedRoster = this.currentRoster;
      for (let day in this.timesSelected) {
        let selectedTimes = this.timesSelected[day];
        if (selectedTimes.length > 0) {
          // let backend do its thing
          await fb.roster(this.barber, [day], this.timesSelected[day]);
          console.log(day);
          // update front end roster
          if (!updatedRoster.includes(day)) updatedRoster.push(day);
        }
      }

      this.$emit("done", updatedRoster);
      this.timesSelected = {};
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

#roster-btn {
  color: aliceblue;
  padding: 1px 10px 1px 10px;
  background: rgb(27, 117, 19);
  margin: 20px;
}
</style>
