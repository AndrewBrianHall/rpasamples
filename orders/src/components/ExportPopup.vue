 <template>
  <div>
    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-container">
          <div class="modal-header">Export</div>

          <div class="modal-body">
            <div class="options-header">Export View</div>
            <div class="export-options-row">
              <ExportTile
                v-bind:key="option.title"
                v-for="option in options"
                v-bind:entry="option"
                v-bind:selected="selectionChanged"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button class="cancel-button footer-button" v-on:click="closePopup">Cancel</button>
            <button class="export-common footer-button" v-on:click="exportClick">Export</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ExportTile from "./ExportTile.vue";

export default {
  name: "ExportPopup",
  components: { ExportTile },
  props: ["data"],
  data() {
    return {
      showModal: true,
      options: [
        {
          id: 0,
          title: "Formatted Report",
          description:
            "Export the report opportunities at each stage divided into different sheets",
          selected: true,
        },
        {
          id: 1,
          title: "Data Only",
          description: "Export only the details as a single sheet",
          selected: false,
        },
      ],
    };
  },
  methods: {
    closePopup: function () {
      this.showModal = false;
    },
    exportClick: function(){
      let exportFormat = this.getSelectedOption();
      this.data.exportData(exportFormat);
    },
    showPopup: function () {
      this.showModal = true;
    },
    getSelectedOption: function(){
       for (let i = 0; i < this.options.length; i++) {
         if(this.options[i].selected){
           return this.options[i].id;
         }
       }
       return 0;
    },
    selectionChanged: function (entry) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].title === entry.title) {
          this.options[i].selected = true;
        } else {
          this.options[i].selected = false;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/constants.scss";
@import "../styles/export.scss";

.options-header {
  font-size: 1.1rem;
}

.export-options-row {
  margin: 4px auto 8px auto;
  display: flex;
  // justify-content: center;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 480px;
  margin: 80px auto auto auto;
  //   padding: 20px 30px;
  background-color: #fff;
  border-radius: 4px;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  padding: 12px;
  font-size: 1.3rem;
  color: $export-header-color;
}

.modal-body {
  text-align: left;
  border-top: 2px solid $export-header-border-color;
  border-bottom: 2px solid $export-header-border-color;
  padding: 16px;
  height: 180px;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding-right: 8px;
  background-color: rgb(245, 245, 245);
}

.footer-button {
  margin: 8px;
  font-size: 0.8rem;
}

.cancel-button {
  @extend button.export-shape-props;
  border: 1px solid rgb(180, 180, 180);
  color: $icon-color;
  background-color: white;
  font-size: 0.76rem;
}
</style>
