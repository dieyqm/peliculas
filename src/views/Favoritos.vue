<template>
  <div>
    <div class="pa-4">
      <h2>Lista de Favoritos</h2>
    </div>
    <v-list>
      <v-list-item v-for="item in favoritos" :key="item.title">
        <v-list-item-icon>
          <v-icon class="px-5" color="pink"> mdi-heart </v-icon>
        </v-list-item-icon>

        <v-list-item-avatar>
          <v-img class="px-5" :src="item.Poster"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="px-5">
          <v-list-item-title v-text="item.Title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="deleteFav(item)">
            <v-icon color="pink lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
data() {
    return {
    }
},
computed: {
    favoritos() {
        /* recuperamos todos los registros de favoritos   */
        return this.$store.state.favoritos
    }
},
methods: {
    /* funcion que elimina un favorito de la lista */
    deleteFav(item) {
        this.$store.state.favoritos.splice(this.$store.state.favoritos.indexOf(item),1)
        console.log(item);
    }
},
}
</script>

<style lang="scss" scoped></style>
