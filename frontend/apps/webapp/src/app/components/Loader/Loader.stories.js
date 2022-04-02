import Loader from './Loader';

export default {
  component: Loader,
  title: 'Loader',
};

const Template = (args) => <Loader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
