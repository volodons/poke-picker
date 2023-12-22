import React from "react";
import { Story, Meta } from "@storybook/react";
import Form from "../components/form/form";

export default {
  title: "Components/Form",
  component: Form,
} as Meta;

const Template: Story = (args: any) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  docs: {
    description: {
      component: "A form component for capturing user information and selecting Pokemon.",
    },
    source: {
      code: "<Form />",
    },
  },
};