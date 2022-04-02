import ItemInfo from './ItemInfo';

export default {
  component: ItemInfo,
  title: 'ItemInfo',
};

const Template = (args) => <ItemInfo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
