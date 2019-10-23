<template>
  <div>
    <v-card style="margin-top:10%">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-img :src="materialImage" width="100%" height="100%"></v-img>
          </v-col>
          <v-col cols="6">
            <v-form ref="loginForm">
              <v-btn
                color="primary"
                to="/auth/register"
                text
                class="float-right"
              >{{$t('auth.register')}}</v-btn>
              <h1 class="text-center">{{$t('auth.login')}}</h1>
              <div class="mt-10 mb-3">
                <v-text-field
                  v-model="userName"
                  name="userName"
                  :label="$t('auth.userName')"
                  id="userName"
                  type="text"
                  placeholder="jhondoe"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  name="password"
                  :label="$t('auth.password')"
                  id="password"
                  type="password"
                  placeholder="*********"
                  outlined
                ></v-text-field>
              </div>
              <div class="text-center">
                <v-btn color="primary" :loading="loading" @click="checkLogin()">{{$t('auth.login')}}</v-btn>
              </div>
              <div class="text-center mt-3 mb-3">
                <router-link to="/auth/recovery-account">{{$t('auth.forgotPassword')}}</router-link>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      materialImage: require("@/assets/images/MaterialData.png"),
      userName: "",
      password: "",
      loading: false
    };
  },
  methods: {
    checkLogin() {
      this.loading = true;
      this.$store
        .dispatch("auth/login", {
          user_name: this.userName,
          password: this.password
        })
        .then(response => {
          setTimeout(() => {
            this.loading = false;
            window.localStorage.setItem('token',response.data.token);
            this.$store.commit("auth/SET_USER", response.data);
            this.$router.push('data/import');
          }, 1000);
        })
        .catch(error => {
          this.loading = false;
          if (error.response.status === 401) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: this.$t("auth.wrongCredentials"),
              color: "error",
              top: true
            });
          }
        });
    }
  }
};
</script>