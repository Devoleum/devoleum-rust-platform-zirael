import Achievement from './Achievement';

export default {
  component: Achievement,
  title: 'Achievement',
};

const Template = (args) => <Achievement {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
