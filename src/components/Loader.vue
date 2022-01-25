<template>
  <v-dialog
    fullscreen
    persistent
    open-delay="0"
    transition="none"
    v-model="loading"
  >
    <div id="loader-container">
      <preloader color="#295D8F " />
    </div>
  </v-dialog>
</template>

<script>
import Preloader from "./Preloader.vue";
export default {
  components: { Preloader },
  props: ["loading"],
};
</script>

<style scoped>
#loader-container {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  widows: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.712);
}
</style>
