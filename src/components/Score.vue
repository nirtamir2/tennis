<template>
  <div>
    <template v-for="match in this.matches">
      <div>
        <v-layout row fluid @dblclick = openDialog(match)>
          <v-flex class="text-xs-center" v-for="player in team1(match)">
            <team-player :player="player"></team-player>
          </v-flex>
          <h4 class="text-xs-center">{{match.team1Score}}:{{match.team2Score}}</h4>
          <v-flex  class="text-xs-center" v-for="player in team2(match)">
            <team-player :player="player"></team-player>
          </v-flex>
        </v-layout>
      </div>
    </template>
    <v-layout row justify-center style="position: relative;">
      <v-dialog v-model="dialog" lazy absolute>
        <v-card>
          <v-card-title>
            <div class="headline">removing match</div>
          </v-card-title>
          <v-card-text>do you want to remove match this match? {{match.team1Score}}:{{match.team2Score}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">No</v-btn>
            <v-btn class="green--text darken-1" flat="flat" @click.native="removeElement(match)">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  import {db} from './../firebase'
  import TeamPlayer from './TeamPlayer.vue'
  import Service from './../services/addMatch'
  export default {
    name: 'score',
    components: {TeamPlayer},

    data () {
      return {
        dialog: false,
        test: true,
        match: {}
      }
    },
    firebase: {
      matches: db.ref('matches'),
      players: {
        source: db.ref('players'),
        asObject: true
      }
    },
    methods: {
      openDialog(match){
        this.match = match
        this.dialog=true;
      }
      ,
      removeElement(match) {
        Service.remove(match)
        this.dialog=false
      },
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
