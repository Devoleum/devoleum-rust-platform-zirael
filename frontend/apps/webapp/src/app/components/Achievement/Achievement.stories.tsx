import { Story, Meta } from '@storybook/react';
import Achievement from './Achievement';

export default {
  component: Achievement,
  title: 'Achievement',
} as Meta;

const Template: Story = (args) => <Achievement {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
