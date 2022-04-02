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
              <img src={item.data.image} alt={item.name} className="img-fluid" />
            </div>
            <Col md={3}>
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <h3>{item.data.name}</h3>
                </div>

                <div className="list-group-item">
                  Description: {item.data.description}
                </div>

              </div>
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
