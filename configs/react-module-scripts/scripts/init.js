process.on("unhandledRejection", (err) => {
  throw err;
});

const fs = require("fs-extra");
const path = require("path");
const argv = require("yargs-parser")(process.argv);

const APP_NAME_REGEX = /^@(.*)\/(.*)/;

const useTypescript = argv.useTs;
const appName = argv._.filter((s) => s.match(APP_NAME_REGEX))[0];
const subDir = argv.dir || "";

if (!appName) {
  throw new Error(`the app name must match "@workspace/app-name"`);
}

const moduleResolve = (p) => path.resolve(process.cwd(), p);

async function init() {
  const [, , name] = appName.match(APP_NAME_REGEX);
  const relativeAppPath = path.resolve(subDir, name);
  const appPath = moduleResolve(relativeAppPath);
  console.log(`creating ${name} lib in ${appPath}...`);

  if (await fs.exists(appPath)) {
    throw new Error(`${relativeAppPath} already exists!`);
  }

  const templateDir = path.resolve(
    __dirname,
    `../templates/${useTypescript ? "typescript" : "javascript"}`
  );

  if (await fs.exists(templateDir)) {
    await fs.copy(templateDir, appPath);
  } else {
    console.error(`Could not locate supplied template: "${templateDir}"`);
  }

  const appPackageJsonPath = path.resolve(appPath, "app-package.json");

  const appPackageJson = await fs.readJson(appPackageJsonPath);
  appPackageJson.name = appName;
  await fs.writeJson(path.resolve(appPath, "package.json"), appPackageJson, {
    spaces: 2,
    name: "package.json",
  });
  await fs.remove(appPackageJsonPath);
  console.log(`done!`);
}

init().catch((err) => {
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
});
