<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span><v-icon class="mr-2">domain</v-icon> Editar Domínio</span>
                <v-spacer></v-spacer>
                <v-btn slot="activator" icon @click="cancel">
                <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="domainName" label="Domínio"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.stop="accept">Salvar</v-btn>
                <v-btn color="error" flat @click.stop="cancel">Desistir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>

import API from './../../services/ApiService';

export default {
  props: {
    isopen: Boolean,
    domain: {
      id: Number,
      name: String
    }
  },
  data() {
    return {
      dialog: false,
      domainName: ''
    };
  },
  methods: {
    accept() {
      API.patch('/virtual-domains/' + this.domain.id, {
        name: this.domainName
      }).then(resp => {
        this.$emit("accept", resp.data.data);
      });
    },
    cancel() {
      this.$emit("cancel");
    }
  },
  created() {
    this.dialog = this.isopen;
    this.domainName = this.domain ? this.domain.name : '';
    API.token = this.$store.getters.authToken;
  },
  watch: {
    isopen() { // changes from parent
      this.dialog = this.isopen;
    },
    dialog() { // changes from child
      if(!this.dialog) {
        this.cancel();
      }
    },
    domain() {
      this.domainName = this.domain ? this.domain.name : '';
    }
  }
};
</script>