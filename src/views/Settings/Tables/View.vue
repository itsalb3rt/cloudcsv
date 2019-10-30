<template>
  <div>
    <v-card elevation-1>
      <v-card-title primary-title>
        {{table.table_name.toUpperCase()}}
        <v-btn small class="ml-3" color="primary" outlined>
          <v-icon small class="mr-2">fa-edit</v-icon>
          {{$t('callAction.edit')}} {{$t('settings.tableName')}}
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
          <v-row>
            <v-col cols="5">
              <v-text-field
                type="text"
                v-model="column.column_name"
                outlined
                :label="$t('settings.columnName')"
                :rules="rules.tableColumns"
                required
                @keyup="isNameDuplicate(index)"
              ></v-text-field>
              <template v-if="column.duplicate">
                <p class="error--text font-weight-bold mt-0">{{$t('settings.columnNameDuplicate')}}</p>
              </template>
              <template v-if="column.forbiddenColumnName">
                <p class="error--text font-weight-bold mt-0">{{$t('settings.forbiddenColumnName')}}</p>
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
                :label="$t('settings.columnLenght')"
                :rules="rules.requiredInput"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="update()">{{$t('callAction.save')}}</v-btn>
          <v-btn color="secondary" outlined @click="dialog = false">{{$t('callAction.noWait')}}</v-btn>
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
    this.$store
      .dispatch("tables/fetch", this.$route.params.id)
      .then(response => {
        this.table = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      table: { table_name: "", columns: [] },
      loading: false,
      headers: [
        { text: this.$t("settings.columnName"), value: "column_name" },
        { text: this.$t("settings.columnType"), value: "type" },
        { text: this.$t("settings.columnLenght"), value: "length" },
        { text: this.$t("callAction.action"), value: "action" }
      ],
      column: [],
      dialog: false,
    };
  },
  methods: {
    editItem(item) {
      this.column = item;
      this.dialog = true;
    },
    update() {},
    deleteItem(item) {}
  },
  computed: {
    columns() {
      if (this.table.columns.length > 0) {
        return this.table.columns;
      } else {
        return [];
      }
    }
  }
};
</script>