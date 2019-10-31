<template>
  <div>
    <v-card style="margin-top:10%">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-img :src="materialImage" width="100%" height="100%"></v-img>
          </v-col>
          <v-col cols="6" v-if="passwordResetConfirm">
            <p class="text-center">
              <v-icon color="success" size="70">fa-check</v-icon>
            </p>
            <p class="text-center">
              {{$t('auth.accountRecovery.passwordResetSuccess')}}. {{$t('callAction.goto')}}
              <router-link to="/auth/login">{{$t('auth.login')}}</router-link>
            </p>
          </v-col>
          <v-col cols="6" v-else>
            <v-form ref="resetPasswordForm">
              <h1 class="text-center">{{$t('auth.recoveryAccount')}}</h1>
              <p class="mt-3 mb-3">{{$t('auth.newPassword')}}</p>
              <div class="mt-10 mb-3">
                <v-text-field
                  v-model="password"
                  name="password"
                  :label="$t('auth.password')"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                  @click:append="showPassword = !showPassword"
                  placeholder="*********"
                  outlined
                  :rules="rules.minLength8"
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  name="confirmPassword"
                  :label="$t('auth.confirmPassword')"
                  id="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                  @click:append="showPassword = !showPassword"
                  placeholder="*********"
                  outlined
                  :rules="rules.minLength8"
                ></v-text-field>
              </div>
              <div class="text-center">
                <v-btn color="success" :loading="loading" @click="resertPassword">{{$t('auth.recoveryAccount')}}</v-btn>
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
  mounted() {
    if (this.$route.query.token === undefined) {
      this.$router.push("/auth/login");
    }
  },
  data() {
    return {
      materialImage: require("@/assets/images/MaterialData.png"),
      password: "",
      confirmPassword: "",
      showPassword: false,
      loading: false,
      passwordResetConfirm: false
    };
  },
  methods: {
    resertPassword() {
      if (!this.$refs.resetPasswordForm.validate()) {
        return false;
      }

      this.loading = true;
      const data = {
        token: this.$route.query.token,
        password: this.password,
        confirm_password: this.confirmPassword
      };
      this.$store
        .dispatch("auth/resetPassword", data)
        .then(response => {
          setTimeout(() => {
            this.passwordResetConfirm = true;
            this.loading = false;
          }, 1000);
        })
        .catch(error => {
          console.log(error);

          if (error.response.status === 401) {
            this.loading = false;
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: this.$t('auth.accountRecovery.invalidToken'),
              color: "error",
              bottom: true
            });
          }
        });
    }
  }
};
</script>