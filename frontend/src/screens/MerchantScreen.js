import React, { useState, useEffect } from "react";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Product from "../components/Product";

import { listHistoriesByMerchant } from "../actions/historyActions";
import { getMerchantDetails } from "../actions/userActions";
import LocalizedStrings from "react-localization";

const MerchantScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const historyListByMerchant = useSelector(
    (state) => state.historyListByMerchant
  );

  const { loading, error, histories } = historyListByMerchant;

  const merchantDetails = useSelector((state) => state.merchantDetails);
  const { merchantData } = merchantDetails;
  console.log(merchantData);
  useEffect(() => {
    dispatch(getMerchantDetails(match.params.id));
    dispatch(listHistoriesByMerchant(match.params.id));
  }, [dispatch, history]);

  return (
    <>
      <Meta title={merchantData.name} img_url={merchantData.image}/>
      <Row style={{ marginBottom: "15px" }}>
        <Col md={6}>
          <Image src={merchantData.image} alt={merchantData.name} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{merchantData.name}</h3>
              <strong>
                <a href={merchantData.website_url} target="_blank">
                  Website link
                </a>
              </strong>
            </ListGroup.Item>
            <ListGroup.Item>{merchantData.description}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      {merchantData.network_name && (
      <Row className="align-items-center">
        <Col>
          <h3>Network</h3>
          <Product
              product={{data: {
                name: merchantData.network_name,
                description: merchantData.network_description,
                image: merchantData.network_image,
                thumbnail: merchantData.network_thumbnail,
                network_link: merchantData.network_link,
              }}}
              fullText={true}
            />
        </Col>
      </Row>
      )}
      
        <Row className="align-items-center">
          <Col>
            <h3>{strings.sub}</h3>
          </Col>
        </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {histories.length === 0 ? (
            <Message variant="info">No histories found</Message>
          ) : (
            <>
              {histories.map((devoleumHistory) => (
                <>
                  {devoleumHistory.data && (
                    <Link
                      to={`/history/${devoleumHistory._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Product product={devoleumHistory} />
                    </Link>
                  )}
                </>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MerchantScreen;

const strings = new LocalizedStrings({
  en: {
    sub: "Stories",
  },
  it: {
    sub: "Storie",
  },
  fr: {
    sub: "histoires",
  },
});
