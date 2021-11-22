<template>
  <v-carousel
    id="carousel"
    cycle
    interval="4500"
    hide-delimiters
    show-arrows-on-hover
  >
    <v-carousel-item>
      <banner-item title="Title 1" image="welcome.jpg" />
    </v-carousel-item>
    <v-carousel-item>
      <banner-item title="Title 2" image="welcome.jpg" />
    </v-carousel-item>
    <v-carousel-item>
      <banner-item title="Title 3" image="welcome.jpg" />
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import PhoneBtn from "./phone-btn.vue";
import BannerItem from "./banner-item.vue";

export default {
  name: "carouselBanner",
  components: {
    PhoneBtn,
    BannerItem,
  },
};
</script>

<style scoped>
#carousel {
  background: rgb(15, 22, 41) !important;
  height: 50vh !important;
  max-height: 498px !important;
  min-height: 350px !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
