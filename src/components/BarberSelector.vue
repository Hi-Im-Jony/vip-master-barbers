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

    <v-dialog v-model="editDialogue">
      <form style="color:white; font-family: 'Amatic SC';" id="edit-form">
        <h2>Edit Barber Details</h2>
        <v-text-field
          dark
          v-model="editedName"
          label="Barber Name"
        ></v-text-field>
        <v-text-field
          dark
          v-model="editedSubheading"
          label="Barber SubHeading"
        ></v-text-field>

        <v-textarea
          dark
          outlined
          clearable
          v-model="editedDescription"
          label="Barber Description"
        ></v-textarea>
        <div id="btn-container">
          <v-btn id="cancel-btn" @click="editDialogue = false">Cancel</v-btn>
          <v-btn
            color="success"
            @click="submitEdit(editedName, editedSubheading, editedDescription)"
            >Submit</v-btn
          >
        </div>
      </form>
    </v-dialog>

    <h2 v-if="!forAdmin">Select a Barber</h2>
    <p
      style="margin: 10px; color: red; text-align: center;"
      v-if="getAttempted && noBarbersFound"
    >
      There Are Currently No Barbers In The System
    </p>
    <div v-if="!getAttempted">
      <preloader color="whitesmoke" :scale="0.2" />
    </div>
    <draggable v-model="barbers" handle=".handle">
      <transition-group :key="tgKey">
        <div class="barber-container" v-for="barber in barbers" :key="barber">
          <div :class="getBarberClass(barber)" @click="selectBarber(barber)">
            <div v-if="forAdmin" class="handle">
              <v-icon color="white">
                mdi-swap-vertical
              </v-icon>
            </div>
            <barber-showcase :name="barber" />
          </div>
          <div class="icon-container" v-if="forAdmin">
            <v-icon
              id="edit-icon"
              @click="edit(barber)"
              :class="getIconClass(barber)"
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
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import * as fb from "@/fb";
import Loader from "./Loader.vue";
import Preloader from "./Preloader.vue";
import Draggable from "vuedraggable";
import BarberShowcase from "./BarberShowcase.vue";
export default {
  components: { Loader, Preloader, Draggable, BarberShowcase },
  props: ["givenBarbers", "forAdmin", "getAttempted"],
  data() {
    return {
      loading: false,
      confirmDialogue: false,
      editDialogue: false,
      editedName: "",
      editedSubheading: "",
      editedDescription: "",
      selectedBarber: "",
      roster: [],
      barbers: this.givenBarbers,
      tgKey: 0,
    };
  },
  watch: {
    givenBarbers: function(newVal) {
      this.barbers = newVal;
    },
    barbers: {
      deep: true,

      async handler() {
        for (let i in this.barbers) {
          this.barbers[i];
          fb.editBarber(this.barbers[i], { position: i });
        }
        this.$emit("selectBarber", this.barbers);
      },
    },
  },
  computed: {
    noBarbersFound: function() {
      return this.barbers.length == 0;
    },
  },

  methods: {
    getBarberClass: function(barber) {
      if (this.selectedBarber === barber) return "barber selected";
      else return "barber ";
    },
    getIconClass: function(barber) {
      if (this.selectedBarber === barber) return " icon-selected";
      else return "icon";
    },
    selectBarber: async function(barber) {
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
    edit: async function(barber) {
      this.editedName = barber;
      const barberDetails = await fb.getBarber(barber);
      this.editedSubheading = barberDetails.subheading;
      this.editedDescription = barberDetails.description;
      this.editDialogue = true;
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
    submitEdit: async function(
      editedName,
      editedSubheading,
      editedDescription
    ) {
      this.editDialogue = false;
      this.loading = true;
      await fb.editBarber(this.selectedBarber, {
        name: editedName,
        description: editedDescription,
        subheading: editedSubheading,
      });
      this.barbers[this.barbers.indexOf(this.selectedBarber)] = this.editedName;
      this.selectedBarber = "";
      this.tgKey++;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
}
.barber {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 15px 0;
  width: 100%;
  background: rgba(3, 3, 3, 0.849);

  color: white;
  border-width: 1px;
  position: relative;
}
.handle {
  position: relative;
  left: 10px;
}
#edit-form {
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
  background: rgba(134, 136, 123, 0.671);
}
.icon-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

#confirm-delete-btn {
  padding: 1px 10px 1px 10px;
  background: rgb(124, 22, 22);
  color: aliceblue;
}

#confirm-edit-btn {
  padding: 1px 10px 1px 10px;
  background: rgb(61, 121, 49);
  color: aliceblue;
}

#delete-icon {
  padding: 1px 10px 1px 10px;
  color: rgb(161, 25, 25);
}

#edit-icon {
  padding: 1px 10px 1px 10px;
  color: rgb(57, 106, 151);
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
