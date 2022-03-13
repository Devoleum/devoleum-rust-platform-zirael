import { Story, Meta } from '@storybook/react';
import StepScreen from './StepScreen';

export default {
  component: StepScreen,
  title: 'StepScreen',
} as Meta;

const Template: Story = (args) => <StepScreen {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
