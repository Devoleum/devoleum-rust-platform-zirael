import ProductCarousel from './ProductCarousel';

export default {
  component: ProductCarousel,
  title: 'ProductCarousel',
};

const Template = (args) => <ProductCarousel {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
