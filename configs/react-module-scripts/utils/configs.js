const path = require("path");

const del = require("rollup-plugin-delete");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const external = require("rollup-plugin-peer-deps-external");
const dts = require("rollup-plugin-dts").default;
const esbuild = require("rollup-plugin-esbuild");
const postcss = require("rollup-plugin-postcss");
const ignoreImport = require("rollup-plugin-ignore-import");
const { terser } = require("rollup-plugin-terser");
const paths = require("./paths");

// postcss plugins
const autoprefixer = require("autoprefixer");
const production = process.env.mode === 'production';

const inputOptions = {
  input: paths.SOURCE,
  plugins: [
    external(),
    postcss({
      plugins: [autoprefixer()],
      sourceMap: !production,
      minimize: production,
    }),
    nodeResolve(),
    commonjs(),
    esbuild({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/,
      sourceMap: !production,
      minify: production,
      target: "es6",
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
      loaders: {
        ".json": "json",
        '.js': 'jsx'
      },
    }),
    del({ force: true, targets: [path.resolve(paths.MODULE_OUT_DIR, "*")] }),
  ],
  external: Object.keys(require(paths.MODULE_PKG)),
};

const outputOptions = [
  { file: paths.MAIN, format: "cjs", plugins: [terser()] },
  { file: paths.MODULE, format: "esm" },
];

const tsInputOptions = {
  input: paths.SOURCE,
  plugins: [
    ignoreImport({
      extensions: [".scss", ".css"],
      body: "",
    }),
    dts(),
  ],
};

const tsOutputOptions = [{ file: "dist/index.d.ts", format: "es" }];

const watchOptions = {
  clearScreen: true,
};

module.exports = {
  inputOptions,
  outputOptions,
  tsInputOptions,
  tsOutputOptions,
  watchOptions,
  useTs: process.argv.indexOf("--useTs") > -1,
};
