<template>
  <v-container fluid>
    <v-layout row justify-end>
      <v-btn fab small dark color="primary" @click="openNewEmailModal">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-btn fab small dark color="error">
        <v-icon dark>remove</v-icon>
      </v-btn>
    </v-layout>
    <v-layout column>
      <template>
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">how_to_reg</v-icon> Emails
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="emails"
            :pagination.sync="pagination"
            :rows-per-page-items="[10, 20, 50, 100]"
            :search="search"
            select-all
            item-key="id"
            class="elevation-1"
          >
            <template slot="headers" slot-scope="props">
              <tr>
                <th>
                  <v-checkbox
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                    primary
                    hide-details
                    @click.native="toggleAll"
                  ></v-checkbox>
                </th>
                <th
                  v-for="header in props.headers"
                  :key="header.text"
                  :class="['column sortable text-xs-left', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                  @click="changeSort(header.value)"
                >
                  {{ header.text }}
                  <v-icon small>arrow_upward</v-icon>
                </th>
              </tr>
            </template>
            <!-- BODY -->
            <template slot="items" slot-scope="props">
              <tr :active="props.selected" @click="props.selected = !props.selected" class="mouse-pointer">
                <td>
                  <v-checkbox
                    :input-value="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
              </tr>
            </template>
            <p slot="no-results" :value="true" class="text-xs-center">
              Não há resultados para "{{ search }}".
            </p>
          </v-data-table>
        </v-card>
        <v-dialog v-model="openEmailModal" max-width="500px">
          <v-card>
            <v-card-title>
              <span><v-icon class="mr-2">how_to_reg</v-icon> Novo E-mail</span>
              <v-spacer></v-spacer>
              <v-btn slot="activator" icon @click="closeNewEmailModal">
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
              <v-btn color="error" flat @click.stop="closeNewEmailModal">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import API from "./../services/ApiService";

export default {
  name: "emails",
  data() {
    return {
      search: "",
      pagination: {
        sortBy: "id"
      },
      selected: [],
      headers: [{ text: "#", value: "id" }, { text: "Domínio", value: "name" }],
      emails: [],
      openEmailModal: false,
      selectedDomain: null,
      emailChosen: null,
      passwordChosen: null,
      domains: []
    };
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.domains.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    openNewEmailModal() {

      // @todo buscar os domínios do servidor
      this.domains = [
        {'id': 10, 'name': 'incluirtecnologia.com.br'},
        {'id': 1, 'name': 'incluirtecnologia2.com.br'},
        {'id': 3, 'name': 'incluirtecnologia3.com.br'},
        {'id': 5, 'name': 'incluirtecnologia4.com.br'}
      ];
      this.openEmailModal = true;
    },
    closeNewEmailModal() {
      this.openEmailModal = false;
    },
    saveNewEmail() {
      this.openEmailModal = false;
    }
  },
  computed: {
    selectedDomainName() {
      if(!this.selectedDomain) {
        return '@...';
      }

      return '@' + this.domains[this.domains.findIndex(d => d.id === this.selectedDomain)].name;
    }
  },
  created() {
    this.$store.commit("setLayout", "DashboardLayout");
    API.token = this.$store.getters.authToken;
    API.get("/virtual-users").then(resp => {
      this.emails = resp.data.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  cursor: pointer;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
