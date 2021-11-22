<template>
  <div id="navbar">
    <v-app-bar color="white" fixed app>
      <a href="/" id="title-sub-container">
        <img id="logo" src="@/assets/logo.png" />
      </a>

      <v-spacer></v-spacer>

      <a class="nav-link" href="/">Home</a>
      <a class="nav-link" href="/services">Services & Products</a>
      <a class="nav-link" href="/booking">Booking</a>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
#logo {
  height: 60px;
}
.nav-link {
  color: black;
  text-decoration: none;
  margin: 0 10px 0 10px;
}
.nav-link:hover {
  color: rgb(65, 136, 202);
}
.nav-link:active {
  color: rgb(46, 102, 206);
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
.custom-spacer {
  width: 75px;
}
.custom-menu {
  background-color: black !important;
}
</style>
