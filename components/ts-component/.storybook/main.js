const appRoot = require("app-root-path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "storybook-preset-craco",
      options: {
        cracoConfigFile: appRoot.resolve("craco.config.js"),
      },
    },
  ],
};
