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
                <v-text-field :value="domain.name" label="Domínio"></v-text-field>
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
      dialog: false
    };
  },
  methods: {
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
      }
    }
  }
};
</script>