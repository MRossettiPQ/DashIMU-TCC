import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import {
  QMarkupTable,
  QLinearProgress,
  QBtn,
  QInput,
  QIcon,
  QDate,
  QPopupProxy,
  QCheckbox,
  QMenu,
  QBadge,
  QSelect,
  QItemSection,
  QItem,
  QItemLabel,
  QImg,
  QTime,
  QColor,
  QCard,
  QCardActions,
  QCardSection,
  QToolbar,
  QToolbarTitle,
  QDialog
} from "quasar";
import {
  ColorPicker,
  DateTimePicker,
  DropUpload,
  Editor,
  MaskedInput,
  Select,
  Autocomplete,
  Ajuda,
  DataTable
} from "@crusader-vue/components";
import VueApexCharts from "vue-apexcharts";

export default async ({ Vue }) => {
  console.log("loading components");
  const requireComponent = require.context(
    // Look for files in the current directory
    "../components",
    // Look in subdirectories
    true,
    // Match .vue viles
    /[\w-]+\.vue$/
  );

  // For each matching file name...
  requireComponent.keys().forEach(fileName => {
    // Get the component config
    const componentConfig = requireComponent(fileName);

    // Get PascalCase name of component
    const componentName = upperFirst(
      camelCase(
        // Gets the file name regardless of folder depth
        fileName
          .split("/")
          .pop()
          .replace(/\.\w+$/, "") // remove file extension
      )
    );

    // Globally register the component
    Vue.component(
      `${componentName}`,
      componentConfig.default || componentConfig
    );
  });

  Vue.component("date-time-picker", DateTimePicker);
  Vue.component("q-markup-table", QMarkupTable);
  Vue.component("q-linear-progress", QLinearProgress);
  Vue.component("q-btn", QBtn);
  Vue.component("q-input", QInput);
  Vue.component("q-icon", QIcon);
  Vue.component("q-date", QDate);
  Vue.component("q-popup-proxy", QPopupProxy);
  Vue.component("q-checkbox", QCheckbox);
  Vue.component("q-menu", QMenu);
  Vue.component("q-badge", QBadge);
  Vue.component("q-select", QSelect);
  Vue.component("q-item-section", QItemSection);
  Vue.component("q-item", QItem);
  Vue.component("q-item-label", QItemLabel);
  Vue.component("q-img", QImg);
  Vue.component("q-time", QTime);
  Vue.component("q-color", QColor);
  Vue.component("q-card", QCard);
  Vue.component("q-card-section", QCardSection);
  Vue.component("q-card-actions", QCardActions);
  Vue.component("q-toolbar", QToolbar);
  Vue.component("q-toolbar-title", QToolbarTitle);
  Vue.component("q-dialog", QDialog);
  Vue.component("apexchart", VueApexCharts);
};
