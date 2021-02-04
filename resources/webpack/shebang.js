// Import the required modules
const { existsSync, readFileSync, chmodSync } = require('fs');
const { resolve } = require('path');
const { ReplaceSource } = require('webpack-sources');

// Webpack loader for editing the file
const loader = (source) => source.toString().replace(/[\s\n\r]*(#!.*)[\s\n\r]*/gm, '');

// Webpack plugin for handingling the hooks
class ShebangPlugin {

  // Define the constructor
  constructor() {
    this.entries = {};
  }

  // Define the hook applied
  apply(compiler) {

    // Handle each entry
    compiler.hooks.entryOption.tap('ShebangPlugin', (context, entries) => {
      this.entries = {};
      for (const name in entries) {
        const entry = entries[name];
        const first = entry.import[0];
        const file = resolve(context, first);
        if (existsSync(file)) {
          const content = readFileSync(file).toString();
          const matches = new RegExp(/[\s\n\r]*(#!.*)[\s\n\r]*/gm).exec(content);
          if (matches && matches[1]) this.entries[name] = { shebang: matches[1] };
        }
      }
    });

    // Handle the plugin compilation hooks
    compiler.hooks.thisCompilation.tap('ShebangPlugin', compilation => {

      // Handle the chunk asset hook
      compilation.hooks.chunkAsset.tap('ShebangPlugin', (mod, filename) => {
        if (mod.name in this.entries) this.entries[filename] = this.entries[mod.name];
      });

      // Handle the build module hook
      compilation.hooks.buildModule.tap('ShebangPlugin', mod => {
        if (mod.loaders instanceof Array) mod.loaders.push({ loader: __filename });
      });
    });

    // Check if the target is node
    if (compiler.options.target == 'node') {
      
      // Append the shebang using the make hook
      compiler.hooks.make.tap('ShebangPlugin', compilation => {
        compilation.hooks.afterProcessAssets.tap('ShebangPlugin', assets => {
          for (const name in assets) {
            const source = assets[name];
            if (name in this.entries) {
              const { shebang } = this.entries[name];
              const rep = new ReplaceSource(source, 'shebang');
              rep.insert(0, shebang + '\n\n', 'shebang');
              compilation.updateAsset(name, rep);
            }
          }
        });
      });

      // Handle the execution permissions for the final executable module
      compiler.hooks.assetEmitted.tap('ShebangPlugin', (file, { targetPath }) => chmodSync(targetPath, 0o755));
    }
  }
}

// Export the loader and plugin
module.exports = {
  default: loader,
  ShebangPlugin
}