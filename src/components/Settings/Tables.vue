<template>
  <div>
    <v-form ref="tableForm">
      <p class="font-weight-bold">{{$t('settings.manageTables')}}</p>
      <v-btn color="primary" @click="showDialog()" outlined>
        <v-icon class="mr-2">fa-plus-circle</v-icon>
        {{$t('callAction.createTable')}}
      </v-btn>
      <p class="font-weight-bold mt-3">{{$t('settings.manageTablesInformation')}}</p>
      <div>
        <v-data-table
          :headers="headers"
          :items="$store.getters['tables/getTables']"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">fa-edit</v-icon>
            <v-icon small @click="deleteItem(item)">fa-trash</v-icon>
          </template>
        </v-data-table>
      </div>
      <div>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="hideDialog()">
                <v-icon>fa-window-close</v-icon>
              </v-btn>
              <v-toolbar-title>{{$t('callAction.createTable')}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  :disabled="columns.length == 0 || tableNameExits"
                  dark
                  text
                  :loading="loading"
                  @click="createTable()"
                >
                  <v-icon class="mr-2">fa-save</v-icon>Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <p class="font-weight-bold">{{$t('settings.tableName')}}</p>
                  <v-text-field
                    v-model="tableName"
                    name="tableName"
                    :label="$t('settings.tableName')"
                    id="tableName"
                    outlined
                    :rules="rules.tableName"
                    required
                  ></v-text-field>
                  <template v-if="tableNameExits">
                    <p
                      class="error--text font-weight-bold"
                    >{{$t('settings.tableNameAlreadyExists')}}</p>
                  </template>
                  <p>{{$t('settings.tableNameInformation')}}</p>
                </v-col>
                <v-col cols="8"></v-col>
                <v-col cols="12">
                  <v-divider class="mb-3"></v-divider>
                  <p class="font-weight-bold">{{$t('settings.columns')}}</p>
                  <p>{{$t('settings.columnsInformation')}}</p>
                </v-col>
                <v-col v-for="(column,index) in columns" :key="index" cols="12">
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        type="text"
                        v-model="column.name"
                        outlined
                        :label="$t('settings.columnName')"
                        :rules="rules.tableColumns"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        :items="columnTypes"
                        v-model="column.dataType"
                        item-value="value"
                        item-text="name"
                        :label="$t('settings.columnType')"
                        outlined
                        :rules="rules.requiredInput"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        type="number"
                        v-model.number="column.length"
                        outlined
                        :label="$t('settings.columnLenght')"
                        :rules="rules.requiredInput"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-btn @click="removeColumn(index)" color="error" text>
                        <v-icon class="mr-2">fa-trash</v-icon>
                        {{$t('callAction.remove')}}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <div>
                    <v-btn @click="addColumn()" dark fab bottom left color="primary">
                      <v-icon>fa-plus</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-form>
  </div>
</template>
<script>
import formsRules from "@/mixins/Miscellany/FormRules";

export default {
  mixins: [formsRules],
  mounted() {
    this.requestTables();
  },
  data() {
    return {
      dialog: false,
      tableName: "",
      columns: [],
      columnTypes: [
        { name: this.$t("callAction.text"), value: "text" },
        { name: this.$t("callAction.number"), value: "number" }
      ],
      loading: false,
      headers: [
        { text: "TABLE NAME", value: "table_name" },
        { text: "ACTIONS", value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
    hideDialog() {
      this.dialog = false;
    },
    addColumn() {
      this.columns.push({
        name: "",
        dataType: "text",
        length: 25
      });
    },
    removeColumn(index) {
      let request = confirm(`${this.$t("messages.confirmeDelete")}`);
      if (request) {
        this.columns.splice(index, 1);
      }
    },
    createTable() {
      if (!this.$refs.tableForm.validate()) {
        console.log("not valid");
        return false;
      }
      this.loading = true;
      const newTable = {
        table_name: this.tableName,
        columns: this.columns
      };

      this.$store
        .dispatch("tables/createTable", JSON.stringify(newTable))
        .then(response => {
          if (response.status === 201) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: this.$t("callAction.create"),
              color: "success",
              top: true
            });
            this.requestTables();
            this.loading = false;
            this.columns = [];
            this.tableName = "";
            this.hideDialog();
          }
        })
        .catch(error => {
          this.loading = false;
          if (error.response.status === 405) {
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: error.response.data,
              color: "success",
              top: true
            });
          }
        });
    },
    editItem(item) {
      alert("in cooming");
      console.log("TCL: editItem -> item", item);
    },
    deleteItem(item) {
      let request = confirm(this.$t("messages.confirmeDelete"));

      if (request) {
        const index = this.$store.getters["tables/getTables"].indexOf(item);

        this.$store
          .dispatch("tables/deleteTable", item.id_table_storage)
          .then(response => {
            if (response.status === 200) {
              this.$store.commit("snackbar/setSnackbar", {
                show: true,
                message: this.$t("callAction.delete"),
                color: "success",
                top: true
              });
              this.$store.commit("tables/REMOVE_TABLE", response.data);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    requestTables() {
      this.$store
        .dispatch("tables/fetchAll")
        .then(response => {
          this.$store.commit("tables/SET_TABLES", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    tableNameExits() {
      let tables = this.$store.getters["tables/getTables"];
      tables = tables.filter(table => table.table_name == this.tableName);
      return tables.length > 0 ? true : false;
    }
  }
};
</script>