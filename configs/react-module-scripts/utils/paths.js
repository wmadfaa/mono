const fs = require("fs-extra");
const path = require("path");

const CWD = process.cwd();

const moduleResolve = (p) => path.resolve(CWD, p);

// module pkg
const MODULE_PKG = moduleResolve("package.json");
const MODULE_OUT_DIR = moduleResolve("dist");
let MAIN = moduleResolve("dist/index.cjs.js");
let MODULE = moduleResolve("dist/index.esm.js");
let TYPINGS = moduleResolve("dist/index.d.ts");
let SOURCE = moduleResolve("src/index.ts");

async function checkPaths() {
  await fs.exists(MODULE_PKG);
  const pkg = require(MODULE_PKG);
  if ("main" in pkg) {
    MAIN = moduleResolve(pkg.main);
  } else {
    console.warn(`the "main" options is missing from your package.json`);
  }
  if ("module" in pkg) {
    MODULE = moduleResolve(pkg.module);
  } else {
    console.warn(`the "module" options is missing from your package.json`);
  }
  if ("typings" in pkg) {
    TYPINGS = moduleResolve(pkg.typings);
  } else if (process.argv.indexOf("--useTs") > -1) {
    console.warn(`the "typings" options is missing from your package.json`);
  }
  if ("source" in pkg) {
    SOURCE = moduleResolve(pkg.source);
  } else {
    console.warn(`the "source" options is missing from your package.json`);
  }
}

checkPaths().catch((err) => {
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
});

module.exports = {
  MODULE_PKG,
  MODULE_OUT_DIR,
  MAIN,
  MODULE,
  TYPINGS,
  SOURCE,
};
