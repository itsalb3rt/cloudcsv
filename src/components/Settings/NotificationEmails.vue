<template>
  <div>
    <p>{{$t('settings.notificationEmails')}}</p>
    <p>{{$t('settings.notificationEmailInformation')}}</p>
    <div>
      <v-btn color="primary" @click="showDialog()" outlined>
        <v-icon class="mr-2">fa-plus-circle</v-icon>
        {{$t('callAction.add')}} {{$t('auth.email')}}
      </v-btn>
    </div>
    <v-dialog v-model="dialog" persistent max-width="500">
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
          <v-btn color="primary" @click="saveEmail()">{{$t('callAction.save')}} {{$t('auth.email')}}</v-btn>
          <v-btn color="secondary" outlined @click="hideDialog()">{{$t('callAction.noWait')}}</v-btn>
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
  data() {
    return {
      dialog: false,
      table: "",
      notificationOn: "create",
      email: ""
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
    hideDialog() {
      this.dialog = false;
    },
    saveEmail() {
      if (!this.$refs.notificationEmail.validate()) {
        console.log("not valid");
        return false;
      }

      this.email = "";
      this.hideDialog();
    }
  }
};
</script>