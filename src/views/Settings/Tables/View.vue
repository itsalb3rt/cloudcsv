<template>
  <div>
    <v-card elevation-1>
      <v-card-title primary-title>
        {{table.table_name.toUpperCase()}}
        <v-btn small class="ml-3" color="primary" outlined>
          <v-icon small class="mr-2">fa-edit</v-icon>
          {{$t('callAction.edit')}} {{$t('settings.tableName')}}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="addColumn()" color="primary" outlined>
          <v-icon class="mr-2">fa-plus-circle</v-icon>
          {{$t('callAction.add')}} {{$t('dataPanel.column')}}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :loading="loading" :headers="headers" :items="columns" class="elevation-1">
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">fa-edit</v-icon>
            <v-icon small @click="deleteItem(item)">fa-trash</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" persistent transition="dialog-transition">
      <v-card>
        <v-card-title primary-title>{{$t('callAction.edit')}} {{$t('dataPanel.column')}}</v-card-title>
        <v-card-text>
          <v-form ref="columnForm">
            <v-row>
              <v-col cols="5">
                <v-text-field
                  type="text"
                  v-model="column.column_name"
                  outlined
                  :label="$t('settings.columnName')"
                  :rules="rules.tableColumns"
                  required
                ></v-text-field>
                <template v-if="column.forbiddenColumnName">
                  <p
                    class="error--text font-weight-bold mt-0"
                  >{{$t('settings.forbiddenColumnName')}}</p>
                </template>
              </v-col>
              <v-col cols="5">
                <v-select
                  :items="$store.getters['tables/getColumnsTypes']"
                  v-model="column.type"
                  item-value="value"
                  item-text="name"
                  :label="$t('settings.columnType')"
                  outlined
                  :rules="rules.requiredInput"
                  required
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  type="number"
                  v-model.number="column.length"
                  outlined
                  :label="$t('settings.columnLength')"
                  :rules="rules.requiredInput"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :loading="loadingUpdate"
            @click="(editMode)? updateColumn() : saveColumn() "
          >
            <v-icon class="mr-2">fa-save</v-icon>
            {{$t('callAction.save')}}
          </v-btn>
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
  mounted() {
    this.loading = true;
    this.requestTable();
  },
  data() {
    return {
      table: { table_name: "", columns: [] },
      loading: false,
      loadingUpdate: false,
      headers: [
        { text: this.$t("settings.columnName"), value: "column_name" },
        { text: this.$t("settings.columnType"), value: "type" },
        { text: this.$t("settings.columnLength"), value: "length" },
        { text: this.$t("callAction.action"), value: "action" }
      ],
      column: [],
      dialog: false,
      editMode: false
    };
  },
  methods: {
    editItem(item) {
      this.editMode = true;
      this.column = item;
      this.dialog = true;
    },
    showDialog() {
      this.dialog = true;
    },
    hideDialog() {
      this.dialog = false;
      this.editMode = false;
    },
    addColumn() {
      this.editMode = false;
      this.showDialog();
      this.column = { column_name: "", type: "text", length: 25 };
    },
    saveColumn() {
      if (!this.$refs.columnForm.validate()) {
        return false;
      }

      const newColumn = {
        name: this.column.column_name,
        dataType: this.column.type,
        length: this.column.length,
        id_table: this.table.id_table_storage
      };

      this.$store
        .dispatch("tables/createColumn", newColumn)
        .then(response => {
          if (response.status === 201) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: this.$t("callAction.saved"),
              color: "success",
              top: true
            });
            this.requestTable();
            this.hideDialog();
          }
        })
        .catch(error => {
          if (error.response.status === 409) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: this.$t("settings.columnNameDuplicate"),
              color: "error",
              top: true
            });
          }
        });
    },
    updateColumn() {
      if (!this.$refs.columnForm.validate()) {
        return false;
      }

      this.loadingUpdate = true;
      const data = {
        id_table_colum: this.column.id_table_colum,
        id_table: this.column.id_table_storage,
        column_name: this.column.column_name,
        type: this.column.type,
        length: this.column.length
      };

      this.$store
        .dispatch("tables/updateColum", data)
        .then(response => {
          this.loadingUpdate = false;

          if (response.status === 201) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: this.$t("callAction.saved"),
              color: "success",
              top: true
            });
            this.hideDialog();
          }
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 409) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: this.$t("messages.errors.newNameIsSameToOld"),
              color: "error",
              top: true
            });
          } else {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: `${this.$t("server.serverError")} ${this.$t(
                "server.tryAgainLater"
              )}`,
              color: "error",
              top: true
            });
          }
          this.loadingUpdate = false;
        });
    },
    deleteItem(item) {
      const request = confirm(this.$t("messages.confirmeDelete"));

      if (request) {
        this.$store
          .dispatch("tables/deleteColumn", item.id_table_colum)
          .then(response => {
            if (response.status === 200) {
              this.$store.commit("snackbar/setSnackbar", {
                show: true,
                message: this.$t("callAction.delete"),
                color: "success",
                top: true
              });
              this.requestTable();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    requestTable() {
      this.loading = true;
      this.$store
        .dispatch("tables/fetch", this.$route.params.id)
        .then(response => {
          this.table = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    columns() {
      if (this.table.columns.length > 0) {
        return this.table.columns;
      } else {
        return [];
      }
    },
    isTableNameForbidden() {
      return this.$store.getters["tables/getForbiddenColumnNames"].includes(
        this.tableName
      );
    }
  }
};
</script>