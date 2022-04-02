import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import Meta from '../../components/Meta';
import Loader from '../../components/Loader';
import Product from '../../components/Product/Product';
import LocalizedStrings from 'react-localization';
import QRCode from 'react-qr-code';
import { IStep } from '../../models/ISteps';
import { getIterate, getOnce } from '../../utils/fetchData';
import { IHistory } from '../../models/IHistory';
import axios, { Axios } from 'axios';

const strings = new LocalizedStrings({
  en: {
    back: 'Go Back',
    by: 'by',
    title: 'Steps',
    goWeb: 'Visit {0} website',
  },
  it: {
    back: 'Indietro',
    by: 'di',
    title: 'Passaggi',
    goWeb: 'Visita il sito di {0}',
  },
});

const HistoryScreen: React.FC = () => {
  let { id } = useParams();
  console.log('id: ', id);

  const [devoleumHistory, setDevoleumHistory] = useState<IHistory | any>(null);
  const [steps, setSteps] = useState<IStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getItems = async (id: string) => {
    try {
      const result = await axios.get(`/api/steps/history/${id}`);
      const steps = (await getIterate(result.data, true)) as IStep[];
      console.log('steps: ', steps);
      setSteps(steps);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const getHistory = async (id: string) => {
    try {
      const result = await axios.get(`/api/histories/${id}`);
      const history_data = (await getOnce(
        result.data,
        true
      )) as unknown as IHistory;
      const history = { ...result.data, data: history_data };
      setDevoleumHistory(history);
      console.log('history: ', history);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    //RETROFIT PREVIOUS PLATFORM IDS, REMOVE IT ON DEVELOPMENT
    let retro_id: any = (() => {
      switch (id) {
        case '1':
          return '5fff6a9a42be9f00049e8fbe';
        case '2':
          return '5ffb87240fd1c30004878d7e';
        case '3':
          return '5fff1c2798d14b000434ea84';
        default:
          return id;
      }
    })();
    getHistory(retro_id);
    getItems(retro_id);
  }, []);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        {strings.back}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        { error }
      ) : (
        <>
          {devoleumHistory && devoleumHistory._id && devoleumHistory.data && (
            <>
              <Meta
                title={devoleumHistory.data.name}
                img_url={devoleumHistory.data.image}
              />
              <Row style={{ marginBottom: '15px' }}>
                <Col md={6}>
                  <Image
                    src={devoleumHistory.data.image}
                    alt={devoleumHistory.data.name}
                    fluid
                  />
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{devoleumHistory.data.name}</h3>
                      {strings.by}{' '}
                      {devoleumHistory.data.merchant && (
                        <Link to={`/merchant/${devoleumHistory.user['$oid']}`}>
                          {devoleumHistory.data.merchant.name}
                        </Link>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {devoleumHistory.data.description}
                      <br />
                      <br />
                      {devoleumHistory.data.merchant && (
                        <div>
                          {' '}
                          <a
                            href={devoleumHistory.data.merchant.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {strings.formatString(
                              strings.goWeb,
                              devoleumHistory.data.merchant.name
                            )}
                          </a>
                        </div>
                      )}

                      <br />
                      <div style={{ textAlign: 'center' }}>
                        <QRCode
                          size={140}
                          bgColor="#84B62B"
                          fgColor="#014940"
                          value={
                            'https://app.devoleum.com/history/' +
                            devoleumHistory._id['$oid']
                          }
                        />
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <h3>{strings.title}</h3>
              {steps &&
                steps.map((devoleumStep: any) => (
                  <>
                    {devoleumStep.data && (
                      <Link
                        to={`/step/${devoleumStep._id['$oid']}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Product product={devoleumStep} />
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

export default HistoryScreen;
