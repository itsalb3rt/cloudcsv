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
        <v-btn icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
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