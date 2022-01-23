<template>
  <div>
    <a v-if="flashing" id="phone-btn" class="glow" href="tel:+353873794038">
      <v-icon id="icon" dark>
        mdi-phone
      </v-icon>
      087 379 4038
    </a>
    <a v-else id="phone-btn" href="tel:+353873794038">
      <v-icon id="icon" dark>
        mdi-phone
      </v-icon>
      087 379 4038
    </a>
  </div>
</template>

<script>
export default {
  name: "phone-btn",
  props: ["flashing"],
};
</script>

<style scoped>
#phone-btn {
  color: rgb(236, 241, 245);
  text-decoration: none;
  background: rgb(185, 22, 22);
  padding: 10px;
  /* border: solid rgb(236, 241, 245); */
  border-width: 2px;
  border-radius: 30px;
  display: flex;
  align-items: center;
}
#phone-btn:hover {
  background: rgb(110, 20, 20);
}
#icon {
  margin-right: 15px;
  font-size: inherit !important;
}
@keyframes glowing {
  0% {
    background-color: #8d1713;
    box-shadow: 0 0 5px #8d1713;
    transform: scale(1);
  }
  50% {
    background-color: red;
    box-shadow: 0 0 20px red;
    transform: scale(1.1);
  }
  100% {
    background-color: #8d1713;
    box-shadow: 0 0 5px #8d1713;
    transform: scale(1);
  }
}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
.glow {
  animation: glowing 1300ms infinite;
}
</style>
