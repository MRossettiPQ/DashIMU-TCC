import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import {
  QBadge,
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QCheckbox,
  QColor,
  QDate,
  QDialog,
  QField,
  QIcon,
  QImg,
  QInput,
  QItem,
  QItemLabel,
  QItemSection,
  QLinearProgress,
  QMarkupTable,
  QMenu,
  QPopupProxy,
  QSelect,
  QTime,
  QToolbar,
  QToolbarTitle,
} from "quasar";
import { DateTimePicker, MaskedInput } from "@crusader-vue/components";
import VueApexCharts from "vue-apexcharts";

export default async ({ Vue }) => {
  console.log("loading components");
  // https://webpack.js.org/guides/dependency-management/#require-context
  const requireComponent = require.context(
    // Look for files in the current directory
    "../components",
    // Look in subdirectories
    true,
    // Match .vue viles
    /[\w-]+\.vue$/
  );

  // For each matching file name...
  requireComponent.keys().forEach((fileName) => {
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
  Vue.component("masked-input", MaskedInput);
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
  Vue.component("q-field", QField);
  Vue.component("apexchart", VueApexCharts);
};
