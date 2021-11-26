<template>
  <div id="banner-container">
    <div
      id="banner"
      :style="{
        backgroundImage: 'url(' + require('@/assets/' + image + '') + ')',
      }"
    ></div>
    <div id="foreground">
      <h1>{{ title }}</h1>
      <br />
      <p>
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
import phoneBtn from "./phone-btn.vue";
export default {
  components: { phoneBtn },
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
  height: 80vh;
  min-height: 350px;
  width: 100vw;
  padding: 0;
  margin: 0;
  color: red;
}
#foreground {
  color: rgb(236, 241, 245);
  text-shadow: 2px 2px 10px black;
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
@media (min-width: 1160px) {
  #banner {
    background-attachment: fixed;
    background-position: bottom;
  }
}
@media (max-width: 770px) {
  #foreground {
    font-size: 1.5rem;
  }
  #banner {
    height: 70vh;
  }
}
@media (max-width: 450px) {
  #foreground {
    font-size: 1.3rem;
  }
}
</style>
