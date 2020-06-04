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
                  :rules="rules.requiredInput"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  name="password"
                  :label="$t('auth.password')"
                  id="password"
                  type="password"
                  placeholder="*********"
                  :rules="rules.requiredInput"
                  required
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
import formRules from "@/mixins/Miscellany/FormRules";

export default {
  mixins: [formRules],
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
      if (!this.$refs.loginForm.validate()) {
        return false;
      }
      this.loading = true;
      this.$store
        .dispatch("auth/login", {
          user_name: this.userName,
          password: this.password
        })
        .then(response => {
          if (response.data.token !== undefined) {
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem("user", JSON.stringify(response.data));
            this.$store.commit("auth/SET_USER", response.data);
          }else{
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: `${this.$t("server.serverError")} ${this.$t(
                "server.tryAgainLater"
              )}`,
              color: "error",
              top: true
            });
          }

          setTimeout(() => {
            this.loading = false;
            this.$router.push("/data/import");
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
          } else if (error.response.status === 404) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: `${this.$t("auth.userName")} ${this.$t(
                "messages.notFound"
              )}`,
              color: "error",
              top: true
            });
          } else {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: `${this.$t("server.serverError")} ${this.$t(
                "server.tryAgainLater"
              )}`,
              color: "error",
              top: true
            });
          }
        });
    }
  }
};
</script>