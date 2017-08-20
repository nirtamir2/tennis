<template>
  <v-container>
    <v-layout row>
      <v-flex  sm6 offset-sm3>
        <form @submit.prevent="onSignup">
          <v-text-field name="email"
                        label="Mail"
                        id="email"
                        v-model="email"
                        type="email"
                        required>
          </v-text-field>
          <v-text-field name="password"
                        label="Password"
                        id="password"
                        v-model="password"
                        type="password"
                        required>
          </v-text-field>
          <v-btn type="submit">sign up</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import {auth} from './../firebase'

  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods:
      {
        onSignup() {
          let a = this.email;
          let b = this.password;
          console.log({a, b});
          auth.createUserWithEmailAndPassword(this.email, this.password).then(user => console.log(user));
        }
      }
  }
</script>
