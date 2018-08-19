<template>
  <v-container fluid>
    <v-layout row justify-end>
      <v-btn fab small dark color="primary" @click="newEmailDialog=true">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-btn fab small dark color="error" @click="deleteEmailDialog=true">
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
        <new-email-dialog
          :isopen="newEmailDialog"
          @accept="newEmailDialog=false"
          @cancel="newEmailDialog=false"
        />
        <delete-email-dialog
          :isopen="deleteEmailDialog"
          :emails="selectedEmails"
          @accept="deleteEmailDialog=false"
          @cancel="deleteEmailDialog=false"
          />
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import API from "./../services/ApiService";
import NewEmailDialog from "./dialogs/NewEmailDialog";
import DeleteEmailDialog from "./dialogs/DeleteEmailDialog";

export default {
  name: "emails",
  components: {
    NewEmailDialog,
    DeleteEmailDialog
  },
  data() {
    return {
      search: "",
      pagination: {
        sortBy: "id"
      },
      selected: [],
      headers: [{ text: "#", value: "id" }, { text: "Domínio", value: "name" }],
      emails: [],
      newEmailDialog: false,
      deleteEmailDialog: false,
      selectedEmails: ['email1@gmail.com', 'email2@gmail.com']
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
