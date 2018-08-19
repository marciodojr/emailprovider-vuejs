<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span><v-icon class="mr-2">how_to_reg</v-icon> Novo E-mail</span>
                <v-spacer></v-spacer>
                <v-btn slot="activator" icon @click="cancelNewEmail">
                <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-select
                :items="domains"
                label="Escolha o domínio"
                item-text="name"
                item-value="id"
                v-model="selectedDomain"
                ></v-select>
            </v-card-text>
            <v-card-text>
                <v-text-field
                v-model="emailChosen"
                label="E-mail"
                :suffix="selectedDomainName"
                ></v-text-field>
            </v-card-text>
            <v-card-text>
                <v-text-field
                v-model="passwordChosen"
                label="Senha"
                type="password"
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.stop="saveNewEmail">Salvar</v-btn>
                <v-btn color="error" flat @click.stop="cancelNewEmail">Close</v-btn>
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
      selectedDomain: null,
      emailChosen: null,
      passwordChosen: null,
      domains: [],
      dialog: false
    };
  },
  methods: {
    loadDomains() {
      // @todo: buscar domínios da api
      this.domains = [
        { id: 10, name: "incluirtecnologia.com.br" },
        { id: 1, name: "incluirtecnologia2.com.br" },
        { id: 3, name: "incluirtecnologia3.com.br" },
        { id: 5, name: "incluirtecnologia4.com.br" }
      ];
    },
    saveNewEmail() {
      this.$emit("newEmailSaved");
    },
    cancelNewEmail() {
      this.$emit("newEmailCancelled");
    }
  },
  computed: {
    selectedDomainName() {
      if (!this.selectedDomain) {
        return "@...";
      }
      return (
        "@" +
        this.domains[this.domains.findIndex(d => d.id === this.selectedDomain)]
          .name
      );
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
        this.cancelNewEmail();
      } else {
        this.loadDomains();
      }
    }
  }
};
</script>