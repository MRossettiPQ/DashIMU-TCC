import { boot } from 'quasar/wrappers';
import { QFile, QIcon, QLinearProgress, QMarkupTable, QTooltip } from 'quasar';
import DialogHeader from 'components/DialogHeader/DialogHeader.vue';
import ErrorScreen from 'components/ErrorScreen/ErrorScreen.vue';
import LoadingScreen from 'components/LoadingScreen/LoadingScreen.vue';
import MenuItem from 'components/MenuItem/MenuItem.vue';
import ThreeVisualizer from 'components/ThreeVisualizer/ThreeVisualizer.vue';
import ResultChartAndTable from 'components/ResultChartAndTable/ResultChartAndTable.vue';
import ChartVisualizer from 'components/ChartVisualizer/ChartVisualizer.vue';
import MeasurementTable from 'components/MeasurementTable/MeasurementTable.vue';
import DrawerItem from 'components/DrawerItem/DrawerItem.vue';

// import { camelCase, upperFirst } from 'lodash';
export default boot(async ({ Vue }) => {
  console.log('[INIT] - Loading components');

  //https://webpack.js.org/guides/dependency-management/#require-context
  // const requireComponent = require.context(
  //   // Look for files in the current directory
  //   '../components',
  //   // Look in subdirectories
  //   true,
  //   // Match .vue files
  //   /[\w-]+\.vue$/
  // );
  // console.log(requireComponent);
  // // For each matching file name...
  // requireComponent.keys()?.forEach((fileName: string) => {
  //   // Get the component config
  //   const componentConfig = require(fileName);
  //   // Get PascalCase name of component
  //   const componentName = upperFirst(
  //     camelCase(
  //       // Gets the file name regardless of folder depth
  //       fileName
  //         ?.split('/')
  //         ?.pop()
  //         ?.replace(/\.\w+$/, '') // remove file extension
  //     )
  //   );
  //
  //   // Globally register the component
  //   Vue.component(
  //     `${componentName}`,
  //     componentConfig.default || componentConfig
  //   );
  // });

  Vue.component('DialogHeader', DialogHeader);
  Vue.component('ErrorScreen', ErrorScreen);
  Vue.component('LoadingScreen', LoadingScreen);
  Vue.component('MenuItem', MenuItem);
  Vue.component('ThreeVisualizer', ThreeVisualizer);
  Vue.component('ResultChartAndTable', ResultChartAndTable);
  Vue.component('ChartVisualizer', ChartVisualizer);
  Vue.component('MeasurementTable', MeasurementTable);
  Vue.component('DrawerItem', DrawerItem);

  //
  Vue.component('QMarkupTable', QMarkupTable);
  Vue.component('QLinearProgress', QLinearProgress);
  Vue.component('QFile', QFile);
  Vue.component('QTooltip', QTooltip);
  Vue.component('QIcon', QIcon);
  // Vue.component('QBtn', QBtn);
  // Vue.component('QInput', QInput);
  // Vue.component('QBtnGroup', QBtnGroup);
  // Vue.component("QDate", QDate);
  // Vue.component('QPopupProxy', QPopupProxy);
  // Vue.component("QCheckbox", QCheckbox);
  // Vue.component("QMenu", QMenu);
  // Vue.component("QBadge", QBadge);
  // Vue.component("QSelect", QSelect);
  // Vue.component("QItemSection", QItemSection);
  // Vue.component("QItem", QItem);
  // Vue.component("QItemLabel", QItemLabel);
  // Vue.component("QImg", QImg);
  // Vue.component("QTime", QTime);
  // Vue.component("QColor", QColor);
  // Vue.component("QCard", QCard);
  // Vue.component("QCardSection", QCardSection);
  // Vue.component("QCardActions", QCardActions);
  // Vue.component("QToolbar", QToolbar);
  // Vue.component("QToolbarTitle", QToolbarTitle);
  // Vue.component("QDialog", QDialog);
  // Vue.component("QField", QField);
  // Vue.component("QAjaxBar", QAjaxBar);
  // Vue.component("QTab", QTab);
  // Vue.component("QTable", QTable);
  // Vue.component("QTabPanel", QTabPanel);
  // Vue.component("QTabs", QTabs);
  // Vue.component('QTabPanels', QTabPanels);
  // Vue.component("QSplitter", QSplitter);
});
