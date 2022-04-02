<template>
  <v-app>
    <NavbarDesktop v-if="windowWidth > 770" />
    <navbar-mobile v-if="windowWidth <= 770" />
    <router-view />
    <cstm-footer />
  </v-app>
</template>

<script>
import CstmFooter from "./components/CstmFooter.vue";
import NavbarDesktop from "./components/NavBarDesktop.vue";
import NavbarMobile from "./components/NavbarMobile.vue";

export default {
  name: "App",
  components: { NavbarDesktop, NavbarMobile, CstmFooter },
  data: () => ({
    windowWidth: window.innerWidth,
  }),
};
</script>

<style scoped>
* {
  font-family: "Amatic SC";
}
</style>
