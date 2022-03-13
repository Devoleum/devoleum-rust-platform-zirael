import Contacts from './Contacts';

export default {
  component: Contacts,
  title: 'Contacts',
};

const Template = (args) => <Contacts {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
