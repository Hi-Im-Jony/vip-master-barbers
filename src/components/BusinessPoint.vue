<template>
  <div id="business-point">
    <v-icon id="icon">
      {{ icon }}
    </v-icon>
    <p id="title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: ["icon", "title"],
};
</script>

<style scoped>
#business-point {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 2px;
  border-radius: 10px;
  width: 30%;
  max-width: 250px;
}
#icon {
  padding: 5px;
  font-size: 40px;
  color: black;
}
#title {
  margin: 2px 0 5px 0;
  white-space: pre-line;
}
</style>
