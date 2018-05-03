/**
 * Sane YAML Merger
 */

const fs = require('fs');

/**
 * Merges YAML files while preserving anchors and aliases.
 */
const merge = (...files) => {
  let parsed = [];
  files.map(file => {
    let text = fs.readFileSync(file, 'utf8');
    const anchors = text.match(/:\s+(&\S+)/g);
    const aliases = text.match(/:\s+(\*\S+)/g);
    console.log({ anchors });
    console.log({ aliases });
  });
};

merge('~/code/circleci-microservice/test/dc-api.yml', '~/code/circleci-microservice/test/global.yml');
//# sourceMappingURL=index.js.map