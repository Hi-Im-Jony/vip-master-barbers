<template>
  <div id="booking-page">
    <h1>Make a Booking</h1>
    <booking-calendar />
  </div>
</template>

<script>
import BookingCalendar from "../components/BookingCalendar.vue";
export default {
  components: { BookingCalendar },
  name: "Booking",
};
</script>

<style scoped>
#booking-page {
  min-height: 100vh;
  background-color: rgb(30, 30, 32);
  padding: 70px 0 0 0;
  text-align: center;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
