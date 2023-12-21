import React from 'react';
import { Story, Meta } from '@storybook/blocks';

import Select, { Pokemon, SelectProps } from '../components/select/select';

export default {
  title: 'Components/Select',
  component: Select,
} as Meta;

const Template: Story<SelectProps> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSelect: (selectedPokemons) => console.log('Selected Pokémons:', selectedPokemons),
};

Default.parameters = {
  docs: {
    description: {
      component: 'A Pokemon selection component for building teams.',
    },
    source: {
      code: '<Select onSelect={(selectedPokemons) => console.log(selectedPokemons)} />',
    },
  },
};