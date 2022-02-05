<template>
  <div id="service-adder">
    <loader :loading="loading" />
    <v-btn id="add-service-btn" dark @click="showForm = true"
      >Add Service</v-btn
    >
    <v-dialog dark v-model="showForm">
      <add-service-form
        @submitting-service="(showForm = false), (loading = true)"
        @done-service="loading = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import AddServiceForm from "./AddServiceForm.vue";
import Loader from "./Loader.vue";

export default {
  components: { Loader, AddServiceForm },
  data() {
    return {
      showForm: false,
      loading: false,
    };
  },
};
</script>

<style scoped>
#service-adder {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#dialog-form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: rgb(15, 15, 15);
}
</style>
