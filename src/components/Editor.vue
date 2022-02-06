<template>
  <div id="editor">
    <div v-for="(value, i) in editedValues" :key="i">
      <v-text-field
        dark
        v-model="editedValues[i]"
        :label="i"
        style="font-size: 20px; text-transform: capitalize;"
      ></v-text-field>
    </div>

    <div id="btn-container">
      <a id="cancel-btn" @click="$emit('cancel')">Cancel</a>
      <a id="confirm-edit-btn" @click="$emit('submit', editedValues)"
        >Confirm</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["preEditValues", "visibility"],
  data() {
    return {
      editedValues: this.preEditValues,
    };
  },
  watch: {
    visibility: function(visible) {
      if (visible) {
        this.editedValues = this.preEditValues;
      }
    },
  },
};
</script>

<style scoped>
#editor {
  background: black;
  display: flex;
  flex-direction: column;
}

#btn-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

#cancel-btn {
  color: aliceblue;
  padding: 1px 10px 1px 10px;
  background: gray;
}

#confirm-edit-btn {
  padding: 1px 10px 1px 10px;
  background: rgb(61, 121, 49);
  color: aliceblue;
}
</style>
