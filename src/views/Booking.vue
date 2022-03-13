<template>
  <div id="booking-page">
    <h1 id="page-title">Make a Booking</h1>
    <v-carousel
      v-model="bookingStep"
      :show-arrows="false"
      :hide-delimiters="true"
    >
      <v-carousel-item dark>
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
        <div class="step">
          <p>Coming Soon...</p>
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
export default {
  components: { BarberSelector, Calendar },
  created: function() {
    this.getBarbers();
  },
  data() {
    return {
      maxStep: 2,
      bookingStep: 0,
      barbers: [],
      getAttempted: false,
      selectedBarberInfo: {
        name: "",
        roster: [],
      },
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
        if (newVal.name != "") this.bookingStep++;
      },
    },
    calendarInfo: {
      deep: true,
      handler: function(newVal, oldVal) {
        if (
          newVal.selectedDays.length > 0 &&
          newVal.selectedDays[0] != oldVal.selectedDays[0]
        ) {
          let s = newVal.selectedDays[0];
          console.log(s);
          this.selectedDay = s;
          this.bookingStep++;
        }
      },
    },
  },

  methods: {
    getBarbers: async function() {
      await fb.getAllBarbers().then((response) => {
        this.barbers = response;
      });
      this.getAttempted = true;
    },
    book: async function() {
      await fb.createBooking(
        this.selectedBarberInfo.name,
        this.calendarInfo.selectedDays
      );
      this.cKey += 1;
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
