import React from "react";
import { JsComponent } from ".";

export default {
  title: "js-component",
  component: JsComponent,
};

const Template = (args) => <JsComponent {...args} />;

export const basic = Template.bind({});
basic.args = {
  name: "basic",
};
