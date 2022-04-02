import Achievement from './Achievement';

export default {
  component: Achievement,
  title: 'Achievement',
};

const Template = (args) => <Achievement {...args} />;

export const Algorand = Template.bind({});
Algorand.args = {
  label: 'Algorand MainNet',
  text: "https://algoexplorer.io/tx/I7V64SJRX7M3RTLII74GRS645WJYWJSPIK3LSB2BBJFEOMVHOXQQ",
  img: "http://localhost:5000/3e1f0555a6c91871.jpg",
  img_off: "http://localhost:5000/4d250cfbea761aa3.jpg",
  link: true,
  verifyLink: "https://algo.devoleum.com/main/5ffb9399b44b660004ba402c"
};

export const Polygon = Template.bind({});
Polygon.args = {
  label: 'Polygon Matic',
  text: "https://polygonscan.com/tx/0x9a22ec8375894f6464242d1fd322432e91ac762e7d3eeaed24502925b808ece6",
  img: "http://localhost:5000/d395e1bd322abbff.jpg",
  img_off: "http://localhost:5000/23f920f87db2a0e9.jpg",
  link: true,
  verifyLink: "https://algo.devoleum.com/main/5ffb9399b44b660004ba402c"
};
