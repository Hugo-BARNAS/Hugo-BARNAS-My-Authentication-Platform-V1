<template>
  <div>
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          placeholder="Enter password"
          required
          type="password"
        ></b-form-input>
      </b-form-group>
      <b-button
        type="submit"
        class="float-left"
        variant="success"
        @click="verifUser"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "signIn",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      btnText:'Show Password',
    };
  },
  methods: {
    verifUser() {
      let that = this;
      axios
        .post("http://localhost:3000/sign-in", this.form)
        
        .then((response) => {
          that.$store.dispatch("sentToken",response.data.token)
          switch (response.data.code) {
            case 200:
              that.$router.push("/dashboard");
              break;
            case 204:
              alert("Email and Password does not match");
              break;
            case 206:
              alert("Email or Password do not exits");
              break;
            default:
              alert("error not identified");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
