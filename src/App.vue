<template>
  <v-app>
    <v-main fluid class="fill-height main-class">
      <v-container fluid>
        <transition :name="transitionName" mode="out-in">
          <principal />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Principal from './views/Principal.vue';

export default {
  components: {
    Principal,
  },
  name: 'App',

  data() {
    return {
      transitionName: 'fade'
    }
  },
};
</script>
