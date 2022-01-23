<template>
  <div id="admin-page">
    <div>
      <h1>Add a Barber</h1>
      <v-text-field dark v-model="bName" label="Barber Name"></v-text-field>
      <a @click="createBarber(bName)">Add</a>
    </div>

    <div>
      <h1>Roster Barber</h1>
      <barber-selector :key="componentKey" />
      <calendar />
    </div>
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
      componentKey: 0,
      bName: "",
    };
  },
  methods: {
    print: function(p) {
      console.log(p);
    },
    createBarber: async function(barberName) {
      await fb.createBarber(barberName);
      this.bName = "";
      this.componentKey += 1;
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
