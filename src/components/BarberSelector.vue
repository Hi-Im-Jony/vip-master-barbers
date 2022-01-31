<template>
  <div id="barber-selector">
    <loader :loading="loading" />

    <v-dialog v-model="confirmDialogue">
      <div id="dialog">
        <p>Are you sure you want to remove {{ selectedBarber }}?</p>
        <p>This will delete all their data, and cancel all their bookings.</p>
        <div id="btn-container">
          <a id="cancel-btn" @click="confirmDialogue = false">Cancel</a>
          <a id="confirm-delete-btn" @click="deleteBarber(selectedBarber)"
            >Delete</a
          >
        </div>
      </div>
    </v-dialog>
    <h2>Select a Barber</h2>
    <p style="margin: 10px; color: red" v-if="getAttempted && noBarbersFound">
      There Are Currently No Barbers In The System
    </p>
    <div v-if="!getAttempted">
      <preloader color="whitesmoke" :scale="0.2" />
    </div>

    <div class="barber-container" v-for="barber in barbers" :key="barber">
      <div :class="getBarberClass(barber)" @click="update(barber)">
        <label class="barber-name">{{ barber }}</label>
      </div>
      <div class="icon-container" v-if="forAdmin">
        <v-icon id="edit-icon" :class="getIconClass(barber)"
          >mdi-pencil-outline</v-icon
        >
        <v-icon
          id="delete-icon"
          @click="confirmDelete(barber)"
          :class="getIconClass(barber)"
          >mdi-trash-can-outline</v-icon
        >
      </div>
    </div>
  </div>
</template>

<script>
import * as fb from "@/fb";
import Loader from "./Loader.vue";
import Preloader from "./Preloader.vue";
export default {
  components: { Loader, Preloader },
  props: ["forAdmin"],
  data() {
    return {
      loading: false,
      confirmDialogue: false,
      barbers: "",
      selectedBarber: "",
      roster: [],
      getAttempted: false,
    };
  },
  computed: {
    noBarbersFound: function() {
      return this.barbers == 0;
    },
  },
  created: function() {
    this.getAllBarbers();
  },
  methods: {
    getAllBarbers: async function() {
      await fb.getAllBarbers().then((response) => {
        this.barbers = response;
      });
      this.getAttempted = true;
    },
    getBarberClass: function(barber) {
      if (this.selectedBarber === barber) return "barber selected";
      else return "barber ";
    },
    getIconClass: function(barber) {
      if (this.selectedBarber === barber) return " icon-selected";
      else return "icon";
    },
    update: async function(barber) {
      if (this.selectedBarber !== barber) {
        this.selectedBarber = barber;
        this.roster = await fb.getRosteredDays(barber);
      } else {
        this.selectedBarber = "";
        this.roster = [];
      }

      this.$emit("input", {
        name: this.selectedBarber,
        roster: this.roster,
      });
    },
    confirmDelete: function() {
      this.confirmDialogue = true;
    },
    deleteBarber: function(barber) {
      this.confirmDialogue = false;
      this.loading = true;

      // remove barber from backend
      fb.deleteBarber(barber);

      // remove barber from frontend
      this.barbers.splice(this.barbers.indexOf(barber), 1);
      this.loading = false;
      this.$emit("input", {
        name: "",
        roster: [],
      });
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

.barber-name {
  margin: 6px !important;
  font-size: 25px;
}

.selected {
  background: rgba(53, 81, 156, 0.548);
}
.icon-container {
  width: 30px;
  display: flex;
}

#confirm-delete-btn {
  padding: 1px 10px 1px 10px;
  background: rgb(124, 22, 22);
  color: aliceblue;
}

#delete-icon {
  padding: 1px 10px 1px 10px;
  color: rgb(124, 22, 22);
}

#edit-icon {
  padding: 1px 10px 1px 10px;
  color: rgb(144, 176, 206);
}
.icon {
  display: none;
}
.icon-selected {
  display: inline;
  font-size: 30px;
  margin-left: 5px;
}
</style>
