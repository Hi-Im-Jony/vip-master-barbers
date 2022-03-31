<template>
  <div id="booking-page">
    <h1 id="page-title">Make a Booking</h1>
    <v-carousel
      v-model="bookingStep"
      :show-arrows="false"
      :hide-delimiters="true"
      height="auto"
    >
      <v-carousel-item dark>
        <!-- Step 1 -->
        <div class="step">
          <barber-selector
            v-model="selectedBarberInfo"
            :givenBarbers="barbers"
            :forAdmin="false"
            :getAttempted="getAttempted"
          />
        </div>
      </v-carousel-item>
      <v-carousel-item dark>
        <!-- Step 2 -->
        <div class="step">
          <calendar
            v-model="calendarInfo"
            :limited="true"
            :roster="selectedBarberInfo.roster"
            :givenMonth="calendarInfo.selectedMonth"
            :givenYear="calendarInfo.selectedYear"
            :key="cKey"
          />
        </div>
      </v-carousel-item>
      <v-carousel-item dark>
        <!-- Step 3 -->
        <div class="step">
          <booking-time-selector
            :rosteredTimes="rosteredTimes"
            :bookedTimes="bookedTimes"
            :visibility="bookingStep >= 2"
            v-model="selectedTime"
          />
        </div>
      </v-carousel-item>
      <v-carousel-item dark>
        <!-- Step 4 -->
        <div class="step">
          <service-list
            v-model="selectedService"
            :forAdmin="false"
            :givenServices="services"
            @input="bookingStep++"
          />
        </div>
      </v-carousel-item>
      <v-carousel-item dark>
        <!-- Step 5 -->
        <div class="step">
          <ul>
            <h3>Booking Summary:</h3>
            <h4>Barber: {{ selectedBarberInfo.name }}</h4>
            <h4>Date: {{ selectedDay }}</h4>

            <h4>Time: {{ selectedTime }}</h4>
            <h4>
              Service: {{ selectedService.name }}, €{{ selectedService.price }}
            </h4>
          </ul>
        </div>
      </v-carousel-item>
    </v-carousel>

    <div id="arrows-container">
      <v-icon class="arrow" @click="bookingStep > 0 ? bookingStep-- : null">
        mdi-chevron-left
      </v-icon>
      <v-btn @click="book()">
        book
      </v-btn>
      <v-icon
        class="arrow"
        @click="bookingStep < maxStep ? bookingStep++ : null"
      >
        mdi-chevron-right
      </v-icon>
    </div>
  </div>
</template>

<script>
import * as fb from "@/fb";
import BarberSelector from "@/components/BarberSelector.vue";
import Calendar from "@/components/Calendar.vue";
import BookingTimeSelector from "../components/BookingTimeSelector.vue";
import ServiceList from "../components/ServiceList.vue";
export default {
  components: { BarberSelector, Calendar, BookingTimeSelector, ServiceList },
  created: function() {
    this.getBarbers();
    this.getServices();
  },
  data() {
    return {
      maxStep: 4,
      bookingStep: 0,
      barbers: [],
      services: [],
      selectedService: {},
      getAttempted: false,
      selectedBarberInfo: {
        name: "",
        roster: [],
      },
      selectedTime: null,
      rosteredTimes: [],
      bookedTimes: [],
      calendarInfo: {
        selectedDays: [],
        selectedYear: null,
        selectedMonth: null,
      },
      selectedDay: "",
      bsKey: 0,
      cKey: 1,
    };
  },
  watch: {
    selectedBarberInfo: {
      deep: true,
      handler: function(newVal) {
        this.calendarInfo = {
          selectedDays: [],
          selectedYear: null,
          selectedMonth: null,
        };
        if (newVal.name != "") this.bookingStep++;
      },
    },
    calendarInfo: {
      deep: true,
      handler: async function(newVal, oldVal) {
        // if a new day was selected
        if (
          newVal.selectedDays.length > 0 &&
          newVal.selectedDays[0] != oldVal.selectedDays[0]
        ) {
          this.selectedDay = newVal.selectedDays[0];

          this.rosteredTimes = await fb.getRosteredDayTimes(
            this.selectedBarberInfo.name,
            this.selectedDay
          );
          this.bookedTimes = await fb.getBookedTimes(
            this.selectedBarberInfo.name,
            this.selectedDay
          );
          this.bookingStep++;
        }
      },
    },
    selectedTime: function(newVal) {
      if (newVal != null) this.bookingStep++;
    },
  },

  methods: {
    book: async function() {
      await fb.createBooking(
        this.selectedBarberInfo.name,
        this.selectedDay,
        this.selectedTime,
        this.selectedService.name,
        "n/a"
      );
    },
    getBarbers: async function() {
      await fb.getAllBarbers().then((response) => {
        this.barbers = response;
      });
      this.getAttempted = true;
    },
    getServices: async function() {
      let services = await fb.getServices();
      this.services = services;
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
  position: relative;
}
#page-title {
  width: 100%;
  text-align: center;
}

.step {
  display: flex !important;
  justify-content: center !important;
}
#arrows-container {
  width: 80%;
  display: flex;
  position: absolute;
  bottom: 20px;
  justify-content: space-between;
}
.arrow {
  color: whitesmoke;
  background: rgb(59, 58, 58);
  border-radius: 10px;
  font-size: 45px;
}
</style>
