<template>
  <div>
    <p class="font-weight-bold">{{$t('settings.systemEmail')}}</p>
    <p>{{$t('settings.systemEmialInformation')}}</p>
    <p>
      <span class="font-weight-bold">{{$t('messages.currentEmail')}}</span>
      : {{ ($store.getters['systemEmail/getEmail'] === '')? $t('messages.nodefined') : $store.getters['systemEmail/getEmail'] }}
    </p>
    <v-btn color="primary" @click="dialog = true" outlined>
      <v-icon class="mr-2">fa-edit</v-icon>
      {{$t('callAction.add')}} {{$t('callAction.authentication')}} {{$t('callAction.smtp')}}
    </v-btn>
    <template>
      <div>
        <v-dialog v-model="dialog" persistent max-width="800">
          <v-card>
            <v-card-title class="headline">{{$t('settings.systemEmail')}}</v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  v-model="host"
                  name="host"
                  :label="$t('settings.host')"
                  id="host"
                  :rules="rules.requiredInput"
                  placeholder="email.host.com"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="systemEmail"
                  name="systemEmail"
                  :label="$t('settings.systemEmail')"
                  id="systemEmail"
                  :rules="rules.email"
                  placeholder="system@email.com"
                  outlined
                ></v-text-field>
                <v-divider></v-divider>
                <v-text-field
                  v-model="password"
                  name="password"
                  :label="$t('auth.password')"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                  @click:append="showPassword = !showPassword"
                  placeholder="*********"
                  :rules="rules.minLength8"
                  required
                  outlined
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary" outlined @click="dialog = false">{{$t('callAction.noWait')}}</v-btn>
              <v-btn :loading="loading" @click="saveEmail()" color="primary">
                <v-icon class="mr-2">fa-save</v-icon>
                {{$t('callAction.save')}} {{$t('auth.email')}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>
<script>
import formRules from "@/mixins/Miscellany/FormRules";

export default {
  mixins: [formRules],
  mounted() {
    this.requestSystemEmail();
  },
  data() {
    return {
      systemEmail: "",
      host:'',
      dialog: false,
      password: "",
      loading: false,
      showPassword:false
    };
  },
  methods: {
    saveEmail() {
      if (!this.$refs.form.validate()) {
        return false;
      }
      this.loading = true;
      const payload = {
        email: this.systemEmail,
        password: this.password,
        host:this.host
      };
      this.$store
        .dispatch("systemEmail/saveEmail", JSON.stringify(payload))
        .then(response => {
          if (response.status === 201) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: `${this.$t("callAction.saved")}`,
              color: "success",
              top: true
            });
            this.loading = false;
            this.requestSystemEmail();
            this.dialog = false;
            this.systemEmail = '';
            this.password = '';
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    requestSystemEmail() {
      this.$store
        .dispatch("systemEmail/getSystemEmail")
        .then(response => {
          this.$store.commit("systemEmail/SET_SYSTEM_EMAIL", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>