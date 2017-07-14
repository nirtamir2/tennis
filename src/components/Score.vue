<template>
  <v-layout row fluid>
    <v-flex fluid>
      <v-avatar>
        <img style="vertical-align:middle" :src="score.leftAvatar" :alt="score.leftTeam">
        <h4>{{score.leftTeam}}</h4>
      </v-avatar>
    </v-flex>
    <h4 class="text-xs-center">{{score.leftScore}}:{{score.rightScore}}</h4>
    <v-flex fluid>
      <v-avatar class="middle">
        <h4 class="middle">{{score.rightTeam}}</h4>
        <img class="middle" :src="score.rightAvatar" :alt="rightTeam">
      </v-avatar>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        score: {
          leftAvatar: "https://api.adorable.io/avatars/285/3@adorable.io.png",
          rightAvatar: "https://api.adorable.io/avatars/285/3@adorable.io.png",
          leftTeam: "Nir Tamir",
          rightTeam: "Elad Amir",
          leftScore: "1",
          rightScore: "1"
        }
      }
    }
  }
  ;
</script>
<style scoped>

  .middle {
    vertical-align: middle !important;
  }

</style>
