<template>
  <div>
    <v-dialog v-model="showDialog" persistent max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title primary-title></v-card-title>
        <v-card-text>
          <p class="primary--text font-weight-bold">{{$t('settings.users.basic')}}</p>
          <v-text-field outlined :label="$t('auth.fullName')" v-model="editUser.full_name"></v-text-field>
          <v-text-field outlined :label="$t('auth.email')" v-model="editUser.email"></v-text-field>
          <v-divider class="mt-4 mb-4"></v-divider>
          <p class="primary--text font-weight-bold">{{$t('settings.users.security')}}</p>
          <v-text-field
            type="password"
            :label="$t('auth.password')"
            v-model="user.password"
            :rules="rules.minLength8"
            outlined
          ></v-text-field>
          <v-text-field
            type="password"
            :label="$t('auth.confirmPassword')"
            v-model="editUser.confirmPassword"
            :rules="rules.minLength8"
            outlined
          ></v-text-field>
          <div v-if="isAdmin">
            <v-divider class="mt-4 mb-4"></v-divider>
            <p class="primary--text font-weight-bold">{{$t('settings.users.role')}}</p>
            <v-radio-group row v-model="editUser.role" :mandatory="false">
              <v-radio color="primary" :label="$t('settings.users.user')" value="user"></v-radio>
              <v-radio color="primary" :label="$t('settings.users.admin')" value="admin"></v-radio>
            </v-radio-group>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="closeModal()" outlined>{{$t('callAction.noWait')}}</v-btn>
          <v-btn color="primary" @click="updateUser()">
            <v-icon class="mr-2">fa-save</v-icon>
            {{$t('callAction.save')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import formRules from "@/mixins/Miscellany/FormRules";

export default {
  mixins: [formRules],
  props: ["user", "showDialog", "isAdmin"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    closeModal(event) {
      this.$emit("hideDialog");
    },
    updateUser() {
      this.loading = true;
      const data = {
        id_user: this.editUser.id_user,
        email: this.editUser.email,
        full_name: this.editUser.full_name,
        role: this.editUser.role
      };

      if (this.editUser.password.length > 0) {
        data.password = this.editUser.password;
        data.confirm_password = this.editUser.confirmPassword;
      }

      this.$store
        .dispatch("users/update", data)
        .then(response => {
          this.$store.commit("snackbar/setSnackbar", {
            show: true,
            message: this.$t("callAction.saved"),
            color: "success",
            bottom: true
          });
          this.loading = false;
          this.closeModal();
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 409) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: error.response.data,
              color: "error",
              bottom: true
            });
          } else if (error.response.status === 401) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: error.response.data,
              color: "error",
              bottom: true
            });
          }
        });
    }
  },
  computed: {
    editUser() {
      this.user.password = "";
      const editUser = this.user;
      editUser.confirmPassword = "";
      return editUser;
    }
  }
};
</script>