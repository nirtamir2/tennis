<template>
  <v-container>
    <v-layout row>
      <v-flex sm6 offset-sm3>
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
          <v-btn type="submit">sign in</v-btn>
          <v-btn @click="onSignOff">sign off</v-btn>
          <v-alert success :value="showSuccessAlert">
            success!
          </v-alert>
          <v-alert error :value="showErrorAlert">
            no success!
          </v-alert>
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
        showSuccessAlert: false,
        showErrorAlert: false
      }
    },
    methods:
      {
        onSignup() {
          let a = this.email;
          let b = this.password;
          console.log({a, b});
          auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
            console.log(user)
            this.showSuccessAlert = true
            setTimeout(() => this.showSuccessAlert = false, 10000).catch()
          }).catch(error => {
            console.log(error)
            this.showErrorAlert = true
            setTimeout(() => this.showErrorAlert = false, 10000).catch()
          })
        },
        onSignOff() {
          auth.signOut().then(user => {
              console.log(user)
              this.showSuccessAlert = true
              setTimeout(() => this.showSuccessAlert = false, 10000)
            }
          ).catch(error => {
            console.log(error)
            this.showErrorAlert = true
            setTimeout(() => this.showErrorAlert = false, 10000)
          })
        }
      }
  }
</script>
