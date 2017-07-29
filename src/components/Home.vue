<template>
  <div>
    <rank></rank>
    <v-btn
      class="green elevation-10"
      dark
      button
      right
      fab
      fixed
      v-show="!hidden"
      @click.native="moveToNewMatchScreen"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <score></score>

  </div>
</template>
<script>
  import Score from './Score.vue'
  import Rank from './Rank.vue'

  export default {
    data() {
      return {
        hidden: false
      }
    },
    components:
      {
        'Rank': Rank,
        'Score': Score
      }
    ,
    methods:
      {
        moveToNewMatchScreen() {
          this.$router.push({path: 'newMatch'})
        },
      }
  }
</script>
