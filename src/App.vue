<template>
  <v-app>
    <v-content>
      <v-container grid-list-xs>
        <router-view />
      </v-container>
      <v-snackbar
        :value="$store.state.snackbar.snackbar.show"
        :multi-line="$store.state.snackbar.snackbar.multiLine"
        :top="$store.state.snackbar.snackbar.top === 'top' "
        :bottom="$store.state.snackbar.snackbar.bottom === 'bottom' "
        :color="$store.state.snackbar.snackbar.color"
      >
        {{$store.state.snackbar.snackbar.message}}
        <v-btn dark text @click="$store.commit('snackbar/setSnackbarShow',false)">Cerrar</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>
