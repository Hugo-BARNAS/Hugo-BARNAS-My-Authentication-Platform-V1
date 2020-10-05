<template>
  <div>
    <li v-for="contact in contacts" :key="contact.name" class="border border-dark m-border mt-5 ">
      <p class="d-inline mt-5 ml-5 font-weight-bold">Name :</p>
      <p class="d-inline mt-5 ml-3 "> {{ contact.name}}</p>
      <p class="d-inline mt-5 ml-5 font-weight-bold">Email :</p>
      <p class="d-inline mt-5 ml-3 mr-5">{{ contact.email}}</p>
    </li>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "contactList",
  computed: {
    ...mapGetters(["contacts"]),
  },
};
</script>’

<style scoped>
li {
 list-style-type: none;
}
</style>>

