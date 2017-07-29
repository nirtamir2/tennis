<template>
  <div class="ma-5">
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
  </div>
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
          let playerKey = db.ref('players').push({name: this.name, avatar: this.image}).key;

          let newRank = {};
          newRank['rank/' + playerKey] = {matches: 0, wins: 0, draw: 0, lose: 0, points: 0};
          db.ref().update(newRank);

          this.image = "";
          this.name = "";
        }
      },
    }
  };
</script>
