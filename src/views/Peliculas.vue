<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters style="height: 150px">
      <v-col>
        <h1>Peliculas</h1>
      </v-col>
      <v-col cols="12" v-if="alert">
        <v-alert type="error"> EL campo buscar esta vacio! </v-alert>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-text-field v-model="search" label="Buscar" single-line hide-details></v-text-field>
            <v-btn class="ma-2" color="secondary" @click="buscar()"> Buscar </v-btn>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="peliculas"
            :loading="loading"
            loading-text="Cargandoo... Espere por favor"
            color="primary"
            locale="es"
            :header-props="headerProps"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon class="mr-2" @click="addFavorites(item)"> mdi-heart </v-icon>
              <v-icon class="mr-2" @click="verDatos(item)"> mdi-eye </v-icon>
              <div class="text-center">
                <v-dialog v-model="dialog" width="500" persistent :retain-focus="false">
                  <v-card>
                    <v-img height="200px" v-bind:src="item.Poster"></v-img>
                    <v-card-title class="text-h5 grey lighten-2">
                      {{ DatosPeli.Title }}
                    </v-card-title>

                    <v-card-text>
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div class="text-overline mb-4">Año:{{ DatosPeli.Year }}</div>
                          <v-list-item-title class="text-h5 mb-1"> Director: {{ DatosPeli.Director }} </v-list-item-title>
                          <v-list-item-subtitle>
                            Reparto:
                            <br />
                            {{ DatosPeli.Actors }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialog = false"> Cerrar </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
            </template>
            <template v-slot:no-data> Selecciones su busqueda! </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const {API_URL,API_KEY,API_PLOT} =require('../config/env')
import axios from "axios";
export default {
  data() {
    return {
        headerProps: {
                sortByText: 'Ordenar por'
            },
        enabled: null,
      dialog: false,
      alert: false,
      loading: false,
      search: '',
      headers: [
        {
          text: "Titulo",
          align: "start",
          filterable: false,
          value: "Title",
        },
        { text: "Año de Lanzamiento", value: "Year" },
        { text: "Director", value: "Type" },
        /* { text: "Reparto", value: "" }, */
        { text: "Acciones", value: "actions", sortable: false },
      ],
      peliculas: [],
      listafavoritos: [],
      DatosPeli: {},
    };
  },
  created() {
    this.listafavoritos = [];
  },
  methods: {
    /* funcion para buscar por el parametro search */
    buscar() {
        if (this.search=='') {
            this.alert=true
        }
      this.loading = true;
      /* Solicitud de recusos con los accesos de config */
      axios
        .get(
          `${API_URL}?apikey=${API_KEY}&s=${this.search}&plot=${API_PLOT}`
        )
        .then((result) => {
            /* llenamos el array peliculas con los datos proporcinados por la api */
          this.peliculas = result.data.Search;
          this.loading = false;
          this.alert=false

        });
    },
    /* Funcion que hace una peticion de recusos, de una pelicula como repartoo y director */
    verDatos(item) {
      axios
        .get(
          `${API_URL}?apikey=${API_KEY}&plot=${API_PLOT}&t=${item.Title}`
        )
        .then((result) => {
            /* vaciamos el objeto */
          this.DatosPeli = {};
          /* lo volvemos a llenar con los datos recibidos por la request */
          this.DatosPeli = result.data;
          /* abrimos el modal o dialog para que se aprecie la informacion */
          this.dialog = true;
        });
    },
    /* funcion que añade un registro a la lista de favoritos en vuex */
    addFavorites(item) {
        /* agregamosel item seleccionado y lo llenamos en el array favoritos de vuex */

      this.$store.state.favoritos.push(item)
    },
  },
};
</script>

<style lang="scss" scoped></style>
