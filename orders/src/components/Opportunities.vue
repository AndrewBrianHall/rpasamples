<template>
  <div class="appContainer">
    <div>
      <div class="recordCount">
        <div>Total Records</div>
        <div>{{data.totalOpportunities}}</div>
      </div>
      <div class="exportButton">
        <button v-on:click="exportExcel()">Export</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th
            v-bind:key="col.property"
            v-for="col in columns"
            v-on:click="sortTable(col)"
          >{{col.displayName}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" v-bind:key="row.id">
          <td>{{row.id}}</td>
          <td v-bind:key="col.property" v-for="col in columns">{{row[col.property]}}</td>
        </tr>
      </tbody>
    </table>
    <div :style="{visibility: showExportMessage ? 'visible' : 'hidden'}">
      Export powered by the
      <a href="https://sheetjs.com/opensource">community version of sheetjs</a>
    </div>
  </div>
</template>

<script>
import DataCollection from "../models/data.js";
import XLSX from "xlsx";

export default {
  name: "Opportunities",
  data() {
    return {
      data: new DataCollection(),
      showExportMessage: false,
    };
  },
  computed: {
    columns: function () {
      return this.data.displayColumns;
    },
    rows: function () {
      return this.data.opportunities;
    },
  },
  methods: {
    exportExcel: function (event) {
      let wb = this.data.getExcelWorkbook();

      XLSX.writeFile(wb, "test.xlsx");
      this.showExportMessage = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/style.scss";
</style>
