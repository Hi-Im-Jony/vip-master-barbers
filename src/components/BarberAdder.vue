<template>
  <div id="barber-adder">
    <v-btn dark @click="showForm = !showForm"> Add Barber</v-btn>
    <v-dialog v-model="showForm">
      <form>
        <h2>Add Barber Details</h2>
        <v-text-field dark v-model="name" label="Barber Name"></v-text-field>
        <v-text-field
          dark
          v-model="subheading"
          label="Barber SubHeading"
        ></v-text-field>

        <v-textarea
          dark
          outlined
          clearable
          v-model="description"
          label="Barber Description"
        ></v-textarea>

        <v-btn @click="createBarber(name, subheading, description)"
          >Submit</v-btn
        >
      </form>
    </v-dialog>
  </div>
</template>

<script>
import * as fb from "@/fb";
export default {
  props: ["numBarbers"],
  data() {
    return {
      showForm: false,
      name: "",
      subheading: "",
      description: "",
    };
  },
  methods: {
    createBarber: async function(name, subheading, description) {
      this.showForm = false;
      if (name !== "")
        await fb.createBarber(name, subheading, description, this.numBarbers);
      this.name = "";
      this.subheading = "";
      this.description = "";
      // let parent know a barber was added
      this.$emit("barberAdded");
    },
  },
};
</script>

<style scoped>
#barber-adder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 1;
  background-color: #212121;
  padding: 10px;
  text-align: center;
  color: whitesmoke;
  font-family: "Amatic SC";
}
</style>
