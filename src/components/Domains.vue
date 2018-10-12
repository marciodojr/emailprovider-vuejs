<template>
  <v-container fluid>
    <v-layout row justify-end>
      <v-btn fab small dark color="warning" @click="editDomainDialog=true" :disabled="selected.length != 1">
        <v-icon dark>edit</v-icon>
      </v-btn>
      <v-btn fab small dark color="primary" @click="newDomainDialog=true">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-btn fab small dark color="error" @click="deleteDomainDialog=true">
        <v-icon dark>remove</v-icon>
      </v-btn>
    </v-layout>
    <v-layout column>
      <template>
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">domain</v-icon> Domínios
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
            :items="domains"
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
                <td class="text-xs-left">{{ props.item.name }}</td>
              </tr>
            </template>
            <p slot="no-results" :value="true" class="text-xs-center">
              Não há resultados para "{{ search }}".
            </p>
          </v-data-table>
        </v-card>
        <new-domain-dialog
          :isopen="newDomainDialog"
          @accept="addNewDomain"
          @cancel="newDomainDialog=false"
          />
        <edit-domain-dialog
          :isopen="editDomainDialog" :domain="selected ? selected[0] : null"
          @accept="editDomain"
          @cancel="editDomainDialog=false"
          />
        <delete-domain-dialog
          :isopen="deleteDomainDialog" :domains="selected"
          @accept="deleteDomain"
          @cancel="deleteDomainDialog=false"
          />
      </template>
    </v-layout>
  </v-container>
</template>
<script>

import NewDomainDialog from './dialogs/NewDomainDialog';
import EditDomainDialog from './dialogs/EditDomainDialog';
import DeleteDomainDialog from './dialogs/DeleteDomainDialog';

export default {
  name: "domains",
  components: {
    NewDomainDialog,
    EditDomainDialog,
    DeleteDomainDialog
  },
  data() {
    return {
      search: "",
      pagination: {
        sortBy: "id",
        descending: true
      },
      selected: [],
      headers: [
        { text: "#", value: "id" },
        { text: "Domínio", value: "name" }
      ],
      domains: [],
      newDomainDialog: false,
      editDomainDialog: false,
      deleteDomainDialog: false
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
    addNewDomain(domain) {
      this.domains.push(domain);
      this.newDomainDialog = false;
    },
    editDomain(domain) {
      var idx = this.domains.findIndex(d => d.id == domain.id);
      this.domains.splice(idx, 1);
      this.domains.push(domain);
      this.editDomainDialog = false;
    },
    deleteDomain(domainIds) {
      this.domains = this.domains.filter(d => !domainIds.includes(d.id));
      this.deleteDomainDialog = false;
      this.selected = [];
    }
  },
  created() {
    this.$store.commit('setLayout', 'DashboardLayout');
    this.$api.get('/virtual-domains').then(resp => {
      this.domains = resp.data.data;
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
