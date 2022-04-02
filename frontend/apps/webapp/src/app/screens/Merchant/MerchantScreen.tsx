import React, { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import Meta from '../../components/Meta';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Product from '../../components/Product/Product';

import LocalizedStrings from 'react-localization';
import { IHistory } from '../../models/IHistory';
import { getIterate } from '../../utils/fetchData';

const MerchantScreen = () => {
  let { id } = useParams();

  const [merchantData, setMerchantData] = useState<any>(null);
  const [histories, setHistories] = useState<IHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMerchant();
    getItems();
  }, []);

  const getMerchant = async () => {
    try {
      const resp = await fetch(`/api/merchant/${id}`);
      const result: any = await resp.json();
      setMerchantData(result);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const getItems = async () => {
    try {
      const resp = await fetch(`/api/users/merchant/${id}`);
      const result: IHistory[] = await resp.json();
      const histories = (await getIterate(result)) as IHistory[];
      setHistories(histories);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Meta title={merchantData.name} img_url={merchantData.image} />
      <Row style={{ marginBottom: '15px' }}>
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
              product={{
                data: {
                  name: merchantData.network_name,
                  description: merchantData.network_description,
                  image: merchantData.network_image,
                  thumbnail: merchantData.network_thumbnail,
                  network_link: merchantData.network_link,
                },
              }}
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
        { error }
      ) : (
        <>
          {histories.length === 0 ? (
            'No histories found'
          ) : (
            <>
              {histories.map((devoleumHistory: any) => (
                <>
                  {devoleumHistory.data && (
                    <Link
                      to={`/history/${devoleumHistory._id['$oid']}`}
                      style={{ textDecoration: 'none' }}
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
    sub: 'Stories',
  },
  it: {
    sub: 'Storie',
  },
  fr: {
    sub: 'histoires',
  },
});
