<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout wrap align-content-center>
        <v-flex xs12>
            <h1 class="display-4 text-xs-center font-weight-bold">404</h1>
        </v-flex>
        <v-flex xs12>
            <p class="headline text-xs-center">Página não encontrada</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "pagenotfound",
  created() {
    this.$store.commit("setLayout", "SimpleLayout");
  }
};
</script>