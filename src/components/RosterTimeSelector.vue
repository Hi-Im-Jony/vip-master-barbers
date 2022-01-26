<template>
  <v-dialog
    fullscreen
    persistent
    open-delay="0"
    transition="none"
    v-model="loading"
  >
    <div id="loader-container">
      <p>Barber: {{ barber }}</p>
      <p>Date: {{ date }}</p>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ["loading", "barber", "date"],
};
</script>

<style scoped>
#loader-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  widows: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.712);
  color: whitesmoke;
}
</style>
