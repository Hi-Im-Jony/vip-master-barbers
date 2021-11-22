<template>
  <div id="homepage">
    <banner-item
      title="Welcome to VIP Master Barbers"
      description="Where Everyone Is A VIP"
      image="welcome.jpg"
    />
    <about />
    <a id="services-btn"><h3>SERVICES & PRODUCTS</h3> </a>
    <maps />

    <myfooter />
  </div>
</template>

<script>
import Myfooter from "../components/myfooter.vue";
import Maps from "../components/maps.vue";
import BannerItem from "../components/banner-item.vue";
import About from "../components/About.vue";

export default {
  name: "Home",

  components: {
    Myfooter,
    Maps,
    BannerItem,
    About,
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
}
#services-btn {
  color: red;
  border: solid rgb(32, 32, 173);
  padding: 10px;
  margin: 10px 10px 30px 10px;
}
@media (max-width: 860px) {
  #homepage {
    padding: 0px 0 0 0;
  }
}
</style>
