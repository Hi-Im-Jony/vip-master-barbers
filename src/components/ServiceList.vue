<template>
  <div id="service-list">
    <p>{{ services }}</p>
  </div>
</template>

<script>
import * as fb from "@/fb";
export default {
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
      console.log("hi");
      let services = await fb.getServices();
      this.services = services;
    },
  },
};
</script>
