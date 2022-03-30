<template>
  <div id="booking-time-selector">
    <h2>Select Time</h2>
    <v-list class="time-list" dark>
      <v-list-item-group
        v-model="selectedTime"
        color="success"
        style="font-size:26px"
      >
        <v-list-item :class="getSlotClass(0)" @click="select(0)">
          <v-list-item-content>
            <p>00:20</p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :class="getSlotClass(time)"
          v-for="time in 47"
          :key="time"
          @click="select(time)"
        >
          <v-list-item-content>
            <div v-if="time % 2 == 0">
              <p v-if="time / 2 < 10">0{{ time / 2 }}:20</p>
              <p v-else>{{ time / 2 }}:20</p>
            </div>
            <div v-else>
              <p v-if="time / 2 < 10">0{{ time / 2 - 0.5 }}:50</p>
              <p v-else>{{ time / 2 - 0.5 }}:50</p>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import * as fb from "@/fb";
export default {
  props: ["rosteredTimes", "bookedTimes", "visibility"],
  data() {
    return {
      selectedTime: null,
    };
  },
  watch: {
    visibility: function(visibile) {
      if (!visibile) this.selectedTime = null;
    },
  },
  methods: {
    getSlotClass: function(slot) {
      let slotClass = "time-slot unavailable";
      if (this.rosteredTimes.includes(slot)) slotClass = "time-slot rostered";
      if (this.bookedTimes.includes(slot)) slotClass = "time-slot unavailable";
      return slotClass;
    },
    select: function(slot) {
      console.log(slot);
    },
  },
};
</script>

<style scoped>
#booking-time-selector {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 75vh;
  color: whitesmoke;
}

.time-list {
  text-align: center;
  height: 100%;
  width: 90%;
  overflow: scroll;
  position: relative;
}
.time-slot {
  width: 100%;
  text-align: center;
  position: relative;
  border-bottom: solid whitesmoke 1px;
}

.rostered {
  background: rgb(29, 44, 56);
}

.unavailable {
  opacity: 0.5;
  pointer-events: none;
}
.btn-container {
  padding-top: 10px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  text-align: center;
}
</style>
