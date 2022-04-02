<template>
  <div id="barber-showcase">
    <img :src="require('@/assets/' + src + '')" />
    <div id="text-container">
      <p id="name">{{ name }}</p>
      <p id="description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "description", "src"],
};
</script>

<style scoped>
#barber-showcase {
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.img-filter-container {
  position: relative;
  margin: 10px 0;
}
img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  object-position: 100% 0;
}

#text-container {
  margin: 0 5px 0 15px !important;
  padding: 0 !important;
}
#name {
  font-size: 25px;
  margin: 0 !important;
  padding: 0 !important;
}
#description {
  font-style: italic;
  font-size: 13px;
}
</style>
