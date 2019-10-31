<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="font-weight-bold">
        <span class="primary--text">Cloud</span>
        <span class="success--text">Csv</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-for="(item,index) in items" :key="index" :to="item.route" text>{{item.text}}</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-divider class="mx-4" vertical></v-divider>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" text v-on="on">
              <v-avatar size="35">
                <v-icon dark>fa-user-circle</v-icon>
              </v-avatar>
              <span class="ml-2 black--text">{{$store.state.auth.user.user_name}}</span>
              <v-icon class="ml-2">fa-angle-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="showDialogEditProfile()">
              <v-list-item-title>
                <v-icon class="mr-2">{{profileOptions.settings.icon}}</v-icon>
                {{profileOptions.settings.text}}
              </v-list-item-title>
            </v-list-item>
            <v-list-item :to="profileOptions.logout.route">
              <v-list-item-title>
                <v-icon class="mr-2">{{profileOptions.logout.icon}}</v-icon>
                {{profileOptions.logout.text}}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-toolbar>
    <profile-dialog
      :user="currentUser"
      :showDialog="profileUserDialog"
      :isAdmin="false"
      @hideDialog="hideProfileUserDialog()"
    />
  </div>
</template>
<script>
import profileDialog from "@/components/Users/ProfileDialog";

export default {
  components: { profileDialog },
  data() {
    return {
      profileUserDialog: false,
      profileOptions: {
        settings: {
          text: this.$t('menu.settings'),
          route: "#",
          icon: "fa-cog"
        },
        logout: {
          text: this.$t('menu.logout'),
          route: "/auth/logout",
          icon: "fa-sign-out-alt"
        }
      },
      items: [
        { text: this.$t('menu.uploadData'), route: "/data/import" },
        { text: this.$t('menu.query'), route: "/data/export" },
        { text: this.$t('menu.systemSettings'), route: "/settings/main" }
      ],
      currentUser: []
    };
  },
  methods: {
    hideProfileUserDialog() {
      this.profileUserDialog = false;
    },
    showDialogEditProfile() {
      this.currentUser = this.$store.getters["auth/getMe"];
      this.profileUserDialog = true;
    }
  }
};
</script>
<style lang="css">
a.v-btn--active {
  border-bottom: 5px solid var(--v-primary-base);
}
</style>