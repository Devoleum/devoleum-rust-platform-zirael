import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords, img_url }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        property="og:image"
        content={img_url}
      />
      <meta
        name="twitter:image"
        content={img_url}
      />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Devoleum",
  description:
    "The authentic storytelling of your supply chain using Blockchain and and Data Science.",
  keywords:
    "devoleum, blockchain, supply chain, ethereum, food, artificial intelligence",
};

export default Meta;
