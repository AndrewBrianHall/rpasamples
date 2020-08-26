<template>
  <div id="app">
    <div class="main-report">
      <ReportTitle v-bind:exportExcel="exportExcel" />
      <Opportunities v-bind:data="data" />
    </div>
    <div :style="{visibility: showExportMessage ? 'visible' : 'hidden'}" class="export-message">
      Exported using 
      <a href="https://sheetjs.com/opensource">sheetjs community</a>
    </div>
  </div>
</template>

<script>
import DataCollection from "./models/data.js";
import ReportTitle from "./components/ReportTitle.vue";
import Opportunities from "./components/Opportunities.vue";

export default {
  name: "App",
  components: {
    Opportunities,
    ReportTitle,
  },
  data() {
    return {
      data: new DataCollection(),
      showExportMessage: false,
    };
  },
  computed: {
    totalRecords: function () {
      return this.data.totalOpportunities;
    },
  },
  methods: {
    exportExcel: function (event) {
      let wb = this.data.getExcelWorkbook();
      this.showExportMessage = true;
    },
  },
};
</script>

<style lang="scss">
@import "./styles/constants.scss";

$border-color: rgb(175, 175, 175);

#app {
  font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
}

.main-report {
  border-radius: 6px;
  border: 1px solid $border-color;
  background-color: white;
  padding-bottom: $left-report-padding;
}

.export-message {
  text-align: right;
  margin-top: 8px;
}
</style>
