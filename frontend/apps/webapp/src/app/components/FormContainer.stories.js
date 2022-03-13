import FormContainer from './FormContainer';

export default {
  component: FormContainer,
  title: 'FormContainer',
};

const Template = (args) => <FormContainer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
