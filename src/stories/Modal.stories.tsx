import React from "react";
import { Story, Meta } from "@storybook/react";

import Modal, { ModalProps } from "../components/modal/modal";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    selectedPokemons: { control: "array" },
    onClose: { action: "onClose" },
  },
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args} />;

export const Default: Story<ModalProps> = Template.bind({});
Default.args = {
  selectedPokemons: [],
  onClose: () => console.log("Modal closed"),
};

Default.parameters = {
  docs: {
    description: {
      component: "A modal component for displaying details of selected Pokémon.",
    },
    source: {
      code: '<Modal selectedPokemons={[]} onClose={() => console.log("Modal closed")} />',
    },
  },
};

export const Loading: Story<ModalProps> = Template.bind({});
Loading.args = {
  selectedPokemons: [],
  onClose: () => console.log("Modal closed"),
};

Loading.parameters = {
  docs: {
    description: {
      component: "A modal component in a loading state.",
    },
    source: {
      code: '<Modal selectedPokemons={[]} onClose={() => console.log("Modal closed")} />',
    },
  },
};

export const Empty: Story<ModalProps> = Template.bind({});
Empty.args = {
  selectedPokemons: [],
  onClose: () => console.log("Modal closed"),
};

Empty.parameters = {
  docs: {
    description: {
      component: "A modal component with no selected Pokémon.",
    },
    source: {
      code: '<Modal selectedPokemons={[]} onClose={() => console.log("Modal closed")} />',
    },
  },
};
