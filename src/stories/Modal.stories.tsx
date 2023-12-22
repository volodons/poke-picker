import React from 'react';
import { Meta, Story } from '@storybook/blocks';

import Modal, { ModalProps } from '../components/modal/modal';

export default {
  title: 'Components/Modal',
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args: any) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  selectedPokemons: [],
  onClose: () => console.log('Modal closed'),
};

export const Loading = Template.bind({});
Loading.args = {
  selectedPokemons: [],
  onClose: () => console.log('Modal closed'),
};

export const Empty = Template.bind({});
Empty.args = {
  selectedPokemons: [],
  onClose: () => console.log('Modal closed'),
};
