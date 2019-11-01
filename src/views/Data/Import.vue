<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-card elevation="1">
          <v-card-text>
            <p>{{$t('dataPanel.importDataInformation')}}</p>
            <v-select
              :items="$store.getters['tables/getTables']"
              v-model="table"
              item-text="table_name"
              item-value="id_table_storage"
              outlined
              :label="$t('dataPanel.tables')"
            ></v-select>
            <div class="mt-3 mb-6">
              <p
                class="black--text font-weight-bold"
              >{{$t('dataPanel.table')}} {{$t('dataPanel.columns')}}</p>
              <ul>
                <li
                  v-for="(column,index) in currentTableColumns"
                  :key="index"
                >{{column.column_name}}</li>
              </ul>
              <v-divider></v-divider>
            </div>
            <v-select
              :items="$store.state.dataImport.csvDelimiters"
              v-model="csvDelimiter"
              outlined
              :label="$t('dataPanel.csvDelimiter')"
            ></v-select>
            <div>
              <v-file-input
                :label="$t('dataPanel.addCsvLabel')"
                v-model="file"
                @change="parseData()"
                accept=".csv"
              ></v-file-input>
            </div>
            <v-divider></v-divider>
            <div class="mt-4">
              <v-btn
                :loading="loadingSubmitData"
                @click="uploadData()"
                :disabled="fileData.length === 0 || table.length === 0 || columnsConflict.length > 0"
                color="primary"
              >
                <template
                  v-if="fileData.length === 0 || table.length === 0"
                >{{$t('dataPanel.submitButtonTextDisabled')}}</template>
                <template v-else>
                  <v-icon class="mr-2">fa-upload</v-icon>
                  {{$t('dataPanel.submitButtonText')}}
                </template>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card elevation="1" min-height="385">
          <v-card-text>
            <template v-if="fileData.length === 0">
              <div class="text-center mt-10">
                <v-icon color="success" class="mr-2">fa-info-circle</v-icon>
                <span
                  class="font-weight-bold primary--text"
                >{{$t('dataPanel.beforeImportTableInfo')}}</span>
              </div>
            </template>
            <template v-else>
              <template v-if="columnsConflict.length > 0">
                <div class="mt-4 mb-4">
                  <p
                    class="error--text font-weight-bold"
                  >{{$t('dataPanel.columnsConflictInformation')}}</p>
                  <p class="font-weight-bold black--text">{{$t('dataPanel.columnNotInFile')}}</p>
                  <v-chip
                    label
                    class="mr-2"
                    v-for="(column,index) in columnsConflict"
                    :key="index"
                  >{{column}}</v-chip>
                </div>
              </template>
              <v-data-table
                :headers="fileHeaders"
                :items="fileData"
                class="elevation-1"
                :loading="loadingFileData"
              >
                <template v-slot:item.action="{ item }">
                  <v-icon small @click="deleteItem(item)">fa-trash</v-icon>
                </template>
              </v-data-table>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Papa from "papaparse";

export default {
  mounted() {
    this.$store
      .dispatch("tables/fetchAll")
      .then(response => {
        this.$store.commit("tables/SET_TABLES", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      table: "",
      file: [],
      fileData: [],
      fileHeaders: [],
      csvDelimiter: "auto",
      loadingFileData: false,
      columnsConflict: [],
      loadingSubmitData: false
    };
  },
  methods: {
    parseData() {
      if (this.file === null) {
        this.fileData = [];
        this.fileHeaders = [];
        return false;
      }

      this.loadingFileData = true;
      Papa.parse(this.file, {
        header: true,
        delimiter: this.csvDelimiter === "auto" ? "" : this.csvDelimiter,
        skipEmptyLines: true,
        complete: results => {
          this.setHeaders(results.meta.fields);
          this.fileData = results.data;
          setTimeout(() => {
            this.loadingFileData = false;
          }, 1000);

          this.fileHaveSameFieldsOfTable(
            results.meta.fields,
            this.currentTableColumns
          );
        }
      });
    },
    setHeaders(headers) {
      headers.forEach(header => {
        this.fileHeaders.push({ text: header, value: header });
      });
      this.fileHeaders.push({
        text: this.$t("callAction.action"),
        value: "action"
      });
    },
    fileHaveSameFieldsOfTable(fileHeaders, tableHeaders) {
      let tableHeadersNames = [];
      tableHeaders.forEach(header => {
        tableHeadersNames.push(header.column_name);
      });

      this.columnsConflict = tableHeadersNames.filter(item => {
        return !fileHeaders.includes(item);
      });
    },
    uploadData() {
      const request = confirm(this.$t("messages.confirmeSave"));

      if (request) {
        this.loadingSubmitData = true;
        const data = {
          table_id: this.table,
          data: this.fileData
        };
        this.$store
          .dispatch("dataStorage/saveData", JSON.stringify(data))
          .then(response => {
            if (response.status === 201) {
              this.loadingSubmitData = false;
              this.$store.commit("snackbar/setSnackbar", {
                show: true,
                message: this.$t("dataPanel.dataUploadSuccess"),
                color: "success",
                top: true
              });

              //clear data file information
              this.table = "";
              this.file = [];
              this.fileData = [];
              this.fileHeaders = [];
            }
          })
          .catch(error => {
            this.loadingSubmitData = false;
            this.$store.commit("snackbar/setSnackbar", {
              show: true,
              message: `${this.$t("server.serverError")} ${this.$t(
                "server.tryAgainLater"
              )}`,
              color: "error",
              top: true
            });
            console.log(error.respose);
          });
      }
    },
    deleteItem(item) {
      const request = confirm(this.$t("messages.confirmeDelete"));

      if (request) {
        const itemIndex = this.fileData.indexOf(item);
        this.fileData.splice(itemIndex,1);
      }

    }
  },
  computed: {
    currentTableColumns() {
      let table = this.$store.getters["tables/getTables"].filter(
        table => table.id_table_storage == this.table
      );
      return this.table === "" ? [] : table[0].columns;
    }
  }
};
</script>