<template>
  <div id="booking-calendar-container">
    <barber-selector v-model="selectedBarber" />
    <p @click="print(selectedBarber)">View Barber</p>

    <calendar v-model="selectedDate" />
    <p @click="print(selectedDate)">View Date</p>
  </div>
</template>

<script>
import BarberSelector from "./BarberSelector.vue";
import Calendar from "./Calendar.vue";
export default {
  components: { BarberSelector, Calendar },
  data() {
    return {
      selectedBarber: null,
      selectedDate: null,
    };
  },
  methods: {
    print: function(p) {
      console.log(p);
    },
  },
};
</script>

<style scoped></style>
