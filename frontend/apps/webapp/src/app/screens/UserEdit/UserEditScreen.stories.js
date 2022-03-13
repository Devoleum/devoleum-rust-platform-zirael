import UserEditScreen from './UserEditScreen';

export default {
  component: UserEditScreen,
  title: 'UserEditScreen',
};

const Template = (args) => <UserEditScreen {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
