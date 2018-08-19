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
                ></v-select>
            </v-card-text>
            <v-card-text>
                <v-text-field
                v-model="chosenAlias"
                label="E-mail de destino"
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
      // @todo: buscar domínios da api
      this.emails = [
        { id: 10, email: "email1@gmail.com" },
        { id: 1, email: "email2@gmail.com" },
        { id: 3, email: "email3@gmail.com" },
        { id: 5, email: "email4@gmail.com" }
      ];
    },
    accept() {
      this.$emit("accept");
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
      } else {
        this.loadEmails();
      }
    }
  }
};
</script>