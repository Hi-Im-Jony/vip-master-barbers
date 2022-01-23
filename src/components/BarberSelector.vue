<template>
  <div id="barber-selector">
    <h2>Select a Barber</h2>
    <div
      class="barber"
      v-for="barber in barbers"
      :key="barber"
      @click="update(barber)"
    >
      <div :class="getIndicatorClass(barber)"></div>
      <label :for="barber" class="barber-name">{{ barber }}</label>
    </div>
  </div>
</template>

<script>
import * as fb from "@/fb";
export default {
  data() {
    return {
      barbers: [],
      selectedBarber: "",
    };
  },
  created: function() {
    this.getAllBarbers();
  },
  methods: {
    getAllBarbers: function() {
      fb.getAllBarbers().then((response) => {
        this.barbers = response;
      });
    },
    getIndicatorClass: function(barber) {
      if (this.selectedBarber === barber) return "indicator selected";
      else return "indicator ";
    },
    update: function(barber) {
      this.selectedBarber = barber;
      this.$emit("input", this.selectedBarber);
    },
  },
};
</script>

<style scoped>
.barber {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px 0 15px 0;
  width: 100%;
  border: solid aliceblue;
}
.barber-name {
  margin: 6px !important;
  font-size: 25px;
}
.indicator {
  width: 25px;
  height: 25px;
  border: solid aliceblue;
}
.selected {
  background: gainsboro;
}
</style>
