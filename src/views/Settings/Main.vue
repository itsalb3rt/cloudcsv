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
              ></v-select>
            </div>
            <v-divider></v-divider>
            <div class="mt-4 mb-4">
              <system-email/>
            </div>
            <v-divider></v-divider>
            <div class="mt-4 mb-4">
              <notification-emails/>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card elevation="1">
          <v-card-text>
            <tables-component />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import notificationEmails from '@/components/Settings/NotificationEmails'
import tablesComponent from '@/components/Settings/Tables'
import systemEmail from '@/components/Settings/SystemEmail'

export default {
  components:{
    notificationEmails,
    tablesComponent,
    systemEmail
  },
  data() {
    return {
      languages: [
        { text: "English", value: "en" },
        { text: "Español", value: "es" }
      ],
      currentLanguage: "en"
    };
  }
};
</script>