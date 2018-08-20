<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span><v-icon class="mr-2">supervisor_account</v-icon> Novo Alias</span>
                <v-spacer></v-spacer>
                <v-btn slot="activator" icon @click="cancel">
                <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-select
                :items="emails"
                label="Email de origem"
                item-text="email"
                item-value="id"
                v-model="selectedEmail"
                required
                ></v-select>
            </v-card-text>
            <v-card-text>
                <v-text-field
                v-model="chosenAlias"
                label="E-mail de destino"
                v-validate="'required|email'"
                :error-messages="errors.collect('alias')"
                data-vv-name="alias"
                required
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.stop="accept">Salvar</v-btn>
                <v-btn color="error" flat @click.stop="cancel">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>

import API from './../../services/ApiService';

export default {
  props: {
    isopen: Boolean
  },
  data() {
    return {
      emails: [],
      chosenAlias: null,
      dialog: false,
      selectedEmail: ''
    };
  },
  methods: {
    loadEmails() {
      API.post('/virtual-users').then((response) => {
        this.emails = response.data.data;
      });
    },
    accept() {
      API.post('/virtual-aliases/add', {
        sourceId: this.selectedEmail,
        destination: this.chosenAlias
      }).then((resp) => {
        this.$emit("accept", resp.data.data);
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
    isopen() { // changes from parent
      this.dialog = this.isopen;
    },
    dialog() { // changes from child
      if(!this.dialog) {
        this.cancel();
      } else {
        this.loadEmails();
      }
    }
  }
};
</script>