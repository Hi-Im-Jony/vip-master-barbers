<template>
  <div id="homepage">
    <banner-item
      title="Welcome to 
      Elvis Hairstyle"
      description="Where Everyone Is A VIP"
      image="saloon3-mbl.jpg"
    />
    <h3 id="intro-title">Service Tailored <br />Just For You</h3>
    <div id="intro-text">
      <p>
        Elvis Hairstyle is a luxurious barber shop that delivers awesome
        haircuts and barbering services to customers.
      </p>
      <p>
        Our fully equipped shop has the most recent barbering or haircut machine
        that ensures your world-class experience for our customers.
      </p>
      <p>
        Our main aim has always been in developing a great fusion of light,
        music, uniqueness, and remarkable barbering services that surely offer
        and customers a mind-blowing experience.
      </p>
    </div>
    <the-team-section />
    <services-section />
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
  padding: 0px 0 0 0;
  background-image: url("../assets/backgrounds/white-marble.jpg");
  background-size: contain;
  background-repeat: repeat;
}
#intro-title {
  color: rgb(26, 45, 59);
  font-size: 27px;
  text-align: center;
}
#intro-text {
  padding: 10px;
  text-align: center;
  width: 85vw;
  max-width: 600px;
}
</style>
