const rollup = require("rollup");
process.env.mode = 'development'
const {
  inputOptions,
  outputOptions,
  tsInputOptions,
  tsOutputOptions,
  watchOptions,
  useTs,
} = require("../utils/configs");

function watch(options) {
  const watcher = rollup.watch(options);
  // This will make sure that bundles are properly closed after each run
  watcher.on("event", (evt) => {
    switch (evt.code) {
      case "START":
        console.info("starting...");
        break;
      case "BUNDLE_START":
        console.info("building...");
        break;
      case "BUNDLE_END":
        console.info("wait for new changes");
        evt.result.close();
        break;
      case "ERROR": {
        watcher.close();
        if (evt.error) {
          console.error(evt.error);
        }
        process.exit(1);
      }
    }
  });
  return watcher;
}

watch({
  ...inputOptions,
  output: outputOptions,
  watch: watchOptions,
});

if (useTs) {
  watch({
    ...tsInputOptions,
    output: tsOutputOptions,
    watch: watchOptions,
  });
}
