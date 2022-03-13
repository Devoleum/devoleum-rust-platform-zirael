import { Story, Meta } from '@storybook/react';
import { HomeScreen } from './HomeScreen';

export default {
  component: HomeScreen,
  title: 'HomeScreen',
} as Meta;

const Template: Story = (args) => <HomeScreen {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
