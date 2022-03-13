import RegisterScreen from './RegisterScreen';

export default {
  component: RegisterScreen,
  title: 'RegisterScreen',
};

const Template = (args) => <RegisterScreen {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
