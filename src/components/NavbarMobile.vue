<template>
  <div>
    <v-app-bar
      id="nav"
      flat
      :style="'background-color: rgb(30, 30, 32,' + navOpacity + ');'"
      app
    >
      <a href="/" id="title-sub-container">
        <img id="logo" src="@/assets/logo.png" />
      </a>
      <v-spacer />
      <v-app-bar-nav-icon dark @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer id="drawer" v-model="drawer" app temporary>
      <div id="nav-links-container">
        <a href="/" class="nav-link">Home</a>
        <a href="/services" class="nav-link">Services</a>
        <a href="/bookings" class="nav-link">Booking</a>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "navTwo",
  data: () => ({
    drawer: false,
    navOpacity: 0,
  }),
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      let windowTop = window.top.scrollY;
      this.navOpacity = windowTop / 400;
    },
  },
};
</script>

<style scoped>
#nav {
  padding: 0 !important;
  margin: 0 !important;
}
#drawer {
  background-color: rgb(34, 33, 33);
}
#logo {
  height: 50px;
}
#title-sub-container {
  color: black;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#nav-links-container {
  list-style: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.nav-link {
  color: whitesmoke;
  text-decoration: none;
  padding: 30px;
}
.nav-link:hover {
  color: rgb(65, 136, 202);
}
.nav-link:active {
  color: rgb(46, 102, 206);
}
</style>
