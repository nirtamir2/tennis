<template>
  <v-flex>
    <img class="avatara" :src="player.avatar" :alt="player.avatar">
    <p>{{player.name}}</p>
  </v-flex>
</template>
<script>
  export default {
    props: ['player']
  }
</script>
<style scoped>
  .avatara {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
</style>
