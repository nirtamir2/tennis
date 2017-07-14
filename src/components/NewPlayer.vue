<template>
  <v-container fluid>
    <v-text-field
      label="name"
      v-model.trim="name"
      required
    ></v-text-field>
    <v-text-field
      label="image"
      v-model.trim="image"
      required
    ></v-text-field>
    <small>*indicates required field</small>
    <div>
      <v-btn @click.native="save">save</v-btn>
    </div>
  </v-container>
</template>
<script>
  import {db} from '../firebase'
  export default {
    data()
    {
      return {
        image: "",
        name: ""
      };
    },
    methods: {
      save(){
        if (this.image && this.name) {
          db.ref('players').push({name: this.name, avatar: this.image});

          this.image = "";
          this.name = "";
        }
      },
    }
  };
</script>
