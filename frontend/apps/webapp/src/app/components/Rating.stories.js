import Rating from './Rating';

export default {
  component: Rating,
  title: 'Rating',
};

const Template = (args) => <Rating {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
