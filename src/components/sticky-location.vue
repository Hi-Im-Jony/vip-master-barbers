<template>
  <div id="sticky">
    <a href="#anchor">
      <v-icon class="icon">
        mdi-map-marker
      </v-icon>
      <div id="cstm-spacer"></div>

      Find Us
    </a>
  </div>
</template>

<script>
export default {
  name: "stickyLocation",
};
</script>

<style scoped>
#sticky {
  background: #c51e3f;
  border: solid aliceblue;
  border-width: 2px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  margin: 0 10px 0 10px;
}
#sticky a {
  color: aliceblue;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10% 10px 10%;
  height: 100%;
  width: 100%;
  text-align: center;
}

.icon {
  color: aliceblue !important;
  text-decoration: none;
}
#cstm-spacer {
  width: 10px;
}
@media (max-width: 490px) {
  #sticky {
    font-size: 0.9rem;
  }
}
@media (max-width: 430px) {
  .icon {
    font-size: 1rem !important;
  }
  #sticky a {
    padding: 5px;
  }
  #cstm-spacer {
    width: 2px;
  }
}
@media (max-width: 330px) {
  #sticky {
    font-size: 4vw;
    margin: 0 5px 0 5px;
  }
}
</style>
