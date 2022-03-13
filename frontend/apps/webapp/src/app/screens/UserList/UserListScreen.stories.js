import UserListScreen from './UserListScreen';

export default {
  component: UserListScreen,
  title: 'UserListScreen',
};

const Template = (args) => <UserListScreen {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
