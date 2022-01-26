<template>
  <div id="roster-time-selector">
    <h2>Select Hours</h2>
    <v-carousel v-model="carouselModel" id="carousel" hide-delimiters>
      <v-carousel-item v-for="date in newDates" :key="date" dark>
        <p style="font-size:25px;">{{ date }}</p>

        <v-card>
          <v-list
            :id="newDates.indexOf(date) + '-time-list'"
            class="time-list"
            dark
          >
            <v-list-item-group v-model="timesSelected" multiple color="success">
              <v-list-item class="time-slot" v-for="time in 24" :key="time">
                <v-list-item-content
                  :id="newDates.indexOf(date) + '-' + (time - 1)"
                  style="font-size:26px"
                >
                  <p v-if="time - 1 < 10">0{{ time - 1 }}:00</p>
                  <p v-else>{{ time - 1 }}:00</p>
                  <p>{{ newDates.indexOf(date) + "-" + (time - 1) }}</p>
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
export default {
  props: ["barber", "currentRoster", "newDates", "visible"],
  data() {
    return {
      timesSelected: [],
      carouselModel: [],
    };
  },
  watch: {
    carouselModel: function(newVal) {
      if (newVal == null) return;
      // scroll to "09:00"
      const scrollableElID = newVal + "-time-list";
      setTimeout(function() {
        const scrollableEl = document.getElementById(scrollableElID);
        scrollableEl.scrollTo(0, 900);
      }, 100);
    },
    visible: function(visibility) {
      // scroll to "09:00"
      const scrollableElID = this.carouselModel + "-time-list";
      if (visibility)
        setTimeout(function() {
          const scrollableEl = document.getElementById(scrollableElID);
          scrollableEl.scrollTo(0, 900);
        }, 100);
    },
  },
  methods: {
    roster: async function() {
      console.log(this.timesSelected);
      this.$emit("rostering");

      // wait for backend to roster selected days
      await fb.roster(this.barber, this.newDates, this.timesSelected);

      // for every day that was selected
      for (let day in this.newDates) {
        // if frontend version of roster doesn't already include the day rostered
        if (!this.currentRoster.includes(this.newDates[day]))
          // push this day to the front end roster
          this.currentRoster.push(this.newDates[day]);
      }
      this.$emit("done");
      this.timesSelected = [];
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
