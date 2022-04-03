<template>
  <section id="the-team">
    <h2 id="section-title">Meet The Team</h2>
    <barber-showcase
      name="Elvis"
      description="Professional Hairstylist"
      src="elvis.jpeg"
    />
    <p>
      With over 15 years of experience in servicing clients' hair and barber
      needs, Elvis has seen and done it all. His expertise, though, lies in
      men's haircuts and styling.
    </p>
    <p>
      His attention to detail and intense passion in providing exceptional
      barber experience has led him to provide clients with high-quality hair
      services.
    </p>
    <barber-showcase
      name="Gabrila"
      description="Professional Hairstylist"
      src="gab.jpeg"
    />
    <p>
      Gabrila has been in the Salon Industry for over 15 years. She specializes
      in a variety of men's haircuts. Gabrila is a perfectionist in everything
      that she does. She always has a smile on her face and greets everyone
      welcomely.
    </p>
    <p>
      She treats everyone with the best hospitality she will always offer you a
      glass of water or a cup of coffee to make you feel welcome as you wait for
      your service.
    </p>
  </section>
</template>

<script>
import * as fb from "@/fb";
import BarberShowcase from "./BarberShowcase.vue";

export default {
  components: { BarberShowcase },
  data() {
    return {
      barbers: [],
    };
  },
  created: async function() {
    await fb.getAllBarbers().then((response) => {
      this.barbers = response;
    });
    this.getAttempted = true;
  },
};
</script>

<style scoped>
#section-title {
  color: rgb(26, 45, 59);
  font-size: 27px;
  text-align: center;
}
p {
  width: 85vw;
  max-width: 600px;
  text-align: center;
  margin: 5px 0 !important;
}
</style>
