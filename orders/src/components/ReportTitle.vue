<template>
  <div class="title-bar flex-container">
    <div class="flex-container">
      <div class="report-icon"></div>
      <div class="inline-block title-text">Report: Opportunities</div>
    </div>
    <button class="export" v-on:click="exportExcel()">Export</button>
  </div>
</template>

<script>
export default {
  name: "ReportTitle",
  props: ["exportExcel"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/constants.scss";
$icon-size: 28px;
$export-btn-width: 80px;
$export-btn-height: $icon-size;

$icon-color: rgb(26,92,153);//rgb(20, 173, 122);
$button-color: $icon-color;
button.export {
  background-color: $button-color;
  border-radius: 4px;
  border-style: solid;
  border-color: $button-color;
  color: white;
  font-size: .95rem;
  height: $export-btn-height;
  width: $export-btn-width;
  margin-left: auto;
  margin-right: $right-table-padding - $left-report-padding;
  cursor: pointer;
}

.flex-container {
  display: flex;
  align-items: center;
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
  border-radius: 4px;
  margin-right: 5px;
}

.inline-block {
  display: inline-block;
}

.title-text {
  font-size: 1.3em;
  font-weight: 600;
  font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
}
</style>
