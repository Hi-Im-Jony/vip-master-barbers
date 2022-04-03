<template>
  <section id="the-team">
    <h2 id="section-title">Meet The Team</h2>
    <barber-showcase name="Elvis" :showDesc="true" />
    <barber-showcase name="Gabrila" :showDesc="true" />
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
#the-team {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#section-title {
  color: rgb(26, 45, 59);
  font-size: 27px;
  text-align: center;
}
</style>
