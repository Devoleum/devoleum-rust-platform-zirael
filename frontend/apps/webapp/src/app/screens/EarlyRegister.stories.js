import EarlyRegister from './EarlyRegister';

export default {
  component: EarlyRegister,
  title: 'EarlyRegister',
};

const Template = (args) => <EarlyRegister {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
