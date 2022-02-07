<template>
  <div id="service-list">
    <v-dialog v-model="showEditor">
      <editor
        :preEditValues="serviceToEdit"
        :visibility="showEditor"
        @cancel="showEditor = false"
        @submit="submit"
      />
    </v-dialog>
    <draggable v-if="forAdmin" v-model="services" handle=".handle">
      <transition-group>
        <div
          class="draggable-container"
          v-for="service in services"
          :key="service.name"
        >
          <div
            class="service-container"
            @click="
              selectedService =
                selectedService == service.name ? '' : service.name
            "
          >
            <div v-if="forAdmin" class="handle">
              <v-icon>
                mdi-swap-vertical
              </v-icon>
            </div>
            <service
              class="service"
              :service="service"
              :selected="selectedService == service.name"
            />
          </div>

          <div class="icon-container" v-if="forAdmin">
            <v-icon
              id="edit-icon"
              @click="edit(service)"
              :class="getIconClass(service.name)"
              >mdi-pencil-outline</v-icon
            >
            <v-icon
              id="delete-icon"
              @click="deleteService(service.name)"
              :class="getIconClass(service.name)"
              >mdi-trash-can-outline</v-icon
            >
          </div>
        </div>
      </transition-group>
    </draggable>
    <transition-group v-else>
      <div
        class="draggable-container"
        v-for="service in services"
        :key="service.name"
      >
        <div
          @click="
            selectedService =
              selectedService == service.name ? '' : service.name
          "
        >
          <service
            class="service"
            :service="service"
            :selected="selectedService == service.name"
          />
        </div>

        <div class="icon-container" v-if="forAdmin">
          <v-icon
            id="edit-icon"
            @click="edit(service)"
            :class="getIconClass(service.name)"
            >mdi-pencil-outline</v-icon
          >
          <v-icon
            id="delete-icon"
            @click="deleteService(service.name)"
            :class="getIconClass(service.name)"
            >mdi-trash-can-outline</v-icon
          >
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import * as fb from "@/fb";
import Editor from "./Editor.vue";
import Service from "./Service.vue";
import Draggable from "vuedraggable";

export default {
  props: ["forAdmin", "givenServices"],
  components: { Service, Editor, Draggable },
  data() {
    return {
      showEditor: false,
      services: this.givenServices,
      serviceToEdit: {},
      selectedService: "",
    };
  },
  watch: {
    givenServices: function() {
      this.services = this.givenServices;
    },
    services: {
      deep: true,

      async handler() {
        for (let i in this.services) {
          this.services[i].position = i;
          fb.editService(this.services[i].name, this.services[i]);
        }
        this.$emit("update", this.services);
      },
    },
  },
  methods: {
    getIconClass: function(service) {
      if (this.selectedService === service) return " icon-selected";
      else return "icon";
    },
    edit: function(service) {
      this.serviceToEdit = { name: service.name, price: service.price }; // have to hard code order
      this.showEditor = true;
    },
    submit: async function(editedValues) {
      this.$emit("loading");
      this.showEditor = false;
      await fb.editService(this.selectedService, editedValues);
      this.$emit("done");
    },
    deleteService: async function(service) {
      this.$emit("loading");

      await fb.deleteService(service);
      this.$emit("done");
    },
  },
};
</script>

<style scoped>
#service-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.draggable-container {
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 500px;
  margin: 5px;
}

.service-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-container {
  display: flex;
  justify-content: space-around;
}

#delete-icon {
  padding: 1px 10px 1px 10px;
  color: rgb(161, 25, 25);
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
