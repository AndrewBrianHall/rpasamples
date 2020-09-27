<template>
  <div class="title-bar flex-container">
    <div class="flex-container">
      <div class="report-icon"></div>
      <div class="inline-block title-text">Report: Opportunities</div>
    </div>
    <button class="btn-export" v-on:click="exportExcel()">Export</button>
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
@import "../styles/export.scss";

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
