<template>
  <section id="about-section">
    <h2 id="section-header">What We Offer</h2>
    <p>
      With our enriching knowledge in the grooming industry, we always make sure
      that we are offering high-quality barbering services at awestruck prices!
    </p>
    <business-point
      icon="mdi-account-group"
      title="Professional Staff"
      text="At Elvis Hairstyle, you can relax and enjoy the high quality service that our staff provides."
    />

    <business-point
      icon="mdi-content-cut"
      title="Quality Service"
      text="At Elvis Hairstyle, you can relax and enjoy the high quality service that our staff provides."
    />
    <business-point
      icon="mdi-coffee-outline"
      title="Free Drinks"
      text="Everyone is a VIP here, and deserves to relax with a free soft drink or coffee while waiting. "
    />
  </section>
</template>

<script>
import BusinessPoint from "./BusinessPoint.vue";
export default {
  components: { BusinessPoint },
};
</script>

<style scoped>
#about-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  text-align: center;
}
#section-header {
  text-decoration: underline;
  color: rgb(26, 45, 59);
  font-size: 27px;
}
</style>
