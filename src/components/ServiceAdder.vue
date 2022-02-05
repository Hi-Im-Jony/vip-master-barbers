<template>
  <div id="service-adder">
    <loader :loading="loading" />
    <v-btn id="add-service-btn" dark @click="showForm = true"
      >Add Service</v-btn
    >
    <v-dialog dark v-model="showForm">
      <form id="dialog-form">
        <v-text-field
          v-model="name"
          label="Service Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="price"
          label="Service Price"
          required
        ></v-text-field>
        <v-text-field
          v-model="description"
          label="Service Description"
          required
        ></v-text-field>
        <v-btn id="add-service-btn" dark @click="submit()">Submit</v-btn>
      </form>
    </v-dialog>
  </div>
</template>

<script>
import Loader from "./Loader.vue";

import * as fb from "@/fb";
export default {
  components: { Loader },
  data() {
    return {
      loading: false,
      showForm: false,
      name: "",
      price: undefined,
      description: "",
    };
  },
  methods: {
    submit: async function() {
      this.showForm = false;
      this.loading = true;
      await fb.addService(this.name, this.price, this.description);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
#dialog-form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: rgb(15, 15, 15);
}
</style>
