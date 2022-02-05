<template>
  <form id="dialog-form">
    <v-text-field v-model="name" label="Service Name" required></v-text-field>
    <v-text-field v-model="price" label="Service Price" required></v-text-field>
    <v-text-field
      v-model="description"
      label="Service Description"
      required
    ></v-text-field>
    <v-btn id="add-service-btn" color="success" dark @click="submit()"
      >Submit</v-btn
    >
  </form>
</template>

<script>
import * as fb from "@/fb";

export default {
  data() {
    return {
      name: "",
      price: undefined,
      description: "",
    };
  },
  methods: {
    submit: async function() {
      this.$emit("submitting-service");
      await fb.addService(this.name, this.price, this.description);
      this.$emit("done-service");
      this.name = "";
      this.price = undefined;
      this.description = "";
    },
  },
};
</script>
