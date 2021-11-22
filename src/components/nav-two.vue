<template>
  <div>
    <v-app-bar app>
      <a href="/" id="title-sub-container">
        <img id="logo" src="@/assets/logo.png" />
      </a>
      <v-spacer />
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <div id="nav-links-container">
        <a href="/" class="nav-link">Home</a>
        <a href="/services" class="nav-link">Services</a>
        <a href="/book" class="nav-link">Booking</a>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "navTwo",
  data: () => ({
    drawer: false,
    media: false,
    group: null,
    items: [
      {
        title: "Recitals",
        to: "/recitals",
      },
      // {
      //   title: "Past and Present Pupils",
      //   to: "/pupils",
      // },
      {
        title: "Testimonials",
        to: "/testimonials",
      },
    ],
  }),
};
</script>

<style scoped>
#logo {
  height: 60px;
}
#title {
  padding: 0px;
  margin: 10px 0px -10px 0px;
  color: black;
}
#sub {
  padding: 0px 0px 10px 0px;
  margin: 0px;
  color: black;
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
  color: black;
  text-decoration: none;
  padding: 30px;
}
.nav-link:hover {
  color: rgb(65, 136, 202);
}
.nav-link:active {
  color: rgb(46, 102, 206);
}
#media-container {
  background: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
