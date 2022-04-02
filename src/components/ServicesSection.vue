<template>
  <section id="about-section">
    <h2 id="section-title">What We Offer</h2>

    <service-list :givenServices="services" menu="true" />

    <business-point
      icon="mdi-content-cut"
      title="Quality 
    Service"
    />
    <business-point
      icon="mdi-account-group"
      title="Professional 
    Staff"
    />
    <business-point
      icon="mdi-coffee-outline"
      title="Free 
    Drinks"
    />
  </section>
</template>

<script>
import * as fb from "@/fb";
import ServiceList from "./ServiceList.vue";
import BusinessPoint from "./BusinessPoint.vue";
export default {
  data() {
    return {
      services: [],
    };
  },
  created: async function() {
    let services = await fb.getServices();
    this.services = services;
  },
  components: { BusinessPoint, ServiceList },
};
</script>

<style scoped>
#about-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}
#section-title {
  text-decoration: underline;
  color: rgb(26, 45, 59);
  font-size: 27px;
}
</style>
