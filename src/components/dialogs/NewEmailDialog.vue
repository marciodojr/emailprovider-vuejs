<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span><v-icon class="mr-2">how_to_reg</v-icon> Novo E-mail</span>
                <v-spacer></v-spacer>
                <v-btn slot="activator" icon @click="cancel">
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
                v-validate="'required'"
                :error-messages="errors.collect('email')"
                data-vv-name="email"
                required
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
      selectedDomain: null,
      emailChosen: null,
      passwordChosen: null,
      domains: [],
      dialog: false
    };
  },
  methods: {
    loadDomains() {
      API.get('/virtual-domains').then(resp => {
        this.domains = resp.data.data;
      });
    },
    accept() {
      API.post('/virtual-users/add', {
        email: this.emailChosen,
        domain: this.selectedDomain,
        password: this.passwordChosen
      }).then((resp) => {
        this.$emit("accept", resp.data.data);
      });
    },
    cancel() {
      this.$emit("cancel");
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
        this.loadDomains();
      }
    }
  }
};
</script>