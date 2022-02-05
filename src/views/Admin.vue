<template>
  <div id="admin-page">
    <v-expansion-panels dark v-model="panel" multiple>
      <!-- Panel 1 -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h1>Add a Barber</h1>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- barber adder -->
          <barber-adder @barberAdded="managerKey++" />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Panel 2 -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h1>Manage Barbers</h1>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- barber manager -->
          <barber-manager :key="managerKey" />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Panel 3 -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h1>Manage Services</h1>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- services manager -->
          <add-service-form />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import Calendar from "../components/Calendar.vue";
import BarberSelector from "../components/BarberSelector.vue";
import BarberAdder from "../components/BarberAdder.vue";
import BarberManager from "../components/BarberManager.vue";
import AddServiceForm from "../components/ServiceAdder.vue";

export default {
  components: {
    Calendar,
    BarberSelector,
    BarberAdder,
    BarberManager,
    AddServiceForm,
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
  background-color: rgb(30, 30, 32);
  padding: 70px 0 20px 0;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
