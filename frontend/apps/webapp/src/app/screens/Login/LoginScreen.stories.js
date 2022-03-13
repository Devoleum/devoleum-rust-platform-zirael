import LoginScreen from './LoginScreen';

export default {
  component: LoginScreen,
  title: 'LoginScreen',
};

const Template = (args) => <LoginScreen {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
