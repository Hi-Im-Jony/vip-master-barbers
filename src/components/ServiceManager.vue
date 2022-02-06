<template>
  <div id="service-manager">
    <loader :loading="loading" />

    <v-btn id="add-service-btn" dark @click="showForm = true">
      Add Service
    </v-btn>

    <v-dialog dark v-model="showForm">
      <service-adder
        @submitting-service="(showForm = false), (loading = true)"
        @done-service="(loading = false), updateList++"
      />
    </v-dialog>

    <service-list
      :forAdmin="true"
      :update="updateList"
      @loading="loading = true"
      @done="loading = false"
    />
  </div>
</template>

<script>
import ServiceAdder from "./ServiceAdder.vue";
import Loader from "./Loader.vue";
import ServiceList from "./ServiceList.vue";

export default {
  components: { Loader, ServiceAdder, ServiceList },
  data() {
    return {
      showForm: false,
      loading: false,
      updateList: 0,
    };
  },
};
</script>

<style scoped>
#service-manager {
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
