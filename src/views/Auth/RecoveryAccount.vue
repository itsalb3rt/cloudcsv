<template>
  <div>
    <v-card style="margin-top:10%">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-img :src="materialImage" width="100%" height="100%"></v-img>
          </v-col>
          <v-col cols="6" v-if="recovered">
            <p class="text-center mt-4 mb-4">
              <v-icon size="70" color="success">fa-check</v-icon>
            </p>
            <p class="font-weight-bold">{{$t('auth.accountRecovery.confirmRecoveryInformation')}}</p>
          </v-col>
          <v-col cols="6" v-else>
            <v-form ref="accountRecoveryForm">
              <h1 class="text-center">{{$t('auth.recoveryAccount')}}</h1>
              <p class="mt-3 mb-3">{{$t('auth.recoveryAccountInformation')}}</p>
              <div class="mt-10 mb-3">
                <v-text-field
                  v-model="email"
                  name="email"
                  :label="$t('auth.email')"
                  id="email"
                  type="email"
                  placeholder="jhondoe@domain.com"
                  :rules="rules.email"
                  outlined
                ></v-text-field>
              </div>
              <div class="text-center">
                <v-btn
                  @click="recovery()"
                  :loading="loading"
                  color="primary"
                >{{$t('auth.recoveryAccount')}}</v-btn>
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
      email: "",
      materialImage: require("@/assets/images/MaterialData.png"),
      loading: false,
      recovered: false
    };
  },
  methods: {
    recovery() {
      if (!this.$refs.accountRecoveryForm.validate()) return false;

      this.loading = true;

      this.$store
        .dispatch("auth/recoveryAccount", { email: this.email })
        .then(response => {
          setTimeout(() => {
            this.recovered = true;
            this.loading = false;
          }, 1000);
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
          if (error.response.status === 409) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: error.response.data,
              color: "error",
              bottom: true
            });
          } else {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: this.$t('server.serverError'),
              color: "error",
              bottom: true
            });
          }
        });
    }
  }
};
</script>