<template>
  <div id="barber-selector">
    <h2>Select a Barber</h2>
    <div v-for="barber in barbers" :key="barber">
      <v-checkbox
        dark
        :created="addBarberSel(barber)"
        :label="barber"
        v-model="checkboxes[barber]"
        @click="update()"
      />
    </div>
  </div>
</template>

<script>
import * as fb from "@/fb";
export default {
  data() {
    return {
      checkboxes: {},
      barbers: {},
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
    addBarberSel: function(barber) {
      this.checkboxes[barber] = false;
    },
    update: function() {
      const checkboxes = this.checkboxes;
      let selectedBarbers = [];
      for (let barber in checkboxes) {
        if (checkboxes[barber]) selectedBarbers.push(barber);
      }
      this.$emit("input", this.checkboxes);
    },
  },
};
</script>
