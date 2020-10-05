<template>
  <div>
    <h3>{{ message }}</h3>
    <b-form @reset="onReset" v-if="show" @submit.stop.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="$v.form.email.$model"
          :state="validateEmail('email')"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback"
          >Veuillez renseigner votre email</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group id="input-group-2" label="Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="$v.form.name.$model"
          :state="validateName('name')"
          required
          placeholder="Enter name"
        >
        </b-form-input>
        <b-form-invalid-feedback
          >Veuillez renseigner votre nom</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          v-model="$v.form.password.$model"
          :state="validatePassword('password')"
          placeholder="Enter password"
          required
        ></b-form-input>
        <b-form-invalid-feedback
          >Votre mot de passe doit faire au moins 8
          caractères</b-form-invalid-feedback
        >
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
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  mixins: [validationMixin],
  name: "signUp",
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
      },
      show: true,
      message:"",
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        minlength: minLength(4),
      },
      password: {
        required,
        minlength: minLength(8),
      },
    },
  },
  methods: {
    postUser() {
      let that = this;
      axios
        .post("http://localhost:3000/sign-up", that.form)
        .then((response) => {
          console.log(response.data);
          if (response.status === 202) {
         alert("Put an another name")
          } else {
           alert("OK") 
          }
        });
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
    validateName(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    validateEmail(email) {
      const { $dirty, $error } = this.$v.form[email];
      return $dirty ? !$error : null;
    },
    validatePassword(password) {
      const { $dirty, $error } = this.$v.form[password];
      return $dirty ? !$error : null;
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
    },
  },
};
</script>
