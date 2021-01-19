const path = require("path");
const rollup = require("rollup");
process.env.mode = "production";
const {
  inputOptions,
  outputOptions,
  tsInputOptions,
  tsOutputOptions,
  useTs,
} = require("../utils/configs");

async function bundle(input, output, name = "") {
  // create a bundle
  const bundle = await rollup.rollup(input);
  // generate output specific code in-memory
  for (let options of output) {
    const fileName = path.basename(options.file);
    console.info(`${name}generating... ${fileName}`);
    await bundle.generate(options);
    console.info(`${name}writing... ${fileName}`);
    await bundle.write(options);
  }
  console.info(`${name}done`);
  // closes the bundle
  await bundle.close();
}

async function build() {
  await bundle(inputOptions, outputOptions, "code: ");
  if (useTs) {
    await bundle(tsInputOptions, tsOutputOptions, "types: ");
  }
}

build().catch((err) => {
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
});
