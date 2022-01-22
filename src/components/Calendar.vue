<template>
  <div id="calendar">
    <div id="month-row">
      <a>
        <v-icon @click="prevMonth()" class="icon">mdi-chevron-left</v-icon>
      </a>
      <h3>{{ months[month][0] }}</h3>
      <a>
        <v-icon @click="nextMonth()" class="icon">mdi-chevron-right</v-icon>
      </a>

      <v-spacer />

      <h3>{{ year }}</h3>
      <v-spacer />
    </div>

    <div id="day-row">
      <div id="days">
        <div class="day" v-for="num in 7" :key="num">
          <div>
            {{ days[num - 1] }}
          </div>
        </div>
        <div class="day" v-for="e in firstDayOfMonth" :key="'A' + e">
          <div class="empty-day"></div>
        </div>
        <div class="day" v-for="d in months[month][1]" :key="'B' + d">
          <a @click="selectDate(d)">
            <div class="day-num">
              {{ d }}
            </div>
          </a>
        </div>
        <div class="day" v-for="em in 6 - lastDayOfMonth" :key="'C' + em">
          <div class="empty-day"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: this.currentYear(),
      months: [
        ["January", 31],
        ["February", 28],
        ["March", 31],
        ["April", 30],
        ["May", 31],
        ["June", 30],
        ["July", 31],
        ["August", 31],
        ["September", 30],
        ["October", 31],
        ["November", 30],
        ["December", 31],
      ],
      month: this.currentMonth(),
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      day: this.currentDay(),
      selectedDate: "",
    };
  },
  computed: {
    firstDayOfMonth: function() {
      const date = new Date(this.year, this.month, 1);
      return date.getDay();
    },
    lastDayOfMonth: function() {
      const date = new Date(this.year, this.month + 1, 0);
      return date.getDay();
    },
  },
  methods: {
    currentYear: function() {
      const today = new Date();
      return today.getFullYear();
    },
    currentMonth: function() {
      const today = new Date();
      return today.getMonth();
    },
    currentDay: function() {
      const today = new Date();
      return today.getDay;
    },
    nextMonth: function() {
      this.month++;
      if (this.month === 12) {
        this.year++;
        this.month = 0;
      }
    },
    prevMonth: function() {
      this.month--;
      if (this.month === -1) {
        this.year--;
        this.month = 11;
      }
    },
    selectDate: function(day) {
      let date = day + ":" + this.month + 1 + ":" + this.year;
      console.log(date);
      this.selectedDate = date;
      this.$emit("input", this.selectedDate);
    },
  },
};
</script>
<style scoped>
#calendar {
  display: flex;
  flex-direction: column;
  border: solid whitesmoke;
  height: 400px;
  width: 80vw;
}
#month-row {
  display: flex;
  padding: 5px;
}
.icon {
  color: aliceblue;
  border: solid aliceblue;
  border-radius: 10px;
  margin: 0 5px 0 5px;
}
#days {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
.day {
  width: 14%;
  margin-bottom: 7px;
  display: flex;
  justify-content: center;
}
.day-num {
  border: solid whitesmoke;
  border-radius: 20px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}
.empty-day {
  border: solid grey;
  border-radius: 20px;
  width: 35px;
  height: 35px;
}
</style>
