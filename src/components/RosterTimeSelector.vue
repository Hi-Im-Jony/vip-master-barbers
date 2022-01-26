<template>
  <div id="roster-time-selector">
    <!-- <p>Barber: {{ barber }}</p>
    <p>Old Roster: {{ roster }}</p>
    <p>New Dates: {{ newDates }}</p> -->
    <h2>Select Hours</h2>
    <v-card id="times">
      <v-list dark>
        <v-list-item-group v-model="timesSelected" multiple color="success">
          <v-list-item class="time-slot" v-for="time in 24" :key="time">
            <v-list-item-content :id="time">
              <v-list-item-title style="font-size:26px">
                <p v-if="time < 10">0{{ time }}:00</p>
                <p v-else>{{ time }}:00</p>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <a id="roster-btn" @click="roster()"> Roster</a>
  </div>
</template>

<script>
import * as fb from "@/fb";
export default {
  props: ["barber", "currentRoster", "newDates"],
  data() {
    return {
      timesSelected: [],
    };
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
  height: 100%;
  background: rgb(34, 34, 34);
  color: whitesmoke;
}
#times {
  width: 95%;
  max-height: 50vh;
  min-height: 500px;
  overflow: scroll;
  margin: 20px;
}
.time-slot {
  width: 100% !important;
  text-align: center;
}

#roster-btn {
  color: aliceblue;
  padding: 1px 10px 1px 10px;
  background: rgb(27, 117, 19);
}
</style>
