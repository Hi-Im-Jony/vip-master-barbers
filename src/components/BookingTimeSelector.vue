<template>
  <div id="booking-time-selector">
    <div>
      {{ rosteredTimes }}
    </div>
    <div>
      {{ bookedTimes }}
    </div>
  </div>
</template>

<script>
import * as fb from "@/fb";
export default {
  props: ["rosteredTimes", "bookedTimes"],
  data() {
    return {
      times: [],
    };
  },
};
</script>

<style scoped></style>
