<template>
  <div id="homepage">
    <banner-item
      title="Welcome to 
      Elvis Hairstyle"
      description="Where Everyone Is A VIP"
      image="saloon3-mbl.jpg"
    />
    <div class="section-spacer" style="height:20px"></div>
    <services-section />
    <the-team-section />
    <map-section />
  </div>
</template>

<script>
import MapSection from "../components/Map.vue";
import BannerItem from "../components/BannerItem.vue";
import ServicesSection from "../components/ServicesSection.vue";
import TheTeamSection from "../components/TheTeamSection.vue";

export default {
  name: "Home",

  components: {
    MapSection,
    BannerItem,
    ServicesSection,
    TheTeamSection,
  },
};
</script>

<style scoped>
#homepage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0 0 0;
  background-color: white;
}

@media (max-width: 860px) {
  #homepage {
    padding: 0px 0 0 0;
  }
}
</style>
