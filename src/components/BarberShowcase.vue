<template>
  <div id="barber-showcase">
    <div id="top-row">
      <img class="barber-img" :id="'barber-img-' + name" src="" />
      <div>
        <p id="name">{{ name }}</p>
        <small id="subheading">{{ subheading }}</small>
      </div>
    </div>
    <div id="text-container">
      <p v-if="showDesc" id="description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
import * as fb from "@/fb";
export default {
  props: ["name", "showDesc"],
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
  flex-direction: column;
}
#top-row {
  display: flex;
}

.barber-img {
  width: 70px !important;
  height: 70px !important;
  border-radius: 50%;
  object-fit: cover;
  object-position: 100% 0;
  margin: 0 10px 0 0;
}

#text-container {
  position: relative;
  margin: 10px 15px 0 5px;
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
