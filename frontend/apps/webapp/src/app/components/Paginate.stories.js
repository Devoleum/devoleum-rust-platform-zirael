import Paginate from './Paginate';

export default {
  component: Paginate,
  title: 'Paginate',
};

const Template = (args) => <Paginate {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
