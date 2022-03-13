import { Story, Meta } from '@storybook/react';
import Achievement from './Achievement';

export default {
  component: Achievement,
  title: 'Achievement',
} as Meta;

export interface IProps {
  label: string;
  text: string;
  img: string;
  img_off: string;
  link?: boolean;
  verifyLink?: string;
}

const Template: Story = (args) => <Achievement {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
