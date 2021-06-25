const { SourceMapGenerator } = require('source-map');

const generator = new SourceMapGenerator({
  file: "src/init.js",
  sourceRoot: ""
});

require('fs').writeFileSync('src/init.js.map', generator.toString())