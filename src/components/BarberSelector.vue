<template>
  <div id="barber-selector">
    <h2>Select a Barber</h2>
    <div class="barber" v-for="barber in barbers" :key="barber">
      <div :class="getIndicatorClass(barber)"></div>
      <input
        style="display:none"
        type="radio"
        name="barber"
        :id="barber"
        @click="update(barber)"
      />
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
      let selectedBarber = [barber];
      this.$emit("input", selectedBarber);
    },
  },
};
</script>

<style scoped>
.barber {
  display: flex;
  justify-content: space-around;
  align-items: center;
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
