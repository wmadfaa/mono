const rollup = require("rollup");
const {
  inputOptions,
  outputOptions,
  tsInputOptions,
  tsOutputOptions,
  useTs,
} = require("../utils/configs");

async function bundle(input, output) {
  // create a bundle
  const bundle = await rollup.rollup(input);
  // generate output specific code in-memory
  for (let options of output) {
    await bundle.generate(options);
    await bundle.write(options);
  }
  // closes the bundle
  await bundle.close();
}

async function build() {
  await bundle(inputOptions, outputOptions);
  if (useTs) {
    await bundle(tsInputOptions, tsOutputOptions);
  }
}

build().catch((err) => {
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
});
