<template>
  <div>
    <b-form @reset="onReset" v-if="show">
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

      <b-form-group id="input-group-2" label="Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          v-model="form.password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button
        type="submit"
        class="float-left"
        variant="success"
        @click="postUser"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "signUp",
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    postUser() {
      axios({
        method: "post",
        url: "http://localhost:3000/sign-up",
        data: this.form,
      });
      let that = this;
      that.form.email = "";
      that.form.name = "";
      that.form.password = "";
    },
    onReset(evt) {
      let that = this;
      evt.preventDefault();
      // Reset our form values
      that.form.email = "";
      that.form.name = "";
      that.form.password = "";
    },
  },
};
</script>
