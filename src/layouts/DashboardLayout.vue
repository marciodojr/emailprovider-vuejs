<template>
  <v-app>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      dark
    >
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            <v-icon>alternate_email</v-icon> Email Admin
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

      <v-list class="pt-0">
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.route">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar
      app
      color="primary"
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-btn depressed large color="primary" @click="logout"><v-icon>exit_to_app</v-icon> Sair</v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "DashboardLayout",
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: "how_to_reg",
          title: "Emails",
          route: "emails"
        },
        {
          icon: "supervisor_account",
          title: "Aliases",
          route: "aliases"
        },
        {
          icon: "domain",
          title: "Domínios",
          route: "dominios"
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss">
  .v-list__tile--active {
    .v-list__tile__action, .v-list__tile__content {
      color: white;
    }
    background-color: #616161;
  }
</style>
