<template>
  <v-app>
    <navbar v-if="windowWidth > 770" />
    <navbar-mobile v-if="windowWidth <= 770" />
    <home />
  </v-app>
</template>

<script>
import Home from "./views/Home.vue";
import Navbar from "./components/navbar.vue";
import NavbarMobile from "./components/navbar-mobile.vue";

export default {
  name: "App",
  components: { Navbar, Home, NavbarMobile },
  data: () => ({
    windowWidth: window.innerWidth,
  }),
};
</script>

<style scoped>
* {
  font-family: Helvetica, sans-serif;
}
</style>
