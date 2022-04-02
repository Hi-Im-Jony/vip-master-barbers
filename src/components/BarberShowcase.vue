<template>
  <div id="barber-showcase">
    <h4>{{ name }}</h4>
    <img :src="require('@/assets/' + src + '')" />
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: ["name", "description", "src"],
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  object-position: 100% 0;
}
</style>
