<template>
  <div id="service-list">
    <service
      v-for="service in services"
      :service="service"
      :key="service.name"
    />
  </div>
</template>

<script>
import * as fb from "@/fb";
import Service from "./Service.vue";
export default {
  components: { Service },
  data() {
    return {
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
#service-list {
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>
