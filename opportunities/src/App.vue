<template>
  <div id="app">
    <ExportPopup
      ref="exportPopup"
      v-bind:showModal="showExportPopup"
      v-bind:data="data"
      v-bind:exportedCallback="setExportStatus"
    />
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
import ExportPopup from "./components/ExportPopup.vue";

export default {
  name: "App",
  components: {
    Opportunities,
    ReportTitle,
    ExportPopup,
  },
  data() {
    return {
      data: new DataCollection(),
      showExportMessage: false,
      showExportPopup: false,
    };
  },
  computed: {
    totalRecords: function () {
      return this.data.totalOpportunities;
    },
  },
  methods: {
    exportExcel: function (event) {
      let popup = this.$refs.exportPopup;
      popup.showPopup();
    },
    setExportStatus: function (exported) {
      this.showExportMessage = exported;
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import "./styles/constants.scss";

$border-color: rgb(175, 175, 175);

#app {
  font-family: $font-families;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
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
