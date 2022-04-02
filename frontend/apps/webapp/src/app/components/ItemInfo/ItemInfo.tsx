import React from 'react';
import { ListGroup, Image, Row, Col } from 'react-bootstrap';
import { BasicData } from '../../models/ILod';
import Meta from '../../components/Meta/Meta';

const ItemInfo = (item: BasicData) => {
  return (
    <>
      {item.data && (
        <>
          <Meta title={item.name} />
          <div className="row">
            <div className="col col-md-6">
              <Image src={item.data.image} alt={item.name} fluid />
            </div>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{item.data.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {item.data.description}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
          <br />
          <br />
        </>
      )}
    </>
  );
};

export default ItemInfo;
