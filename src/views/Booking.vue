<template>
  <div id="booking-page">
    <h1 id="page-title">Make a Booking</h1>
    <barber-selector v-model="selectedBarber" />
    <p @click="print(selectedBarber)">View Barber</p>

    <calendar v-model="selectedDate" />
    <p @click="print(selectedDate)">View Date</p>
  </div>
</template>

<script>
import BarberSelector from "@/components/BarberSelector.vue";
import Calendar from "@/components/Calendar.vue";
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

<style scoped>
#booking-page {
  min-height: 100vh;
  background-color: rgb(30, 30, 32);
  padding: 70px 0 0 0;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#page-title {
  width: 100%;
  text-align: center;
}
</style>
