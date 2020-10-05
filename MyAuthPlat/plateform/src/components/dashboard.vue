<template>
  <div>
    <connectHeader />
    <b-jumbotron header="Welcome to connect user !">
      <hr class="my-4" />
    </b-jumbotron>
    <div>
      <b-tabs content class="mt-3 ml-tab-30">
        <b-tab title="List-Contacts" active ><contactList /></b-tab>
        <b-tab title="Add-Contacts" class="ml-10"><addContactForm /></b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import connectHeader from "./ConnectHeader";
import addContactForm from "./AddContactForm";
import contactList from "./ContactList";
export default {
  name: "dashboard",

  components: {
    connectHeader,
    addContactForm,
    contactList,
  },
};
</script>

<style scoped>
.ml-10 {
  margin-left: 13vh;
  margin-right: 30vh;
}
.ml-tab-30 {
  margin-left: 30vh;
  margin-right: 30vh;
}

.m-border {
  margin: 5vh 20vw 0vh 7vw;
}
</style>
