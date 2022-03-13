import React from "react";
import { ListGroup, Image, Row, Col } from "react-bootstrap";
import Meta from "./Meta";

const ItemInfo = ({ item }) => {
  return (
    <>
      {item.data && (
        <>
          <Meta title={item.name} />
          <Row>
            <Col md={6}>
              <Image
                src={item.data.image}
                alt={item.name}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{item.data.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {item.data.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <br />
          <br />
        </>
      )}
    </>
  );
};

export default ItemInfo;
