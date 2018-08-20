<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span><v-icon class="mr-2">supervisor_account</v-icon> Remover Alias</span>
                <v-spacer></v-spacer>
                <v-btn slot="activator" icon @click="cancel">
                <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
              <v-card class="elevation-0">
                <v-card-title class="subheading">Os seguintes aliases serão removidos: </v-card-title>
                <v-list dense>
                  <v-list-tile v-for="(alias, idx) in aliases" :key="idx">
                    <v-list-tile-content>{{alias.id}}</v-list-tile-content>
                    <v-list-tile-content>{{alias.destination}}</v-list-tile-content>
                    <v-list-tile-content>{{alias.source}}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" flat @click.stop="accept">Remover</v-btn>
                <v-btn color="primary" flat @click.stop="cancel">Desistir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>

import API from './../../services/ApiService';

export default {
  props: {
    isopen: Boolean,
    aliases: Array
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    accept() {
      var aliasIds = this.aliases.map(a => a.id);
      API.post('/virtual-aliases/remove', {
        aliases: aliasIds
      }).then(() => {
        this.$emit("accept", aliasIds);
      });
    },
    cancel() {
      this.$emit("cancel");
    }
  },
  created() {
    this.dialog = this.isopen;
    API.token = this.$store.getters.authToken;
  },
  watch: {
    isopen() {
      // changes from parent
      this.dialog = this.isopen;
    },
    dialog() {
      // changes from child
      if (!this.dialog) {
        this.cancel();
      }
    }
  }
};
</script>