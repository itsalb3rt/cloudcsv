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
          :loading="loading"
          :headers="headers"
          :items="$store.getters['tables/getTables']"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="goToTableView(item)">fa-eye</v-icon>
            <v-icon small @click="deleteItem(item)">fa-trash</v-icon>
          </template>
        </v-data-table>
      </div>
      <div>
        <v-dialog
          scrollable
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar max-height="70" dark color="primary">
              <v-btn icon dark @click="hideDialog()">
                <v-icon>fa-window-close</v-icon>
              </v-btn>
              <v-toolbar-title>{{$t('callAction.createTable')}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  :disabled="columns.length == 0 || tableNameExits || hasDuplicateColumn"
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
                  <template v-if="isTableNameForbidden">
                    <p class="error--text font-weight-bold">{{$t('settings.forbiddenTableName')}}</p>
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
                        @keyup="isNameDuplicate(index)"
                      ></v-text-field>
                      <template v-if="column.duplicate">
                        <p
                          class="error--text font-weight-bold mt-0"
                        >{{$t('settings.columnNameDuplicate')}}</p>
                      </template>
                      <template v-if="column.forbiddenColumnName">
                        <p
                          class="error--text font-weight-bold mt-0"
                        >{{$t('settings.forbiddenColumnName')}}</p>
                      </template>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        :items="$store.getters['tables/getColumnsTypes']"
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
                        :label="$t('settings.columnLength')"
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
    this.loading = true;
    this.requestTables();
  },
  data() {
    return {
      dialog: false,
      tableName: "",
      columns: [],
      loading: false,
      headers: [
        { text: this.$t('settings.tableName'), value: "table_name" },
        { text: this.$t('callAction.action'), value: "actions", sortable: false }
      ],
      duplicateColumns: [],
      hasDuplicateColumn: false
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
        length: 25,
        duplicate: false,
        forbiddenColumnName: false
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
    goToTableView(item) {
      this.$router.push({ name: 'tableView', params: { id: item.id_table_storage } });
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
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    isNameDuplicate(indexCurrentColumn) {
      let countDuplicate = 0;

      for (let index in this.columns) {
        if (
          this.columns[indexCurrentColumn].name == this.columns[index].name &&
          index != indexCurrentColumn
        ) {
          this.columns[indexCurrentColumn].duplicate = true;
          countDuplicate++;
        }
        this.$store.getters['tables/getForbiddenColumnNames'].includes(
          this.columns[indexCurrentColumn].name
        )
          ? (this.columns[indexCurrentColumn].forbiddenColumnName = true)
          : (this.columns[indexCurrentColumn].forbiddenColumnName = false);
      }

      if (countDuplicate === 0) {
        this.columns[indexCurrentColumn].duplicate = false;
        this.hasDuplicateColumn = false;
      } else {
        this.hasDuplicateColumn = true;
      }
    }
  },
  computed: {
    tableNameExits() {
      let tables = this.$store.getters["tables/getTables"];
      tables = tables.filter(table => table.table_name == this.tableName);
      return tables.length > 0 ? true : false;
    },
    isTableNameForbidden() {
      return this.$store.getters['tables/getForbiddenColumnNames'].includes(this.tableName);
    }
  }
};
</script>