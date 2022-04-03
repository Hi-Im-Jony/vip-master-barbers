<template>
  <div id="banner-container">
    <div
      id="banner"
      :style="{
        backgroundImage: 'url(' + require('@/assets/' + image + '') + ')',
      }"
    ></div>
    <div id="foreground">
      <h2 id="title">{{ title }}</h2>
      <h3 id="description">
        {{ description }}
      </h3>
      <v-btn dark color="#22222a" to="/bookings">
        Book Now
      </v-btn>
    </div>
  </div>
</template>

<script>
import PhoneBtn from "./PhoneBtn.vue";
export default {
  components: { PhoneBtn },
  name: "BannerItem",
  props: ["title", "description", "image"],
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap");
#banner-container {
  margin: 0;
  padding: 0;
  position: relative;
}
#banner {
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  min-height: 550px;
  width: 100vw;
  padding: 0;
  margin: 0;
}
#title {
  font-size: 35px;
  white-space: pre-line;
  padding: 0 8px 0 8px;
}

#description {
  font-size: 25px;
  font-family: "Playfair Display", serif;
  width: 75%;
  min-width: 200px;
  margin: 20px 0 40px 0;
}

#foreground {
  /* background: rgba(12, 31, 56, 0.452); */
  background: rgba(0, 0, 0, 0.205);
  color: rgb(236, 241, 245);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  text-align: center;
  height: 100%;
  min-height: 350px;
  width: 100%;
  position: absolute;
  top: 0;
}
</style>
