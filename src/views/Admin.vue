<template>
  <div id="admin-page">
    <div>
      <h1>Add a Barber</h1>
      <v-text-field dark v-model="bName" label="Barber Name"></v-text-field>
      <a @click="createBarber(bName)">Add</a>
    </div>

    <div>
      <h1>Roster Barber</h1>
      <barber-selector v-model="selectedBarbers" :key="bsKey" />
    </div>
    <calendar v-model="selectedDays" :roster="true" :key="cKey" />
    <a
      v-if="selectedBarbers.length > 0 && selectedDays.length > 0"
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
      bName: "",
      selectedBarbers: [],
      selectedDays: [],
    };
  },
  methods: {
    print: function(p) {
      console.log(p);
    },
    createBarber: async function(barberName) {
      await fb.createBarber(barberName);
      this.bName = "";
      // re-render components
      this.cKey += 1;
      this.bsKey += 1;
    },
    roster: async function() {
      await fb.roster(this.selectedBarbers, this.selectedDays);
      // re-render components
      this.cKey += 1;
      this.bsKey += 1;

      this.selectedBarbers = [];
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
