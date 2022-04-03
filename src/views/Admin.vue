<template>
  <div id="admin-page">
    <v-expansion-panels flat v-model="panel" multiple>
      <!-- Panel 1 -->
      <v-expansion-panel style="background: transparent !important;">
        <v-expansion-panel-header
          style="background: white !important; margin-bottom: 10px"
        >
          <h2>Manage Barbers</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- barber manager -->
          <barber-manager :key="managerKey" />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Panel 2 -->
      <v-expansion-panel style="background: transparent !important;">
        <v-expansion-panel-header
          style="background: white !important; margin-bottom: 10px; "
        >
          <h2>Manage Services</h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- services manager -->
          <service-manager />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import BarberSelector from "../components/BarberSelector.vue";
import BarberManager from "../components/BarberManager.vue";
import ServiceManager from "../components/ServiceManager.vue";

export default {
  components: {
    BarberSelector,
    BarberManager,
    ServiceManager,
  },
  data() {
    return {
      managerKey: 1,
      panel: [],
    };
  },
};
</script>

<style scoped>
#admin-page {
  min-height: 100vh;
  background-image: url("../assets/backgrounds/white-marble.jpg");
  background-size: contain;
  background-repeat: repeat;
  padding: 70px 0 20px 0;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
