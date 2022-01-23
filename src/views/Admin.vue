<template>
  <div id="admin-page">
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
      <h1>Roster Barber</h1>
      <barber-selector v-model="selectedBarberInfo" :key="bsKey" />
    </div>
    <calendar
      v-model="selectedDays"
      :roster="selectedBarberInfo.roster"
      :key="cKey"
    />
    <a
      v-if="selectedBarberInfo.name != '' && selectedDays.length > 0"
      @click="roster()"
    >
      Roster
    </a>
  </div>
</template>

<script>
import * as fb from "@/fb";
import Calendar from "../components/Calendar.vue";
import BarberSelector from "../components/BarberSelector.vue";
export default {
  components: { Calendar, BarberSelector },
  data() {
    return {
      bsKey: 0,
      cKey: 1,
      newBarberName: "",
      selectedBarberInfo: {
        name: "",
        roster: [],
      },
      selectedDays: [],
    };
  },
  methods: {
    print: function(p) {
      console.log(p);
    },
    createBarber: async function(barberName) {
      await fb.createBarber(barberName);
      this.newBarberName = "";
      // re-render components
      this.cKey += 1;
      this.bsKey += 1;
    },
    roster: async function() {
      await fb.roster(this.selectedBarberInfo.name, this.selectedDays);
      for (let day in this.selectedDays) {
        this.selectedBarberInfo.roster.push(this.selectedDays[day]);
      }
      // re-render components
      this.cKey += 1;

      this.selectedBarberInfo.name = "";
      this.selectedDays = [];
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
