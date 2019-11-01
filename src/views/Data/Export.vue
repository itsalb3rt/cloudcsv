<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-card elevation="1">
          <v-card-text>
            <v-form ref="queryForm">
              <div class="mb-3">
                <p class="black--text font-weight-bold">{{$t('dataPanel.exportDataInformation')}}</p>
                <v-select
                  :items="$store.getters['tables/getTables']"
                  v-model="table"
                  item-text="table_name"
                  item-value="id_table_storage"
                  outlined
                  :label="$t('dataPanel.tables')"
                ></v-select>
              </div>
              <v-divider></v-divider>
              <div class="mb-3">
                <v-switch
                  v-model="showOptions"
                  color="primary"
                  :label="`${$t('dataPanel.showOptions')}`"
                ></v-switch>
                <div v-if="showOptions">
                  <p class="black--text font-weight-bold">{{$t('dataPanel.exportDataInformation')}}</p>
                  <div>
                    <v-menu
                      ref="startDateMenu"
                      v-model="startDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="startDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="startDate"
                          :label="$t('dataPanel.startDate')"
                          prepend-icon="fa-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="startDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="startDateMenu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.startDateMenu.save(startDate)"
                        >{{$t('callAction.save')}}</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
                  <div>
                    <v-menu
                      ref="endDateMenu"
                      v-model="endDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="endDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="endDate"
                          :label="$t('dataPanel.endDate')"
                          prepend-icon="fa-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="endDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="endDateMenu = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.endDateMenu.save(endDate)"
                        >{{$t('callAction.save')}}</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
              <div>
                <v-btn
                  :loading="loadingQuery"
                  :disabled="table.length === 0 || !isDatesFill"
                  color="primary"
                  @click="query()"
                >{{$t('callAction.query')}}</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card>
          <v-card-title primary-title v-if="table !== '' ">
            <v-row>
              <v-col cols="6">{{tableName.table_name.toUpperCase()}}</v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="search"
                  append-icon="fa-search"
                  :label="$t('callAction.search')"
                  single-line
                  hide-details
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="mr-4"
                  color="primary"
                  @click="downloadCsv"
                  outlined
                  :disabled="data.length === 0"
                  :loading="downloading"
                >
                  <v-icon class="mr-2">fa-file-alt</v-icon>
                  {{$t('callAction.downloadCsv')}}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :search="search"
              :no-data-text="$t('dataPanel.noDataAvailable')"
              :headers="headers"
              :items="data"
              class="elevation-1"
              :loading="loadingQuery"
            ></v-data-table>
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
      showOptions: false,
      startDate: "",
      endDate: "",
      startDateMenu: false,
      endDateMenu: false,
      loadingQuery: false,
      headers: [],
      data: [],
      search: "",
      downloading: false
    };
  },
  methods: {
    query() {
      this.loadingQuery = true;

      this.$store
        .dispatch("dataStorage/getDataByTable", {
          tableId: this.table,
          queryString: this.getQueryString()
        })
        .then(response => {
          if (response.status === 200) {
            if (response.data.length > 0) {
              this.setHeaders(Object.keys(response.data[0]), ["id_user"]);
              this.data = response.data;
            } else {
              this.data = [];
              this.headers = [];
            }

            this.loadingQuery = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getQueryString() {
      if (this.startDate.length > 0 && this.endDate.length > 0) {
        return `?create_at>=${this.startDate}&create_at<=${this.endDate}`;
      } else {
        return " ";
      }
    },
    setHeaders(headers, omitHeaders = null) {
      headers.forEach(header => {
        if (omitHeaders !== null) {
          if (!omitHeaders.includes(header)) {
            this.headers.push({ text: header, value: header });
          }
        } else {
          this.headers.push({ text: header, value: header });
        }
      });
    },
    downloadCsv() {
      this.downloading = true;
      let csv = Papa.unparse(this.data);

      let csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      let csvURL = null;
      if (navigator.msSaveBlob) {
        csvURL = navigator.msSaveBlob(csvData, "download.csv");
      } else {
        csvURL = window.URL.createObjectURL(csvData);
      }

      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", `${this.tableName.table_name}.csv`);
      tempLink.click();
      this.downloading = false;
    }
  },
  computed: {
    isDatesFill() {
      if (
        (this.startDate.length > 0 && this.endDate.length > 0) ||
        (this.startDate.length === 0 && this.endDate.length === 0)
      ) {
        return true;
      } else {
        return false;
      }
    },
    tableName() {
      return this.$store.getters["tables/getTables"].find(
        table => table.id_table_storage == this.table
      );
    }
  }
};
</script>