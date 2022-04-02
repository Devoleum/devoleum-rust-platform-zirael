import React from 'react';
import { Helmet } from 'react-helmet';

export interface IProps {
  title: string;
  description: string;
  img_url: string;
}

const Meta = ({ title, description, img_url }: IProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={img_url} />
      <meta name="twitter:image" content={img_url} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Devoleum',
  description:
    'The authentic storytelling of your supply chain using Blockchain and and Data Science.',
  keywords:
    'devoleum, blockchain, supply chain, ethereum, food, artificial intelligence',
  img_url: 'https://i.ibb.co/tBrkxzM/Devoleum-Logo-1.png',
};

export default Meta;
