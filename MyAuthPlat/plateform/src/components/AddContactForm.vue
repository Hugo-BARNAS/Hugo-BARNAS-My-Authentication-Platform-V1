<template>
  <div>
    <div class="mt-5">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Email:"
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
        <b-button type="submit" variant="primary" @click="postContact"
          >Add</b-button
        >
      </b-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "addContactForm",
  data() {
    return {
      form: {
        email: "",
        name: "",
        id_user_affiliate: this.$store.state.id,
      },
      show: true,
    };
  },
  methods: {
    postContact() {
      axios({
        method: "post",
        url: "http://localhost:3000/add-new-contact",
        data: this.form,
      });
      let that = this;
      that.form.email = "";
      that.form.name = "";
      that.form.id_user_affiliate = "";
    },

    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style></style>
