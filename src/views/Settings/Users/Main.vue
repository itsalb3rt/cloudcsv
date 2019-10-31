<template>
  <div>
    <v-card elevation="1">
      <v-card-title primary-title>
        {{$t('settings.users.users')}}
        <v-spacer></v-spacer>
        <v-text-field
          single-line
          hide-details
          :label="$t('callAction.search')"
          v-model="search"
          outlined
        ></v-text-field>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="$store.getters['users/getUsers']"
          :loading="loading"
          :search="search"
        >
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">fa-edit</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <profile-dialog
      :user="editUser"
      :showDialog="profileUserDialog"
      :isAdmin="true"
      @hideDialog="hideProfileUserDialog()"
    />
  </div>
</template>
<script>
import profileDialog from "@/components/Users/ProfileDialog";

export default {
  components: { profileDialog },
  mounted() {
    this.loading = true;
    this.requestUsers();
  },
  data() {
    return {
      headers: [
        { text: this.$t("settings.users.name"), value: "full_name" },
        { text: this.$t("settings.users.email"), value: "email" },
        { text: this.$t("settings.users.createAt"), value: "create_at" },
        { text: this.$t("settings.users.role"), value: "role" },
        { text: this.$t("callAction.action"), value: "action", sortable: false }
      ],
      items: [],
      editUser: [],
      search: "",
      loading: false,
      profileUserDialog: false
    };
  },
  methods: {
    hideProfileUserDialog() {
      this.requestUsers();
      this.profileUserDialog = false;
    },
    showProfileUserDialog() {
      this.profileUserDialog = true;
    },
    requestUsers() {
      this.$store
        .dispatch("users/fetchUsers")
        .then(response => {
          this.$store.commit("users/SET_USERS", response.data);
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    editItem(item) {
      this.editUser = item;
      this.showProfileUserDialog();
    }
  }
};
</script>