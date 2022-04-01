<template>
  <div id="business-point">
    <v-icon id="icon">
      {{ icon }}
    </v-icon>
    <h3 id="title">{{ title }}</h3>
    <p id="text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: ["icon", "title", "text"],
};
</script>

<style scoped>
#business-point {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(255, 255, 255);
  background: rgb(126, 173, 211);
  margin: 10px;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  width: 100%;
  box-shadow: 0px 6px 10px #000000;
}
#icon {
  padding: 5px;
  font-size: 50px;
  color: whitesmoke;
}

#text {
  white-space: pre-line;
}
</style>
