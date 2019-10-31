<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-card elevation="1">
          <v-card-text>
            <div class="mb-4">
              <p>{{$t('settings.language')}}</p>
              <p>{{$t('settings.languageInformation')}}</p>
              <v-select
                :items="languages"
                v-model="currentLanguage"
                :label="$t('settings.language')"
                outlined
                @change="changeLanguage()"
              ></v-select>
            </div>
            <v-divider></v-divider>
            <div class="mt-4 mb-4">
              <system-email />
            </div>
            <v-divider></v-divider>
            <div class="mt-4 mb-4">
              <notification-emails />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card elevation="1">
          <v-card-text>
            <div class="mt-4 mb-4">
              <users-manager />
              <v-divider class="mt-4"></v-divider>
            </div>
            <div class="mt-4 mb-4">
              <tables-component />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import notificationEmails from "@/components/Settings/NotificationEmails";
import tablesComponent from "@/components/Settings/Tables";
import systemEmail from "@/components/Settings/SystemEmail";
import usersManager from "@/components/Settings/UsersManager";

export default {
  mounted() {
    let language = window.localStorage.getItem("app_language");
    if (language === null) {
      language = navigator.language;
      this.currentLanguage = "en";
    } else {
      this.currentLanguage = language;
    }
  },
  components: {
    notificationEmails,
    tablesComponent,
    systemEmail,
    usersManager
  },
  data() {
    return {
      languages: [
        { text: "English", value: "en" },
        { text: "Español", value: "es" }
      ],
      currentLanguage: ""
    };
  },
  methods: {
    changeLanguage() {
      window.localStorage.setItem("app_language", this.currentLanguage);
      window.location.reload();
    }
  }
};
</script>