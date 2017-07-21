<template>
  <v-card>
    <v-card-title>
      Rank
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-bind:headers="headers"
      v-bind:items="this.getItems()"
      v-bind:search="search"
      hide-actions
    >
      <template slot="items" scope="props">
        <td class="text-xs-left">{{ props.item.rank }}</td>
        <td class="text-xs-right">{{props.item.player.name}}</td>
        <td class="text-xs-right">{{ props.item.matches }}</td>
        <td class="text-xs-right">{{ props.item.wins }}</td>
        <td class="text-xs-right">{{ props.item.draws }}</td>
        <td class="text-xs-right">{{ props.item.loses }}</td>
        <td class="text-xs-right">{{ props.item.points }}</td>
      </template>
      <template slot="pageText" scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import {db} from './../firebase';
  export default {
    data () {
      return {
        search: '',
        pagination: {},
        headers: [
          {
            text: 'rank',
            align: 'left',
            value: 'rank'
          },
          {text: 'player', value: 'player.name'},
          {text: 'matches', value: 'matches'},
          {text: 'wins', value: 'wins'},
          {text: 'draws', value: 'draws'},
          {text: 'loses', value: 'loses'},
          {text: 'points', value: 'points'},
        ],
      }
    },
    methods: {
      getItems()
      {
        let arr = [];
        for (let rank of this.ranks) {
          let playerKey = rank[".key"];
          let player = this.players[playerKey];
          arr.push({
            player: player,
            matches: rank.matches,
            wins: rank.wins,
            draws: rank.draw,
            loses: rank.lose,
            points: rank.points
          });
        }

        arr = arr.sort((a, b) => (b.points - a.points));

        let rank = 1;
        for (let a of arr) {
          a["rank"] = rank++;
        }
        return arr;
      }
    },
    firebase: function () {
      return {
        ranks: db.ref('rank'),
        players: {
          source: db.ref('players'),
          asObject: true
        }
      };
    }
  };
</script>

