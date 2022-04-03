<template>
  <div id="barber-showcase">
    <img :id="'barber-img-' + name" src="" />
    <div id="text-container">
      <p id="name">{{ name }}</p>
      <small id="subheading">{{ subheading }}</small>
      <p v-if="forAdmin == false" id="description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
import * as fb from "@/fb";
export default {
  props: ["name", "forAdmin"],
  data() {
    return {
      subheading: "",
      description: "",
      url: "",
    };
  },
  created: function() {
    this.getBarberDetails();
  },
  methods: {
    getBarberDetails: async function() {
      let name = this.name;
      const barber = await fb.getBarber(name);
      console.log(barber);
      this.subheading = barber.subheading;
      this.description = barber.description;
      fb.getBarberImgUrl(name).then(function(url) {
        let id = "barber-img-" + name;
        document.getElementById(id).src = url;
      });
    },
  },
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
  align-self: flex-start;
  position: relative;
  top: 10px;
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
#subheading {
  font-style: italic;
  font-size: 13px;
}
#description {
  white-space: pre-line;
}
</style>
