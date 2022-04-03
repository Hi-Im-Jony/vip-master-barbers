<template>
  <div id="map-section">
    <h2 id="section-title">
      Where to Find Us
    </h2>
    <div class="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2378.7269982952685!2d-6.421629184159453!3d53.40182327999064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48676d5d328d72df%3A0x2999eb3a236ee384!2s15%20Deerhaven%20Walk%2C%20Huntstown%2C%20Dublin!5e0!3m2!1sen!2sie!4v1648919455104!5m2!1sen!2sie"
        loading="lazy"
      ></iframe>
    </div>
    <p id="address">
      Deerhaven Walk,
      <br />
      Clonee, Dublin 15
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#map-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#section-title {
  color: rgb(26, 45, 59);
  font-size: 27px;
  text-align: c;
}
.map {
  width: 90vw;
  max-width: 500px;
}
iframe {
  width: 100%;
  border: 0;
}

#address {
  font-size: 20px;
  text-align: center;
}
</style>
