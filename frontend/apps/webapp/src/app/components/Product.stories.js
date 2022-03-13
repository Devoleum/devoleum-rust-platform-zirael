import Product from './Product';

export default {
  component: Product,
  title: 'Product',
};

const Template = (args) => <Product {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
