<template>
  <div id="booking-page">
    <h1 id="page-title">Make a Booking</h1>
    <v-carousel
      v-model="bookingStep"
      :show-arrows="false"
      :hide-delimiters="true"
      height="auto"
    >
      <v-carousel-item>
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
      <v-carousel-item>
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
      <v-carousel-item>
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
      <v-carousel-item>
        <!-- Step 4 -->
        <div class="step">
          <h2>Select A Service</h2>
          <div id="service-list-container">
            <service-list
              v-model="selectedService"
              :forAdmin="false"
              :givenServices="services"
              @input="bookingStep++"
            />
          </div>
        </div>
      </v-carousel-item>
      <v-carousel-item>
        <!-- Step 5 -->
        <div class="step">
          <h2>Booking Summary:</h2>
          <ul>
            <h4>Barber: {{ selectedBarberInfo.name }}</h4>
            <h4>Date: {{ selectedDay }}</h4>

            <h4>Time: {{ selectedTime }}</h4>
            <h4>
              Service: {{ selectedService.name }}, €{{ selectedService.price }}
            </h4>
          </ul>
          <v-btn dark @click="book()">
            book
          </v-btn>
        </div>
      </v-carousel-item>
    </v-carousel>

    <div id="arrows-container">
      <v-icon class="arrow" @click="bookingStep > 0 ? bookingStep-- : null">
        mdi-chevron-left
      </v-icon>

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
        this.selectedDay = "";
        if (newVal.name != "") {
          console.log("Barber Selected");
          this.bookingStep++;
        }
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
          console.log("Date Selected: ", newVal);

          this.bookingStep++;
        }
      },
    },
    selectedTime: function(newVal) {
      if (newVal != null) {
        console.log("Time Selected");
        this.bookingStep++;
      }
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
  padding: 70px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-image: url("../assets/backgrounds/white-marble.jpg");
  background-size: contain;
  background-repeat: repeat;
}
#page-title {
  width: 100%;
  text-align: center;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center !important;

  padding: 5px;
}

#service-list-container {
  height: 55vh !important;
  overflow-y: scroll;
}

ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
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
