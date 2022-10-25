import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import {
  QBadge,
  QBtn,
  QBtnGroup,
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
  QAjaxBar,
} from "quasar";
import VueApexCharts from "vue-apexcharts";
import ValidatorPlugin from "../commons/utils/ValidatorsUtils";

export default async ({ Vue }) => {
  console.log("[INIT] - Loading components");
  // https://webpack.js.org/guides/dependency-management/#require-context
  const requireComponent = require.context(
    // Look for files in the current directory
    "../components",
    // Look in subdirectories
    true,
    // Match .vue files
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

  Vue.component("QMarkupTable", QMarkupTable);
  Vue.component("QLinearProgress", QLinearProgress);
  Vue.component("QBtn", QBtn);
  Vue.component("QBtnGroup", QBtnGroup);
  Vue.component("QInput", QInput);
  Vue.component("QIcon", QIcon);
  Vue.component("QDate", QDate);
  Vue.component("QPopupProxy", QPopupProxy);
  Vue.component("QCheckbox", QCheckbox);
  Vue.component("QMenu", QMenu);
  Vue.component("QBadge", QBadge);
  Vue.component("QSelect", QSelect);
  Vue.component("QItemSection", QItemSection);
  Vue.component("QItem", QItem);
  Vue.component("QItemLabel", QItemLabel);
  Vue.component("QImg", QImg);
  Vue.component("QTime", QTime);
  Vue.component("QColor", QColor);
  Vue.component("QCard", QCard);
  Vue.component("QCardSection", QCardSection);
  Vue.component("QCardActions", QCardActions);
  Vue.component("QToolbar", QToolbar);
  Vue.component("QToolbarTitle", QToolbarTitle);
  Vue.component("QDialog", QDialog);
  Vue.component("QField", QField);
  Vue.component("QAjaxBar", QAjaxBar);
  Vue.component("Apexchart", VueApexCharts);
  Vue.use(ValidatorPlugin);
};
