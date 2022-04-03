<template>
  <transition name="fade">
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
          <div class="day " v-for="d in months[month][1]" :key="'B' + d">
            <a @click="selectDate(d)">
              <div :class="getDayClass(d)">
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
  </transition>
</template>

<script>
export default {
  props: ["limited", "roster", "givenYear", "givenMonth"],
  data() {
    return {
      year: this.givenYear === null ? this.currentYear() : this.givenYear,
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
      month: this.givenMonth === null ? this.currentMonth() : this.givenMonth,
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      day: this.currentDay(),
      selectedDates: [],
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
      return today.getDay();
    },
    nextMonth: function() {
      this.month++;
      if (this.month === 12) {
        this.year++;
        this.month = 0;
      }
      this.$emit("input", {
        selectedDays: this.selectedDates,
        selectedYear: this.year,
        selectedMonth: this.month,
      });
    },
    prevMonth: function() {
      this.month--;
      if (this.month === -1) {
        this.year--;
        this.month = 11;
      }
      this.$emit("input", {
        selectedDays: this.selectedDates,
        selectedYear: this.year,
        selectedMonth: this.month,
      });
    },
    selectDate: function(day) {
      let date =
        day +
        ":" +
        (this.month < 9 ? "0" : "") +
        (this.month + 1) +
        ":" +
        this.year;
      if (this.limited) {
        if (!this.roster.includes(date) || this.checkIfInPast(date)) return;
      }
      if (!this.checkIfInPast(date))
        if (!this.selectedDates.includes(date)) {
          if (!this.limited) {
            // unlimited dates can be selected
            this.selectedDates.push(date);
          } else {
            // only one date can be selected
            this.selectedDates = [date];
          }
        } else {
          this.selectedDates.splice(this.selectedDates.indexOf(date), 1);
        }
      this.$emit("input", {
        selectedDays: this.selectedDates,
        selectedYear: this.year,
        selectedMonth: this.month,
      });
    },
    getDayClass: function(day) {
      let classes = "day-num";

      let date =
        day +
        ":" +
        (this.month < 9 ? "0" : "") +
        (this.month + 1) +
        ":" +
        this.year;
      let inPast = this.checkIfInPast(date);
      if (this.limited) {
        if (!this.roster.includes(date) || inPast) {
          classes = classes + " in-past";
          return classes;
        }
      }
      if (inPast) {
        classes = classes + " in-past";
      }
      if (this.selectedDates.includes(date)) {
        classes = classes + " selected";
      }
      if (this.roster.includes(date)) {
        classes = classes + " rostered";
      }

      return classes;
    },
    checkIfInPast: function(date) {
      let currentDate = new Date();
      if (currentDate.getFullYear() > this.year) return true;
      if (
        currentDate.getFullYear() == this.year &&
        currentDate.getMonth() > this.month
      )
        return true;
      // get current day date (ie, 25th)
      let str = currentDate.toString();
      let arr = str.split(" ");
      let currentDay = parseInt(arr[2]);

      // get given day date
      arr = date.split(":");
      let givenDay = parseInt(arr[0]);

      if (
        currentDate.getFullYear() == this.year &&
        currentDate.getMonth() == this.month &&
        currentDay > givenDay
      )
        return true;

      // date not in the past
      return false;
    },
  },
};
</script>

<style scoped>
#calendar {
  display: flex;
  flex-direction: column;
  border: solid black 1px;
  background-color: rgba(255, 255, 255, 0.678);
  height: 100%;
  width: 90vw;
  padding-bottom: 10px;
  max-width: 600px;
}
#month-row {
  display: flex;
  padding: 5px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.icon {
  color: black;
  border: solid black;
  border-width: 1px;
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
  border: solid black;
  border-radius: 20px;
  border-width: 1px;
  color: black;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}
.in-past {
  opacity: 0.5;
}
.empty-day {
  opacity: 0.5;
  border: solid black;
  border-radius: 20px;
  border-width: 1px;
  width: 35px;
  height: 35px;
}
.selected {
  border: solid #38c 2px !important ;
  color: #38c !important;
}
.rostered {
  border: solid rgb(24, 83, 37) 2px;
  color: rgb(24, 83, 37);
}
</style>
