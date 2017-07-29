<template>
  <div id="app" class="tennis-background">
    <v-app standalone>
      <v-navigation-drawer
        temporary
        v-model="drawer"
        :mini-variant.sync="mini"
        light
        overflow
        absolute
      >
        <v-list class="pa-0">
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>User Name</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon dark @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <router-link v-for="item in items"  :to="item.router" tag="div">
          <v-list-tile :key="item">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          </router-link>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed class="green" dark>
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Tennis</v-toolbar-title>
      </v-toolbar>
      <main>
        <!--<v-container fluid>-->
          <router-view></router-view>
        <!--</v-container>-->
      </main>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data()
    {
      return {
        drawer: null,
        items: [
          {title: 'New Match', icon: 'add', router: 'NewMatch'},
          {title: 'New Player', icon: 'person_add', router: 'NewPlayer'},
          {title: 'Score', icon: 'view_day', router: 'Score'},
          {title: 'Rank', icon: 'view_list', router:'/'}
        ],
        mini: false,
        right: null
      }
    }
  };
</script>
<style scoped>
  .tennis-background {
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*min-width: 100%;*/
    /*min-height: 100%;*/
    /*background-image: url("../static/Tennis Court Wallpaper Tenniscourtservices-g2bcover.png.png");*/
  }
</style>

