<template>
  <div>
    <b-jumbotron header="Connexion interface">
      <p>
        Below the formulary for signUp or signIn our magnificient application !
      </p>
      <hr class="my-4" />
      <FormHandler/>
    </b-jumbotron>
  </div>
</template>

<script>
import FormHandler from "./FormHandler";
export default {
  name: "Homepage",
  components: {
    FormHandler,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
