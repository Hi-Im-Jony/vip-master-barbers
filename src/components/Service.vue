<template>
  <div id="service">
    <h2 id="name">{{ service.name }}</h2>
    <h4>€{{ service.price }}</h4>
    <p>{{ service.desc }}</p>
  </div>
</template>

<script>
export default {
  props: ["service"],
};
</script>

<style scoped>
#service {
  margin: 15px;
  padding: 15px;
  border: solid aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  flex: 1 1 0px;
  min-width: 100px;
}

#name {
  border-bottom: solid aliceblue 1px;
  padding: 0 10px 0 10px;
}
</style>
