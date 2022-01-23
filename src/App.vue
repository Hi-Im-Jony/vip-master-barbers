<template>
  <v-app>
    <NavbarDesktop v-if="windowWidth > 770" />
    <navbar-mobile v-if="windowWidth <= 770" />
    <router-view />
  </v-app>
</template>

<script>
import NavbarDesktop from "./components/NavBarDesktop.vue";
import NavbarMobile from "./components/NavbarMobile.vue";

export default {
  name: "App",
  components: { NavbarDesktop, NavbarMobile },
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
