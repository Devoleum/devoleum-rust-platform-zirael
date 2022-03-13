import ProfileScreen from './ProfileScreen';

export default {
  component: ProfileScreen,
  title: 'ProfileScreen',
};

const Template = (args) => <ProfileScreen {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
