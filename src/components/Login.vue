<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card>
              <v-toolbar dark class="elevation-0">
                <v-flex xs12 class="text-xs-center">
                  <v-toolbar-title>Gestão de Emails</v-toolbar-title>
                </v-flex>
              </v-toolbar>
              <v-progress-linear :indeterminate="true" height="3" class="ma-0" v-show="showProgress"></v-progress-linear>
              <v-card-text>
                  <v-alert :value="true" type="error" v-show="errorMessage && !showProgress" outline> {{errorMessage}} </v-alert>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    type="text"
                    v-validate="'required|min:5|max:30'"
                    v-model="username"
                    :error-messages="errors.collect('usuário')"
                    label="Usuário"
                    data-vv-name="usuário"
                    required
                    @keyup.enter="submit"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    v-validate="'required|min:6|max:30'"
                    v-model="password"
                    :error-messages="errors.collect('senha')"
                    type="password"
                    label="Senha"
                    data-vv-name="senha"
                    required
                    @keyup.enter="submit"
                    ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="primary" :disabled="!isFormValid">Entrar</v-btn>
              </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>

</template>

<script>

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      showProgress: false,
      errorMessage: ""
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll();

      if (this.isFormValid) {
        this.showProgress = true;
        this.$api.post('/user/login', {
          username: this.username,
          password: this.password
        }).then(response => {
          this.$store.commit('setAuthToken', response.data.data.token);
          this.showProgress = false;
          this.$router.push('/emails');
        }).catch(error => {
          this.errorMessage = error.response ? error.response.data.message : 'Não foi possível estabelecer conexão com o servidor';
          this.showProgress = false;
        });
      }
    }
  },
  computed: {
    isFormValid() {
      return !Object.keys(this.fields).some(key => this.fields[key].invalid);
    }
  },
  created() {
    this.$store.commit("setLayout", "SimpleLayout");
  }
};
</script>