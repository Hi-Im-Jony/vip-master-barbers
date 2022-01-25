<template>
  <div id="barber-adder">
    <v-text-field
      dark
      v-model="newBarberName"
      label="Barber Name"
    ></v-text-field>
    <a @click="createBarber(newBarberName)">Add</a>
  </div>
</template>

<script>
import * as fb from "@/fb";
export default {
  data() {
    return {
      newBarberName: "",
    };
  },
  methods: {
    createBarber: async function(barberName) {
      if (barberName !== "") await fb.createBarber(barberName);
      this.newBarberName = "";
      this.selectedBarberInfo = {
        name: "",
        roster: [],
      };
    },
  },
};
</script>

<style scoped>
#input-container {
  display: flex;
  align-items: center;
}
a {
  margin: 0 0 0 20px;
  border: solid grey;
  border-width: 1px;

  color: aliceblue;
  padding: 1px 10px 1px 10px;
  background: gray;
}
</style>
