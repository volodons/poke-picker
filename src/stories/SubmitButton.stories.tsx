import React from "react";
import { Story, Meta } from "@storybook/blocks";
import SubmitButton, { SubmitButtonProps } from "../components/submitButton/submitButton";

export default {
  title: "Components/SubmitButton",
  component: SubmitButton,
} as Meta;

const Template: Story<SubmitButtonProps> = (args: any) => <SubmitButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: () => console.log("Submit clicked!"),
};

Default.parameters = {
  docs: {
    description: {
      component: "A button for submitting forms with a star icon and a downward chevron.",
    },
    source: {
      code: "<SubmitButton onSubmit={() => console.log("Submit clicked!")} />",
    },
  },
};