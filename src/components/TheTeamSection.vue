<template>
  <section id="the-team">
    <h2 id="section-title">Meet The Team</h2>
    <barber-showcase
      name="Elvis"
      description="Professional Hairstylist"
      src="elvis.jpeg"
      :forAdmin="false"
    />
  </section>
</template>

<script>
import * as fb from "@/fb";
import BarberShowcase from "./BarberShowcase.vue";

export default {
  components: { BarberShowcase },
  data() {
    return {
      barbers: [],
    };
  },
  created: async function() {
    await fb.getAllBarbers().then((response) => {
      this.barbers = response;
    });
    this.getAttempted = true;
  },
};
</script>

<style scoped>
#section-title {
  color: rgb(26, 45, 59);
  font-size: 27px;
  text-align: center;
}
p {
  width: 85vw;
  max-width: 600px;
  text-align: center;
  margin: 5px 0 !important;
}
</style>
