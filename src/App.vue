<template>
  <v-app>
    <navbar v-if="windowWidth > 770" />
    <navbar-mobile v-if="windowWidth <= 770" />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import NavbarMobile from "./components/NavbarMobile.vue";

export default {
  name: "App",
  components: { Navbar, NavbarMobile },
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
