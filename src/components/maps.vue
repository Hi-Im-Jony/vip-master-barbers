<template>
  <div id="m-container">
    <div id="anchor"></div>
    <div id="maps-container">
      <div class="map">
        <div id="title">
          <h2 class="red-text">Where To</h2>
          <h2 class="blue-text">Find Us</h2>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152515.25477480114!2d-6.386129154263463!3d53.324442735417136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e80ea27ac2f%3A0xa00c7a9973171a0!2sDublin!5e0!3m2!1sen!2sie!4v1637603962313!5m2!1sen!2sie"
          style="border:0;"
          loading="lazy"
        ></iframe>
        <h3>
          <br />
          Real Business Address,
          <br />
          Dublin , Ireland
          <br />
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "maps",
};
</script>

<style scoped>
#m-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  color: aliceblue;
}

#maps-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgb(10, 8, 41);
}
.map {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 45%;
  min-width: 250px;
  max-width: 450px;
  height: 50vw;
  min-height: 350px;
  max-height: 550px;
  margin: 10px;
  padding: 10px;
}
#title {
  display: flex;
  border-bottom: 1.5px solid white;
  justify-content: center;
  width: 75%;
  margin: 0 0 10px 0;
}
h2 {
  margin: 0 5px 0 5px;
}
.red-text {
  color: rgb(182, 31, 31);
}
.blue-text {
  color: rgb(32, 32, 173);
}

h3 {
  color: white;
}

iframe {
  width: 100%;
  height: 100%;
}

@media (max-width: 750px) {
  #maps-container {
    flex-direction: column;
    align-items: center;
    height: 60vh;
  }
  .map {
    min-width: none;
    width: 100%;
    height: 100%;
  }
}
</style>
