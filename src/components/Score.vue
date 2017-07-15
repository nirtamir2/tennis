<template>
  <div>
    <template v-for="match in this.matches">
      <div>
        <v-layout row fluid>
          <v-flex v-for="player in team1(match)">
            <team-player :player="player"></team-player>
          </v-flex>
          <h4 class="text-xs-center">{{match.team1Score}}:{{match.team2Score}}</h4>
          <v-flex v-for="player in team2(match)">
            <team-player :player="player"></team-player>
          </v-flex>
        </v-layout>
      </div>
    </template>
  </div>
</template>

<script>
  import {db} from './../firebase'
  import TeamPlayer from './TeamPlayer.vue'
  export default {
    name: 'score',
    components: {TeamPlayer},

    data () {
      return {}
    },
    firebase: {
      matches: db.ref('matches'),
      players: {
        source: db.ref('players'),
        asObject: true
      }
    },
    methods: {
      team1(match){
        let keys = Object.keys(match.team1);
        let arr = [];
        for (let key of keys) {
          arr.push(this.players[key])
        }
        return arr;
      },
      team2(match){
        let keys = Object.keys(match.team2);
        let arr = [];
        for (let key of keys) {
          arr.push(this.players[key])
        }
        return arr;
      }
    },
  }
  ;
</script>
<style scoped>

  .middle {
    vertical-align: middle !important;
  }

</style>
