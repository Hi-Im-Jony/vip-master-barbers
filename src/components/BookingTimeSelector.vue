<template>
  <div id="booking-time-selector">
    <h2>Select A Time</h2>
    <v-list id="time-list">
      <v-list-item-group
        v-model="oldTimeSelected"
        color="blue"
        style="font-size:26px"
      >
        <v-list-item :class="getSlotClass(0)" @click="emitSelected(0)">
          <v-list-item-content>
            <p>00:20</p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :class="getSlotClass(time)"
          v-for="time in 47"
          :key="time"
          @click="emitSelected(time)"
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
export default {
  props: ["rosteredTimes", "bookedTimes", "visibility"],
  data() {
    return {
      oldTimeSelected: null,
    };
  },

  watch: {
    visibility: function(visibile) {
      if (!visibile) {
        this.oldTimeSelected = null;
        this.$emit("input", null);
      } else {
        this.scroll();
      }
    },
  },
  methods: {
    getSlotClass: function(slot) {
      let slotClass = "time-slot unavailable";
      if (this.rosteredTimes.includes(slot)) slotClass = "time-slot rostered";
      if (this.bookedTimes.includes(slot)) slotClass = "time-slot unavailable";
      return slotClass;
    },
    emitSelected: function(newTimeSelected) {
      if (newTimeSelected != this.oldTimeSelected)
        this.$emit("input", newTimeSelected);
      else this.$emit("input", null);
    },
    // scroll to "09:00"
    scroll: function() {
      const scrollableElID = "time-list";
      setTimeout(function() {
        const scrollableEl = document.getElementById(scrollableElID);
        if (scrollableEl) scrollableEl.scrollTo(0, 1200);
      }, 100);
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
  height: 65vh;
}

#time-list {
  text-align: center;
  height: 100%;
  width: 90%;
  overflow-y: scroll;
  position: relative;
  background: rgba(0, 0, 0, 0.473);
  color: white !important;
}
.time-slot {
  width: 100%;
  text-align: center;
  position: relative;
  border-bottom: solid whitesmoke 1px;
}
.time-slot p {
  color: white;
}
.rostered {
  background: rgba(3, 3, 3, 0.712);
}

.unavailable {
  opacity: 0.5;
  pointer-events: none;
}
</style>
