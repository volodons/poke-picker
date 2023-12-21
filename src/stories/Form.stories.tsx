import React from 'react';
import { Story, Meta } from '@storybook/blocks';
import Form from '../components/form/form';

export default {
  title: 'Components/Form',
  component: Form,
} as Meta<typeof Form>;

const Template: Story<typeof Form> = (args: any) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {};