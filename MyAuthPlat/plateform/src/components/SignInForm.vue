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
          v-model="$v.form.email.$model"
          :state="validateEmail('email')"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
        <b-form-invalid-feedback
          >Veuillez renseigner votre email</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="$v.form.password.$model"
          :state="validatePassword('password')"
          placeholder="Enter password"
          required
          type="password"
        ></b-form-input>
        <b-form-invalid-feedback
          >Veuillez renseigner votre mot de passe</b-form-invalid-feedback
        >
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
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import jwt from "jsonwebtoken";
import { mapGetters } from "vuex";
export default {
  mixins: [validationMixin],
  name: "signIn",
  computed: {
    ...mapGetters(["id"]),
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      btnText: "Show Password",
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
        minlength: minLength(4),
      },
    },
  },
  methods: {
    verifUser() {
      let that = this;
      axios
        .post("http://localhost:3000/sign-in", this.form)
        .then((response) => {
          //console.log(response.data);
          const decoded = jwt.decode(response.data.token, { complete: true });
          //console.log(decoded.payload.id);
          //console.log(decoded.payload.name);
          that.$store.dispatch("sentToken", response.data.token);
          that.$store.dispatch("nameUser", decoded.payload.name);
          that.$store.dispatch("idUser", decoded.payload.id);
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
      axios
        .get(`http://localhost:3000/get-contacts/${this.$store.state.id}`)
        .then((response) => {
          console.log(response.data);
          that.$store.dispatch("contacts", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    validateEmail(email) {
      const { $dirty, $error } = this.$v.form[email];
      return $dirty ? !$error : null;
    },
    validatePassword(password) {
      const { $dirty, $error } = this.$v.form[password];
      return $dirty ? !$error : null;
    },
  },
};
</script>
