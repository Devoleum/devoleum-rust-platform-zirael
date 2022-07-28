import React from "react";
import { Link } from "react-router-dom";
import LocalizedStrings from "react-localization";
import { IHistory } from "../../models/IHistory";
import { IStep } from "../../models/ISteps";
import { ILod } from "../../models/ILod";

const strings = new LocalizedStrings({
  en: {
    by: "by",
    more: "Read more",
  },
  it: {
    by: "di",
    more: "Scopri di più",
  },
});

export interface IProps {
  product: IHistory | IStep | any;
  fullText?: boolean;
}

const Product: React.FC<IProps> = ({ product, fullText = false }: IProps) => {
  return (
    <div className="card_container">
      <div className="card_image">
        <img src={product.data.thumbnail} style={{ width: "200px", height: "200px", objectFit: "cover" }} />
      </div>
      <div className="card_text">
        <div className="card_text_title">{product.data.name}</div>
        {product.data.merchant && (
          <div>
            {strings.by}{" "}
            <Link to={`/merchant/${product.user['$oid']}`}>
              <span className="card_text_merch">
                {product.data.merchant.name}
              </span>
            </Link>
            <br />
          </div>
        )}

        <div className="card_text_desc">
          {product.data.description &&
          product.data.description.length > 160 &&
          !fullText
            ? product.data.description.substring(0, 160) + "... "
            : product.data.description}
        </div>
        {fullText ? (
          <div>
            <div className="card_text_more">
              <a href={product.data.network_link} target="_blank">
                Link
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="card_text_more">{strings.more}</div>
            <div className="card_text_date">{product.data.date}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
