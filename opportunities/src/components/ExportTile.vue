<template>
  <div
    class="export-option"
    v-bind:class="{ tileSelected: entry.selected }"
    v-on:click="clicked"
  >
    <div
      class="selectedCheckmark"
      :style="{ visibility: entry.selected ? 'visible' : 'hidden' }"
    >
      <img class="chkImage" src="./white-check.png" />
    </div>
    <div class="export-option-title">{{ entry.title }}</div>
    <div class="export-option-body">{{ entry.description }}</div>
  </div>
</template>

<script>
export default {
  name: "ExportTile",
  props: ["entry", "selected"],
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    clicked: function (event) {
      this.selected(this.entry);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/constants.scss";

.export-option {
  width: 188px;
  border: 1px solid $export-header-border-color;
  border-radius: 4px;
  padding: $option-container-top-padding $option-container-right-padding 20px
    4px;
  margin: 4px 16px 4px 0px;
  cursor: pointer;
}

.export-option-title {
  text-align: left;
  font-size: 1.12em;
  padding: 8px 0 8px 4px;
}

.export-option-body {
  text-align: left;
  font-size: 0.98em;
  padding: 4px;
}

.selectedCheckmark {
  float: right;
  height: 31px;
  width: 31px;
  background-color: $lighter-blue;
  margin-top: $option-container-top-padding * -1;
  margin-right: $option-container-right-padding * -1;

  overflow: hidden;
  // display: flex;
}

.chkImage {
  height: 16px;
  width: 16px;
  margin: -1px auto auto 12px;
}

.selectedCheckmark:after {
  content: "";
  position: absolute;
  margin: 12px auto auto -43px;
  width: 43px;
  height: 24px;
  transform: rotate(45deg);
  background-color: white; /* to see where it is */
}

.tileSelected {
  border: 2px solid $lighter-blue;
  // margin: 4px 16px 4px 0px;
  margin: 3px 16px 4px -1px;
}
</style>