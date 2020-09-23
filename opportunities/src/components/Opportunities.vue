<template>
  <div>
    <div class="record-header">
      <div class="total-label">Total Records</div>
      <div class="total-count">{{data.totalOpportunities}}</div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="td-row-num"></th>
            <th
              v-bind:key="col.property"
              v-for="col in columns"
              v-on:click="sortTable(col)"
            >{{col.displayName}}<span class="sortHolder" v-bind:class="sortClassObject(col)"></span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" v-bind:key="row.id">
            <td class="center">{{row.row}}</td>
            <td
              v-bind:key="col.property"
              v-for="col in columns"
              v-bind:class="{right: col.rightAlign}"
            >{{row[col.property]}}</td>
          </tr>
        </tbody>
      </table>
      <div class="table-right-spacer"></div>
    </div>
  </div>
</template>

<script>
import DataCollection, {sortDirections} from "../models/data.js";
import XLSX from "xlsx";

export default {
  name: "Opportunities",
  props: ["data"],
  data() {
    return {
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
    sortTable: function (col) {
      // let sorted = this.data.opportunities.splice();
      this.data.sortOpportunities(col);
    },
    sortClassObject: function(col){
      if(col.sortDirection === sortDirections.Asc){
        return "asc";
      }
      else if(col.sortDirection === sortDirections.Desc){
        return "desc";
      }
      return "";
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/constants.scss";

$table-border-color: rgb(175, 175, 175);

.table-container {
  border-top: 1px solid $table-border-color;
  // padding-left: $left-report-padding;
}

td.center {
  text-align: center;
}

td.right {
  text-align: right;
}

table {
  font-size: 1em;
  display: inline-block;
  border-collapse: collapse;
  border: 1px solid $table-border-color;
  margin-top: -1px;
}

table th {
  /* text-transform: uppercase; */
  text-align: left;
  background: $header-background;
  color: rgb(80, 80, 80);
  font-size: 0.925em;
  font-weight: 500;
  cursor: pointer;
  padding: 8px;
  min-width: 30px;
  border-right: 1px solid $table-border-color;
  border-bottom: 1px solid $table-border-color;
}

.sortHolder{
  margin-left: 8px;
  width: 12px;
  display: inline-block;
}

.asc::after{
  content: '\25B2';
}

.desc::after{
  content: '\25BC';
}

th.td-row-num:hover{
  cursor: default;
  background: $header-background;
}

table th:hover {
  background: rgb(200, 200, 200);
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 1px solid $table-border-color;
}

tr {
  border-bottom: 1px solid $table-border-color;
}

tr:last-child {
  border-bottom: none;
}

table td:last-child,
th:last-child {
  border-right: none;
}

.table-right-spacer {
  width: $right-table-padding;
  display: inline-block;
}

div {
  text-align: left;
}

.record-header {
  margin: 4px 0px;
  padding-left: $left-report-padding;
}

.total-label {
  font-size: 0.88em;
  color: rgb(95, 95, 95);
}

.total-count {
  font-size: 1.1em;
  color: rgb(33, 57, 80);
}
</style>
