import { Story, Meta } from '@storybook/react';
import { MerchantScreen } from './MerchantScreen';

export default {
  component: MerchantScreen,
  title: 'MerchantScreen',
} as Meta;

const Template: Story = (args) => <MerchantScreen {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
