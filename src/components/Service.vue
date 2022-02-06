<template>
  <div :class="serviceClass">
    <p class="name">{{ service.name }}</p>
    <p class="price">€{{ service.price }}</p>
  </div>
</template>

<script>
export default {
  props: ["service", "selected"],
  computed: {
    serviceClass: function() {
      let classes = "service";
      if (this.selected) classes = classes + " selected";
      return classes;
    },
  },
};
</script>

<style scoped>
.service {
  padding: 0 15px 0 15px;
  border-bottom: solid aliceblue 1px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  max-width: 600px;
}

.service p {
  font-size: 20px;
  text-transform: capitalize;

  margin: 0 0 5px 0;
}
.selected {
  background: rgba(53, 81, 156, 0.548);
}
</style>
