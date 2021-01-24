import React from "react";
import { Meta, Story } from "@storybook/react";
import { TsComponent, TsComponentProps } from ".";

export default {
  title: "typescript",
  component: TsComponent,
} as Meta;

const Template: Story<TsComponentProps> = (args) => <TsComponent {...args} />;

export const basic = Template.bind({});
basic.args = {
  name: "basic",
};
