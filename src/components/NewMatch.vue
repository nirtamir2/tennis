<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm6>
        <v-dialog
          persistent
          lazy
          full-width
        >
          <v-text-field
            slot="activator"
            label="date"
            prepend-icon="event"
            v-model="date"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date"
                         scrollable>
            <template scope="{ save, cancel }">
              <v-card-actions>
                <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                <v-btn flat primary @click.native="save()">Save</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>


    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-select
          label="team 1"
          :items="players"
          v-model="selectedTeam1"
          item-text="name"
          item-value=".key"
          multiple
          chips
          max-height="200"
        >
          <template slot="selection" scope="data">
            <v-chip
              close
              @input="data.parent.selectItem(data.item)"
              @click.native.stop
              class="chip--select-multi"
              :key="data.item.key"
            >
              <v-avatar>
                <img :src="data.item.avatar">
              </v-avatar>
              {{ data.item.name }}
            </v-chip>
          </template>
          <template slot="item" scope="data">
            <v-list-tile-avatar>
              <img :src="data.item.avatar"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>
      <v-btn
        class="green elevation-10"
        dark
        button
        right
        fab
        fixed
        @click.native="moveToNewMPlayerScreen"
      >
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-flex xs12 sm6>
        <v-select
          label="team 2"
          :items="players"
          v-model="selectedTeam2"
          item-text="name"
          item-value=".key"
          multiple
          chips
          max-height="200"
        >
          <template slot="selection" scope="data">
            <v-chip
              close
              @input="data.parent.selectItem(data.item)"
              @click.native.stop
              class="chip--select-multi"
              :key="data.item.key"
            >
              <v-avatar>
                <img :src="data.item.avatar">
              </v-avatar>
              {{ data.item.name }}
            </v-chip>
          </template>
          <template slot="item" scope="data">
            <v-list-tile-avatar>
              <img :src="data.item.avatar"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6>
        <v-select
          :items="Array.apply(null, {length: 10}).map(Number.call, Number)"
          v-model="team1Score"
          label="team 1 score"
          class="input-group--focused"
          item-value="text"
        ></v-select>
      </v-flex>
      <v-flex xs6>
        <v-select
          :items="Array.apply(null, {length: 10}).map(Number.call, Number)"
          v-model="team2Score"
          label="team 2 score"
          class="input-group--focused"
          item-value="text"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-btn @click.native="save">save</v-btn>
  </v-container>
</template>
<script>
  import {db} from '../firebase';
  export default{
    data(){
      return {
        selectedTeam1: [],
        selectedTeam2: [],
        date: new Date().toISOString().substr(0, 10),
        team1Score: 0,
        team2Score: 0,
      };
    },
    methods: {
      moveToNewMPlayerScreen(){
        this.$router.push({path: 'newPlayer'})
      },
      save(){
        if (this.selectedTeam1.length > 0 && this.selectedTeam1.length === this.selectedTeam2.length) {

          const team1 = this.selectedTeam1.reduce(function (total, current) {
            total[current] = true;
            return total;
          }, {});

          const team2 = this.selectedTeam2.reduce(function (total, current) {
            total[current] = true;
            return total;
          }, {});

          let match = {
            team1,
            team2,
            date: this.date,
            team1Score: this.team1Score,
            team2Score: this.team2Score
          };
          db.ref('matches').push(match);

//          update ranks
          let winningTeam = {};
          let losingTeam = {};
          let drawTeam = {};
          if (this.team1Score > this.team2Score) {
            winningTeam = team1;
            losingTeam = team2;
          }
          else if (this.team1Score === this.team2Score)
            drawTeam = {...team1, ...team2};
          else {
            winningTeam = team2;
            losingTeam = team1;
          }

          //update winning team
          for (let playerKey of Object.keys(winningTeam)) {
            let rank = {...this.ranks[playerKey]};
            rank.wins++;
            rank.matches++;
            rank.points ++;

            let updateRank = {};
            updateRank['rank/' + playerKey] = rank;
            db.ref().update(updateRank);
          }

          //update losing team
          for (let playerKey of Object.keys(losingTeam)) {
            let rank = {...this.ranks[playerKey]};
            rank.lose++;
            rank.matches++;

            let updateRank = {};
            updateRank['rank/' + playerKey] = rank;
            db.ref().update(updateRank);
          }


          //update draw
          for (let playerKey of Object.keys(drawTeam)) {
            let rank = {...this.ranks[playerKey]};
            rank.draw++;
            rank.matches++;
//            rank.points++;

            let updateRank = {};
            updateRank['rank/' + playerKey] = rank;
            db.ref().update(updateRank);
          }

        }
      }
    }
    ,
    firebase: function () {
      return {
        players: db.ref('players'),
        ranks: {source: db.ref('rank'), asObject: true}
      };
    }
  }
</script>
