<template>
  <div id="about-container">
    <div id="title">
      <h1 class="red-text">About</h1>

      <h1 class="red-text">Us</h1>
    </div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga assumenda
      repellat cum impedit nostrum quod ullam eum in fugit voluptate libero
      minus recusandae, reprehenderit error minima expedita?
    </p>
    <img id="shop-img" src="" />
    <p>
      Porro autem itaque nostrum perferendis explicabo, laborum nesciunt magni
      vitae nihil facilis fugiat dignissimos voluptatem, accusamus in illum
      dicta tempora iusto omnis ipsam magnam dolores? Placeat voluptatibus fugit
      suscipit architecto animi eius inventore.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#about-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  text-align: center;
}
#title {
  display: flex;
  border-bottom: 1px solid white;
  justify-content: center;
  width: 75%;
}
h1 {
  margin: 0 5px 0 5px;
}
.red-text {
  color: rgb(175, 67, 67);
}
.blue-text {
  color: rgb(65, 65, 168);
}
p {
  margin: 20px 0 20px 0;
}
#shop-img {
  height: 300px;
}
</style>
