<template>
  <v-app>
    <navbar v-if="windowWidth > 770" />
    <nav-two v-if="windowWidth <= 770" />
    <home />
  </v-app>
</template>

<script>
import NavTwo from "@/components/nav-two.vue";
import Home from "./views/Home.vue";
import Navbar from "./components/navbar.vue";

export default {
  name: "App",
  components: { Navbar, NavTwo, Home },
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
