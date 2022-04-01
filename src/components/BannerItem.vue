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
      <br />
      <p id="description">
        {{ description }}
      </p>
      <v-btn dark color="#38C" to="/bookings">
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
}

#description {
  font-size: 25px;
}

#foreground {
  color: rgb(236, 241, 245);
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  top: 0;
  font-size: 1.7rem;
  text-align: center;
  background: rgba(12, 31, 56, 0.452);
  height: 100%;
  min-height: 350px;
}
#foreground h1 {
  padding: 0 8px 0 8px;
}
#foreground p {
  width: 50%;
  min-width: 200px;
}
</style>
