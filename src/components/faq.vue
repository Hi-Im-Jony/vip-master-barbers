<template>
  <div id="faq-container">
    <h1 style="text-align:center; color:#DC143C;">FAQ's</h1>
    <VueFaqAccordion :items="myItems" />
  </div>
</template>

<script>
import VueFaqAccordion from "vue-faq-accordion";

export default {
  components: {
    VueFaqAccordion,
  },
  data() {
    return {
      myItems: [
        {
          title: "How much is a flat roof repair?",
          value:
            "We offer free no-obligation quotes on all flat roof repairs. Our quotes are based on the type of flat roof and the nature of the repairs needed. No matter the specifics of your flat roof repair we always make every effort to supply a competitive quote.",
        },
        {
          title: "Will a reroof increase the value of my property?",
          value:
            "While it may not increase the value of your property a reroof will in all likelihood be a big selling point when you come to sell your home, helping you get the full asking price.",
        },
        {
          title: "How do I know when my roof needs to be replaced?",
          value:
            "<h4>A few tell-tale signs are:</h4><ol><li>Shingle edges have begun to curl</li><li>Your roof is over 20 years old</li><li>Repeated problems with leaks and or ceiling damp</li><li>Slates and tiles need to be replaced and repaired regularly</li></ol>",
        },
      ],
    };
  },
};
</script>

<style scoped>
#faq-container {
  width: 25%;
}
@media (max-width: 1100px) {
  #faq-container {
    width: 75vw;
  }
}
</style>
