<template>
  <div>
    <div>Total Records</div>
    <div>{{data.totalOpportunities}}</div>
    <table>
      <thead>
        <tr>
          <th v-bind:key="col.property" v-for="col in columns" v-on:click="sortTable(col)">{{col.displayName}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" v-bind:key="row.id">
          <td v-bind:key="col.property" v-for="col in columns">{{row[col.property]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Message, { DataCollection } from "../models/data.js";

export default {
  name: "Opportunities",
  data() {
    return {
      data: new DataCollection(),
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../styles/style.scss";
</style>
