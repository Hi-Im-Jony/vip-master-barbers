<template>
  <div id="barber-selector">
    <loader :loading="loading" />

    <v-dialog v-model="confirmDialogue">
      <div id="dialog">
        <p>Are you sure you want to remove {{ selectedBarber }}?</p>
        <p>This will delete all their data, and cancel all their bookings.</p>
        <div id="btn-container">
          <a id="cancel-btn" @click="confirmDialogue = false">Cancel</a>
          <a id="delete-btn" @click="deleteBarber(selectedBarber)">Delete</a>
        </div>
      </div>
    </v-dialog>
    <h2>Select a Barber</h2>
    <p style="margin: 10px; color: red" v-if="barbers == ''">
      There Are Currently No Barbers In The System
    </p>

    <div class="barber-container" v-for="barber in barbers" :key="barber">
      <div :class="getBarberClass(barber)" @click="update(barber)">
        <label class="barber-name">{{ barber }}</label>
      </div>
      <div
        class="delete-icon-container"
        v-if="forAdmin"
        @click="confirmDelete(barber)"
      >
        <v-icon :class="getDeleteClass(barber)">mdi-trash-can-outline</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import * as fb from "@/fb";
import Loader from "./Loader.vue";
export default {
  components: { Loader },
  props: ["forAdmin"],
  data() {
    return {
      loading: false,
      confirmDialogue: false,
      barbers: "",
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
      else return "delete-icon";
    },
    update: async function(barber) {
      if (this.selectedBarber !== barber) {
        this.selectedBarber = barber;
        this.roster = await fb.getRoster(barber);
      } else {
        this.selectedBarber = "";
        this.roster = [];
      }

      this.$emit("input", {
        name: this.selectedBarber,
        roster: this.roster,
      });
    },
    confirmDelete: async function() {
      this.confirmDialogue = true;
    },
    deleteBarber: async function(barber) {
      this.confirmDialogue = false;
      this.loading = true;
      await fb.deleteBarber(barber);
      document.location.reload();
      this.loading = false;
    },
  },
};
</script>

<style scoped>
#barber-selector {
  max-width: 85vw;
  margin: 15px 0 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.barber-container {
  display: flex;
  align-items: center;
  width: 100%;
}
.barber {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0 15px 0;
  width: 100%;
  border: solid rgba(240, 248, 255, 0.137);
  border-width: 1px;
}
#dialog {
  color: aliceblue;
  background: rgb(14, 13, 13);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
}
#btn-container {
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
}

#cancel-btn {
  color: aliceblue;
  padding: 1px 10px 1px 10px;
  background: gray;
}

#delete-btn {
  color: aliceblue;
  padding: 1px 10px 1px 10px;
  background: rgb(124, 22, 22);
}

.barber-name {
  margin: 6px !important;
  font-size: 25px;
}

.selected {
  background: rgba(53, 81, 156, 0.548);
}
.delete-icon-container {
  width: 30px;
}
.delete-icon {
  display: none;
}
.delete-selected {
  color: red !important;
  margin-left: 5px;
}
</style>
