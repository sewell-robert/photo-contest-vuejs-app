<template>
  <div id="app">
    <v-app>
      <v-sheet
        height="80"
        class="overflow-hidden"
        style="position: relative;"
      >
        <v-container class="fill-height">
          <v-row
            align="center"
            justify="center"
          >
            <v-btn
              class="mx-2 menu-btn"
              color="#bfb7aa"
              fab
              dark
              fixed
              right
              @click.stop="drawer = !drawer"
            >
              <v-icon dark>mdi-format-list-bulleted-square</v-icon>
            </v-btn>
          </v-row>
        </v-container>

        <v-navigation-drawer
          v-model="drawer"
          temporary
          app
        >
          <v-list-item>
            <v-list-item-content>
              Photo Pride Menu
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-string-lights</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start"><router-link to="/">Home</router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-police-badge</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start">Our Policy</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-heart-multiple</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start"><router-link to="/voterbox">Vote</router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-camera</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title align="start"><router-link to="/uploadphoto">Upload</router-link></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-sheet>

    <!-- <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/uploadphoto">Upload</router-link>
      <router-link to="/voterbox">Vote</router-link>
    </nav> -->
    <v-content>
        <v-container fluid>
            <router-view></router-view>
        </v-container>
    </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.menu-btn {
  background-image: linear-gradient(to bottom right, #750000, #ff0000);
}
.router-link-active {
  color: red;
}
</style>
