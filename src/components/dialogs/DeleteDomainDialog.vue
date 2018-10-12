<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span><v-icon class="mr-2">domain</v-icon> Remover Domínio</span>
                <v-spacer></v-spacer>
                <v-btn slot="activator" icon @click="cancel">
                <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
              <v-card class="elevation-0">
                <v-card-title class="subheading">Os seguintes domínios serão removidos: </v-card-title>
                <v-list dense>
                  <v-list-tile v-for="(domain, idx) in domains" :key="idx">
                    <v-list-tile-content>{{domain.id}}</v-list-tile-content>
                    <v-list-tile-content>{{domain.name}}</v-list-tile-content>
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

export default {
  props: {
    isopen: Boolean,
    domains: Array
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    accept() {
      var domainIds = this.domains.map(d => d.id);
      this.$api.delete('/virtual-domains', {
        domains: domainIds
      }).then(() => {
        this.$emit("accept", domainIds);
      });
    },
    cancel() {
      this.$emit("cancel");
    }
  },
  created() {
    this.dialog = this.isopen;
  },
  watch: {
    isopen() { // changes from parent
      this.dialog = this.isopen;
    },
    dialog() { // changes from child
      if(!this.dialog) {
        this.cancel();
      }
    }
  }
};
</script>