import HomeScreen from './HomeScreen';

export default {
  component: HomeScreen,
  title: 'HomeScreen',
};

const Template = (args) => <HomeScreen {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
