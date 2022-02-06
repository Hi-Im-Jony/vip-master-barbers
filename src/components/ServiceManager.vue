<template>
  <div id="service-manager">
    <loader :loading="loading" />

    <v-btn id="add-service-btn" dark @click="showForm = true">
      Add Service
    </v-btn>

    <v-dialog dark v-model="showForm">
      <service-adder
        :numOfServices="services.length"
        @submitting-service="(showForm = false), (loading = true)"
        @done-service="(loading = false), getServices()"
      />
    </v-dialog>

    <service-list
      :services="services"
      :forAdmin="true"
      @loading="loading = true"
      @done="(loading = false), getServices()"
    />
  </div>
</template>

<script>
import * as fb from "@/fb";

import ServiceAdder from "./ServiceAdder.vue";
import Loader from "./Loader.vue";
import ServiceList from "./ServiceList.vue";

export default {
  components: { Loader, ServiceAdder, ServiceList },
  data() {
    return {
      showForm: false,
      loading: false,
      services: [],
    };
  },
  created: function() {
    this.getServices();
  },
  methods: {
    getServices: async function() {
      let services = await fb.getServices();
      this.services = services;
    },
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
