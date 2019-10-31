<template>
  <div>
    <v-card style="margin-top:10%">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-img :src="materialImage" width="100%" height="100%"></v-img>
          </v-col>
          <v-col cols="6">
            <v-form ref="registerForm">
              <h1 class="text-center">{{$t('auth.register')}}</h1>
              <div class="mt-10 mb-3">
                <v-text-field
                  v-model="user.full_name"
                  name="fullName"
                  :label="$t('auth.fullName')"
                  id="fullName"
                  type="text"
                  placeholder="Jhon Doe Smith"
                  :rules="rules.requiredInput"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="user.email"
                  name="email"
                  :label="$t('auth.email')"
                  id="email"
                  type="email"
                  placeholder="jhondoe@domain.com"
                  :rules="rules.email"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="user.user_name"
                  name="userName"
                  :label="$t('auth.userName')"
                  id="userName"
                  type="text"
                  placeholder="jhondoe"
                  :rules="rules.userName"
                  required
                  outlined
                ></v-text-field>
                <p>{{$t('auth.autoFillField')}}</p>
                <v-text-field
                  v-model="user.password"
                  name="password"
                  :label="$t('auth.password')"
                  id="password"
                  type="password"
                  placeholder="*********"
                  append-icon="fa-eye"
                  :rules="rules.minLength8"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="user.confirm_password"
                  name="confirmPassword"
                  :label="$t('auth.confirmPassword')"
                  id="confirmPassword"
                  type="password"
                  placeholder="*********"
                  append-icon="fa-eye"
                  :rules="rules.minLength8"
                  required
                  outlined
                ></v-text-field>
              </div>
              <div class="text-center">
                <v-btn
                  color="primary"
                  @click="register()"
                  :loading="loading"
                  :disabled="isRegistered"
                >
                  <v-icon class="mr-2" v-if="isRegistered">fa-check</v-icon>
                  {{(isRegistered)? $t('forms.confirmeRegister') : $t('auth.register')}}
                </v-btn>
              </div>
              <div class="text-center mt-3 mb-3">
                <router-link to="/auth/login">{{$t('auth.yourHaveAccount')}}</router-link>
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
      user: {
        full_name: "",
        user_name: "",
        email: "",
        password: "",
        confirm_password: ""
      },
      loading: false,
      isRegistered: false
    };
  },
  methods: {
    register() {
      if (!this.$refs.registerForm.validate()) {
        return false;
      }

      this.loading = true;
      this.$store
        .dispatch("auth/register", JSON.stringify(this.user))
        .then(response => {
          this.loading = false;
          this.isRegistered = true;
          setTimeout(() => {
            this.$router.push("/auth/login");
          }, 2000);
        })
        .catch(error => {
          this.loading = false;
          if (error.response.status === 500) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: `${this.$t("server.serverError")} ${this.$t(
                "server.tryAgainLater"
              )}`,
              color: "error",
              top: true
            });
          } else {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: error.response.data,
              color: "error",
              top: true
            });
          }
        });
    }
  }
};
</script>