<template>
  <div id="barber-selector">
    <h2>Select a Barber</h2>

    <div
      :class="getBarberClass(barber)"
      v-for="barber in barbers"
      :key="barber"
      @click="update(barber)"
    >
      <label :for="barber" class="barber-name">{{ barber }}</label>
      <div
        class="delete-btn-container"
        v-if="forAdmin"
        @click="deleteBarber(barber)"
      >
        <v-icon :class="getDeleteClass(barber)">mdi-trash-can-outline</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import * as fb from "@/fb";
export default {
  props: ["forAdmin"],
  data() {
    return {
      barbers: [],
      selectedBarber: "",
      roster: [],
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
    getBarberClass: function(barber) {
      if (this.selectedBarber === barber) return "barber selected";
      else return "barber ";
    },
    getDeleteClass: function(barber) {
      if (this.selectedBarber === barber) return " delete-selected";
      else return "delete-btn";
    },
    update: async function(barber) {
      this.selectedBarber = barber;
      this.roster = await fb.getRoster(barber);
      this.$emit("input", {
        name: this.selectedBarber,
        roster: this.roster,
      });
    },
    deleteBarber: async function(barber) {
      await fb.deleteBarber(barber);
      document.location.reload();
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
  border: solid rgba(240, 248, 255, 0.137);
  border-width: 1px;
}
.barber-name {
  margin: 6px !important;
  font-size: 25px;
}

.selected {
  background: rgba(53, 81, 156, 0.548);
}
.delete-btn-container {
  width: 30px;
}
.delete-btn {
  display: none;
}
.delete-selected {
  color: red !important;
}
</style>
