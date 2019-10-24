<template>
  <div>
    <v-row>
      <v-col cols="5">
        <v-card elevation="1">
          <v-card-text>
            <p>{{$t('dataPanel.importDataInformation')}}</p>
            <v-select
              :items="$store.state.dataImport.tables"
              v-model="importData"
              outlined
              :label="$t('dataPanel.tables')"
            ></v-select>
            <v-select
              :items="$store.state.dataImport.csvDelimiters"
              v-model="csvDelimiter"
              outlined
              :label="$t('dataPanel.csvDelimiter')"
            ></v-select>
            <div>
              <v-file-input :label="$t('dataPanel.addCsvLabel')"></v-file-input>
            </div>
            <v-divider></v-divider>
            <div class="mt-4">
              <v-btn :disabled="importData.length === 0" color="primary">
                <template
                  v-if="importData.length === 0"
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
      <v-col cols="7">
        <v-card elevation="1" min-height="385">
          <v-card-text>
            <template v-if="importData.length === 0">
              <div class="text-center mt-10">
                <v-icon color="success" class="mr-2">fa-info-circle</v-icon>
                <span class="font-weight-bold primary--text">{{$t('dataPanel.beforeImportTableInfo')}}</span>
              </div>
            </template>
            <template v-else>
              <v-icon class="mr-2">fa-upload</v-icon>
              {{$t('dataPanel.submitButtonText')}}
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      importData: [],
      csvDelimiter: "auto"
    };
  }
};
</script>