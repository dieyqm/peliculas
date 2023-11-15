<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> {{nameapp}} </v-list-item-title>
          <v-list-item-subtitle> </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in navitems" :key="item.title" link :to="item.ruta_to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title></v-toolbar-title>
    </v-app-bar>

    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
export default {
    components: {
    },
data() {
    return {
        drawer: null,
        transitionName: 'fade',
        nameapp:'Prueba Diego',
        navitems: [
         /*  { title: 'Peliculas', icon: 'mdi-home' }, */
          { title: 'Peliculas', icon: 'mdi-play', ruta_to:'Peliculas' },
          { title: 'Favoritos', icon: 'mdi-heart', ruta_to:'Favoritos' },
        ],
        right: null,
    }
},
}
</script>

<style lang="scss" scoped></style>
