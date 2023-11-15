import Vue from "vue";
import VueRouter from "vue-router";
import Principal from "../views/Principal.vue";
import Peliculas from "../views/Peliculas.vue";
import Favoritos from "../views/Favoritos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Principal",
    component: Principal,
  },
  {
    path: "/Peliculas",
    name: "Peliculas",
    component: Peliculas,
  },
  {
    path: "/Favoritos",
    name: "Favoritos",
    component: Favoritos,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
