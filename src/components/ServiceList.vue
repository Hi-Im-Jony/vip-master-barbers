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

    <div
      class="service-container"
      v-for="service in services"
      :key="service.name"
    >
      <div
        @click="
          selectedService = selectedService == service.name ? '' : service.name
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
  </div>
</template>

<script>
import * as fb from "@/fb";
import Editor from "./Editor.vue";
import Service from "./Service.vue";

export default {
  props: ["forAdmin", "update"],
  components: { Service, Editor },
  data() {
    return {
      showEditor: false,
      serviceToEdit: {},
      services: [],
      selectedService: "",
    };
  },
  created: function() {
    this.getServices();
  },
  watch: {
    update: function() {
      this.getServices();
    },
  },
  methods: {
    getServices: async function() {
      let services = await fb.getServices();
      this.services = services;
    },
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
      this.getServices();
      this.$emit("done");
    },
    deleteService: async function(service) {
      this.$emit("loading");

      await fb.deleteService(service);
      this.getServices();
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
.service-container {
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 500px;
  margin: 5px;
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
