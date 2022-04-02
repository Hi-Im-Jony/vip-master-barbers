<template>
  <section id="intro">
    <h2 id="section-title">
      About Us
    </h2>

    <p>
      Elvis Hairstyle is a luxurious barber shop that delivers awesome haircuts
      and barbering services to customers. Our fully equipped shop has the most
      recent barbering or haircut machine that ensures your world-class
      experience for our customers
    </p>
    <div class="img-filter-container">
      <img id="duo-img" src="../assets/duo.jpeg" alt="" />
      <div class="filter"></div>
    </div>
    <p>
      Our main aim has always been in developing a great fusion of light, music,
      uniqueness, and remarkable barbering services that surely offer and
      customers a mind-blowing experience.
    </p>

    <div class="img-filter-container">
      <img id="saloon-img" src="../assets/saloon.jpeg" alt="" />
      <div class="filter"></div>
    </div>

    <p>
      Talking about our interiors, we have a classic mix of architecture that
      makes our customers feel special and delighted. Our barbering services are
      tailored to meet your all requirements for hair and skin.
    </p>

    <v-btn dark color="#38C" to="/bookings">
      Book Now
    </v-btn>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
#intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  width: 100%;
}
#section-title {
  text-decoration: underline;
  color: rgb(26, 45, 59);
  font-size: 27px;
}

.color-1 {
  color: rgb(0, 75, 136);
}

.img-filter-container {
  position: relative;
  margin: 10px 0;
}

#duo-img {
  width: 90vw;
  height: 100%;
}

#saloon-img {
  width: 90vw;
  height: 100%;
}

.filter {
  position: absolute;
  top: 0;
  background: rgba(64, 87, 160, 0.233);
  width: 100%;
  height: 100%;
}
</style>
