<template>
  <v-app>
    <v-content>
      <v-container grid-list-xs>
        <router-view />
      </v-container>
      <v-snackbar
        :value="snackbar.show"
        :multi-line="snackbar.multiLine"
        :top="snackbar.top === 'top' "
        :bottom="snackbar.bottom === 'bottom' "
        :color="snackbar.color"
      >
        {{snackbar.message}}
        <v-btn dark text @click="setSnackbarShow(false)">Cerrar</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    ...mapMutations(["setSnackbar", "setSnackbarShow"])
  },
  computed: {
    ...mapState(["user", "isLoged", "currentNavegationArea", "snackbar"])
  }
};
</script>
