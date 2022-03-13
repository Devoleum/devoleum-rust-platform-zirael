import { Story, Meta } from '@storybook/react';
import HistoryScreen from './HistoryScreen';

export default {
  component: HistoryScreen,
  title: 'HistoryScreen',
} as Meta;

const Template: Story = (args) => <HistoryScreen {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
