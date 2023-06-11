const { glob } = require('glob');
const fs = require('fs');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const path = require('path');

async function createHelpers() {
  console.log('[INIT] createHelpers');
  // eslint-disable-next-line no-undef
  const helperPath = path.resolve(__dirname, '../.ide-helper');
  const exists = fs.existsSync(helperPath);

  if (!exists) {
    fs.mkdirSync(helperPath, {
      recursive: true,
    });
  }

  const file_paths = (await glob('./src/components/**/*.[vV][uU][eE]')) || [];

  let imports = '';
  let registrations = '';

  file_paths.forEach((path) => {
    // Get PascalCase name of component
    const componentName = upperFirst(
      camelCase(
        // Gets the file name regardless of folder depth
        path
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    );
    console.log(`${path} => ${componentName}`);

    imports += `import ${componentName} from '${path}'\n`;
    // if (options.vue === 2) {
    //   registrations += `  Vue.component('${componentName}', ${componentName})\n`;
    // } else if (options.vue === 3) {
    //   registrations += `  .component('${componentName}', ${componentName})\n`;
    // }
  });

  let output =
    '//THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT!\n//For more info visit: https://github.com/BenceSzalai/vue-components-ide-helper\n\n';
  // if (options.vue === 2) {
  //   output += `${imports}\nexport default async ({ Vue }) => {\n${registrations}}`;
  // } else if (options.vue === 3) {
  //   output += `import { createApp } from 'vue'\n\n${imports}\nconst app = createApp({})\n\napp\n${registrations}`;
  // }
  // fs.writeFile(options.output, output, (err) => {
  //   if (err) {
  //     throw new Error(err);
  //   }
  //   console.log(`\nWritten new file to:\n${options.output}`);
  // });
}

// eslint-disable-next-line no-undef
module.exports = {
  createHelpers,
};
