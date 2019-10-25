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
            <v-list-item :to="item.route" v-for="(item, index) in profileOptions" :key="index">
              <v-list-item-title>
                <v-icon class="mr-2">{{item.icon}}</v-icon>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      profileOptions: [
        { text: "Settings", route: "/settings/profile", icon: "fa-cog" },
        { text: "Logout", route: "/auth/logout", icon: "fa-sign-out-alt" }
      ],
      items: [
        { text: "UPLOAD DATA", route: "/data/import" },
        { text: "QUERY", route: "/data/export" },
        { text: "SETTING", route: "/settings/main" }
      ]
    };
  }
};
</script>
<style lang="css">
a.v-btn--active {
  border-bottom: 5px solid var(--v-primary-base);
}
</style>