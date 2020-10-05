<template>
  <div class="fond-de-couleur d-flex justify-content-around">
    <p class="p-color font-weight-bold">Dashboard</p>
    <p class="p-color">{{ name }}</p>
    <b-button v-on:click="deconnexion" variant="danger">Sign-Out</b-button>
  </div>
</template>

<script>
import Vuex from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "connectHeader",
  methods: {
    ...Vuex.mapActions(["deleteToken"]),
    deconnexion: function() {
      this.$store.dispatch("deleteToken");
      this.$router.push("home");
    },
  },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style scoped>
.fond-de-couleur {
  background-color: black;
}
.p-color {
  margin-top: 1.1vh;
  color: white;
}
</style>
