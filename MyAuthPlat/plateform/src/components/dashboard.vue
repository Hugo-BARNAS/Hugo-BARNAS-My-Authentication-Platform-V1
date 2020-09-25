<template>
  <div>
    <b-jumbotron header="Connexion interface">
      <p>
        Welcome to connect user !
      </p>
      <hr class="my-4" />
      <b-button v-on:click="deconnexion" variant="danger">Sign-Out</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import Vuex from 'vuex';
export default {
  name: "dashboard",
  methods: {
    ...Vuex.mapActions([
      'deleteToken'
    ]),
    deconnexion: function(){
      this.$store.dispatch('deleteToken');
      this.$router.push('home');
    }
  },
};
</script>

<style></style>
