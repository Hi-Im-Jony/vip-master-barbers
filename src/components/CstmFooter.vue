<template>
  <footer>
    <p id="compname">&copy; VIP Master Barbers - 2021</p>
  </footer>
</template>

<script>
export default {
  name: "myfooter",
};
</script>
<style scoped>
footer {
  width: 100%;
  background: rgb(34, 33, 33);
  color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5px 10px 5px 10px;
}
#col-1 {
  width: 70%;
}
.location-container {
  color: rgb(202, 21, 21);
  padding: 10px;
  margin: 0;
  display: flex;
  align-items: center;
  text-decoration: none;
}
.location {
  margin: 0 !important;
}
.number-container {
  color: rgb(202, 21, 21);
  padding: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 100%;
}
.number-container:hover {
  color: rgb(235, 37, 37);
}
.number {
  margin: 0 !important;
  width: 100%;
}
.email-container {
  border: solid white;
  width: 100%;
}

.icon {
  font-size: 1.5rem !important;
  color: inherit !important;
}

@media (max-width: 600px) {
  footer {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem !important;
  }

  .number-container {
    padding: 10px;
  }
}
</style>
