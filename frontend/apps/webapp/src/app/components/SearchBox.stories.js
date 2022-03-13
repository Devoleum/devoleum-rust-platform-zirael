import SearchBox from './SearchBox';

export default {
  component: SearchBox,
  title: 'SearchBox',
};

const Template = (args) => <SearchBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
