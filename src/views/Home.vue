<template>
  <div id="homepage">
    <banner-item
      title="Welcome to VIP Master Barbers"
      description="Where Everyone Is A VIP"
      image="welcome.jpg"
    />
    <about />
    <a id="services-btn"><h3>SERVICES & PRODUCTS</h3> </a>
    <map />
  </div>
</template>

<script>
import Map from "../components/Map.vue";
import BannerItem from "../components/BannerItem.vue";
import About from "../components/About.vue";

export default {
  name: "Home",

  components: {
    Map,
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
  background-color: rgb(30, 30, 32);
  color: #fff;
}
#services-btn {
  color: rgb(175, 67, 67);
  border: solid rgb(65, 65, 168);
  padding: 10px;
  margin: 10px 10px 30px 10px;
}
@media (max-width: 860px) {
  #homepage {
    padding: 0px 0 0 0;
  }
}
</style>
