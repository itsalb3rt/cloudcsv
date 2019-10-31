<template>
  <div>
    <p>{{$t('settings.notificationEmails')}}</p>
    <p>{{$t('settings.notificationEmailInformation')}}</p>
    <div>
      <v-btn color="primary" @click="showDialog()" outlined>
        <v-icon class="mr-2">fa-plus-circle</v-icon>
        {{$t('callAction.add')}} {{$t('auth.email')}}
      </v-btn>
      <div>
        <v-data-table
          :headers="headers"
          :items="$store.getters['notificationsEmails/getEmails']"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteItem(item)">fa-trash</v-icon>
          </template>
        </v-data-table>
      </div>
    </div>
    <v-dialog v-model="dialog" persistent max-width="800">
      <v-card>
        <v-card-title class="headline">{{$t('settings.addNotificationEmail')}}</v-card-title>
        <v-card-text>
          <v-form ref="notificationEmail">
            <p class="font-weight-bold">{{$t('settings.destinataryInformation')}}</p>
            <v-select
              item-text="table_name"
              item-value="id_table_storage"
              :items="$store.getters['tables/getTables']"
              v-model="table"
              :label="$t('dataPanel.tables')"
              :rules="rules.requiredInput"
              required
              outlined
            ></v-select>
            <div>
              <p class="font-weight-bold">{{$t('settings.notificationOn')}}</p>
              <v-radio-group v-model="notificationOn" :mandatory="false" row>
                <v-radio color="primary" :label="$t('callAction.create')" value="create"></v-radio>
                <v-radio color="primary" :label="$t('callAction.delete')" value="delete"></v-radio>
              </v-radio-group>
            </div>
            <div>
              <p class="font-weight-bold">{{$t('settings.detinataryEmail')}}</p>
              <v-text-field
                v-model="email"
                name="email"
                :label="$t('auth.email')"
                id="email"
                outlined
                :rules="rules.email"
                required
              ></v-text-field>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn color="secondary" outlined @click="hideDialog()">{{$t('callAction.noWait')}}</v-btn>
          <v-btn color="primary" @click="saveEmail()">{{$t('callAction.save')}} {{$t('auth.email')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import formsRules from "@/mixins/Miscellany/FormRules";

export default {
  mixins: [formsRules],
  name: "notificationEmails",
  mounted() {
    this.requestEmails();
  },
  data() {
    return {
      dialog: false,
      table: "",
      notificationOn: "create",
      email: "",
      headers: [
        { text: this.$t("auth.email"), value: "email" },
        { text: this.$t("settings.tableName"), value: "table.table_name" },
        { text: "ON", value: "action", sortable: false },
        {
          text: this.$t("callAction.action"),
          value: "actions",
          sortable: false
        }
      ]
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
    hideDialog() {
      this.dialog = false;
    },
    requestEmails() {
      this.$store
        .dispatch("notificationsEmails/getNotificationsEmails")
        .then(response => {
          this.$store.commit("notificationsEmails/SET_EMAILS", response.data);
        });
    },
    saveEmail() {
      if (!this.$refs.notificationEmail.validate()) {
        return false;
      }

      const newNotification = {
        email: this.email,
        id_table_storage: this.table,
        action: this.notificationOn
      };

      this.$store
        .dispatch(
          "notificationsEmails/createNotification",
          JSON.stringify(newNotification)
        )
        .then(response => {
          if (response.status === 201) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: this.$t("callAction.save"),
              color: "success",
              top: true
            });
            this.requestEmails();
          }
        })
        .catch(error => {
          console.log(error);
        });

      this.email = "";
      this.hideDialog();
    },
    deleteItem(item) {
      let request = confirm(this.$t("messages.confirmeDelete"));

      if (request) {
        const index = this.$store.getters[
          "notificationsEmails/getEmails"
        ].indexOf(item);
        this.$store
          .dispatch(
            "notificationsEmails/deleteNotification",
            item.id_notification_email
          )
          .then(response => {
            if (response.status === 200) {
              this.$store.commit("snackbar/setSnackbar", {
                show: true,
                message: this.$t("callAction.delete"),
                color: "success",
                top: true
              });
              this.$store.commit("notificationsEmails/REMOVE_EMAIL", index);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>