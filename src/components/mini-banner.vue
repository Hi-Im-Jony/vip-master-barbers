<template>
  <div id="mini-banner">
    <div id="text-container">
      <p id="text">
        For a free no-obligation quote on your next flat roofing repair or
        pitched roof repair, get in contact with us today.
      </p>
      <phone-btn />
    </div>
    <div id="image-container"></div>
  </div>
</template>
<script>
import phoneBtn from "./phone-btn.vue";
export default {
  components: { phoneBtn },
  name: "mini-banner",
};
</script>

<style scoped>
#mini-banner {
  background: rgba(11, 19, 43, 0.836);
  color: rgb(236, 241, 245);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 60px 0 60px 0;
  position: relative;
  width: 100%;
}
#text-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
#text {
  width: 85%;
  font-size: 25px;
  margin: 0 0 60px 0;
}
#image-container {
  width: 56%;
  height: 400px;
  position: relative;
  bottom: 0;
  background-image: url("../assets/roofer.png");
  background-size: cover;
  filter: grayscale(20%);
}
@media (max-width: 700px) {
  #mini-banner {
    flex-direction: column;
  }
  #text-container {
    margin: 15px 0 15px 0;
    width: 100%;
  }
  #text {
    margin: 0 0 20px 0;
  }
  #image-container {
    width: 100%;
    height: 200px;
  }
}
</style>
