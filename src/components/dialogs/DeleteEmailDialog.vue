<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span><v-icon class="mr-2">how_to_reg</v-icon> Remover E-mails</span>
                <v-spacer></v-spacer>
                <v-btn slot="activator" icon @click="cancelRemoveEmails">
                <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
              <v-card class="elevation-0">
                <v-card-title class="subheading">Os seguintes emails serão removidos: </v-card-title>
                <v-list dense>
                  <v-list-tile v-for="(email, idx) in emails" :key="idx">
                    <v-list-tile-content>{{email}}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" flat @click.stop="removeEmails">Remover</v-btn>
                <v-btn color="primary" flat @click.stop="cancelRemoveEmails">Desistir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
  props: {
    isopen: Boolean,
    emails: Array
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    removeEmails() {
      this.$emit("emailsRemoved");
    },
    cancelRemoveEmails() {
      this.$emit("removeEmailsCancelled");
    }
  },
  created() {
    this.dialog = this.isopen;
  },
  watch: {
    isopen() {
      // changes from parent
      this.dialog = this.isopen;
    },
    dialog() {
      // changes from child
      if (!this.dialog) {
        this.cancelRemoveEmails();
      }
    }
  }
};
</script>