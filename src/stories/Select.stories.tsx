import React from 'react';
import { Story, Meta } from '@storybook/blocks';

import Select, { Pokemon, SelectProps } from '../components/select/select';

export default {
  title: 'Components/Select',
  component: Select,
} as Meta;

const Template: Story<SelectProps> = (args: any) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSelect: (selectedPokemons: Pokemon[]) => console.log('Selected Pokémons:', selectedPokemons),
};