import Meta from './Meta';

export default {
  component: Meta,
  title: 'Meta',
};

const Template = (args) => <Meta {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
