<template>
  <div class="title-bar flex-container">
    <div class="flex-container">
      <div class="report-icon"></div>
      <div class="inline-block title-text">Report: Opportunities</div>
    </div>
    <div class="action-button-container">
      <button
        class="btn-export"
        v-on:click="exportExcel()"
        v-if="showExportButton"
      >
        Export
      </button>

      <b-dropdown split text="Export" v-on:click="exportExcel()" class='export-split-button shadow-none' v-if="showSplitButton">
        <b-dropdown-item v-on:click="exportExcel()">Export</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item disabled>Edit</b-dropdown-item>
        <b-dropdown-item disabled>Subscribe</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportTitle",
  props: ["exportExcel"],
  mounted: function () {
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString.toLowerCase());
    const version = queryParams.get("v");

    if (version === "2") {
      this.showExportButton = false;
      this.showSplitButton = true;
    }
  },
  data() {
    return {
      showExportButton: true,
      showSplitButton: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/constants.scss";
@import "../styles/export.scss";

.flex-container {
  display: flex;
  align-items: center;
}

.action-button-container {
  margin-left: auto;
  margin-right: $right-table-padding - $left-report-padding;
}

div.title-bar {
  text-align: left;
  background-color: $header-background;
  padding: $left-report-padding;
  border-top-left-radius: $container-border-radius;
  border-top-right-radius: $container-border-radius;
}

div.report-icon {
  height: $icon-size;
  width: $icon-size;
  background-color: $icon-color;
  display: inline-block;
  border-radius: 2px;
  margin-right: 8px;
}

.inline-block {
  display: inline-block;
}

.title-text {
  font-size: 1.25em;
  font-weight: 600;
}
</style>

<style lang="scss">
@import "../styles/constants.scss";
@import "../styles/export.scss";
//Override Bootstrap styles
.btn-secondary {
  border: none;
  border-radius: 0px;
  background-color: $button-color;
  font-family: $font-families;
  font-size: 1.05em;
  transition: none;
  // cursor: pointer;
}

// .btn-secondary:hover{
//   cursor: pointer;
//   background-color: $button-hover-color;
// }

@mixin active-button{
  background-color: $button-hover-color;
  border: none;
  box-shadow: none;;
}

.btn-secondary:hover {
  @include active-button;
}
.btn-check:focus + .btn-secondary, .btn-secondary:focus {
  background-color: $button-color;
  box-shadow: none;
}
.btn-check:checked + .btn-secondary, .btn-check:active + .btn-secondary, .btn-secondary:active, .btn-secondary.active, .show > .btn-secondary.dropdown-toggle {
  @include active-button();
}

.btn:not(:disabled):not(.disabled):active, .btn:not(:disabled):not(.disabled).active,
.btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active{
  background-color: $button-hover-color;
}



</style>
