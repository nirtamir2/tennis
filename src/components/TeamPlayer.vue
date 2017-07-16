<template>
  <v-avatar>
    <img style="vertical-align:middle" :src="player.avatar" :alt="player.avatar">
    <h4>{{player.name}}</h4>
  </v-avatar>
</template>
<script>
  export default{
    props: ['player']
  }
</script>
