<template>
  <div id="about-container">
    <h2 style="text-decoration: underline;">What We Offer</h2>
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
  </div>
</template>

<script>
import BusinessPoint from "./BusinessPoint.vue";
export default {
  components: { BusinessPoint },
};
</script>

<style scoped>
#about-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  text-align: center;
}
</style>
