<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="signUp" active><signUp/></b-tab>
      <b-tab title="signIn"><signIn/></b-tab>
    </b-tabs>
  </div>
</template>
<script>
import signIn from "./SignInForm";
import signUp from "./SignUpForm";
export default {
  name: "FormHandler",
  components: {
    signIn,
    signUp,
  },
};
</script>

<style></style>
