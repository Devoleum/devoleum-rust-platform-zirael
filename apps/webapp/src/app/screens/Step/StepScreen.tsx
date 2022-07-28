import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Meta from '../../components/Meta/Meta';
import Loader from '../../components/Loader/Loader';
import LocalizedStrings from 'react-localization';
import Achievement from '../../components/Achievement/Achievement';
//images
import eth_main_off from '../../imgs/eth_main_off.jpg';
import eth_main_on from '../../imgs/eth_main_off.jpg';
import matic_on from '../../imgs/matic_on.jpg';
import eth_test_off from '../../imgs/eth_test_off.jpg';
import eth_test_on from '../../imgs/eth_test_on.jpg';
import algo_main_off from '../../imgs/algo_main_off.jpg';
import algo_main_on from '../../imgs/algo_main_on.jpg';
import algo_test_off from '../../imgs/algo_test_off.jpg';
import algo_test_on from '../../imgs/algo_test_on.jpg';
import git_off from '../../imgs/git_off.jpg';
import git_on from '../../imgs/git_on.jpg';
import hash_off from '../../imgs/hash_off.jpg';
import hash_on from '../../imgs/hash_on.jpg';
import { IStep } from '../../models/ISteps';
import { getIterate, getOnce } from '../../utils/fetchData';
import axios from 'axios';

const strings = new LocalizedStrings({
  en: {
    back: 'Go Back',
    notarization: 'Notarization',
    title: 'Details',
  },
  it: {
    back: 'Indietro',
    notarization: 'Notarizzazione',
    title: 'Dettagli',
  },
});

const StepScreen = () => {
  const { stepId } = useParams();

  const [devoleumStep, setDevoleumStep] = useState<IStep | any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const result = await axios.get(`/api/steps/${stepId}`);
      const step_data = await getOnce(result.data);
      const step = { ...result.data, data: step_data };
      setDevoleumStep(step);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getItems();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        { error }
      ) : (
        <>
          {devoleumStep._id && (
            <Link
              to={'/history/' + devoleumStep.historyId['$oid']}
              className="btn btn__light"
            >
              {strings.back}
            </Link>
          )}
          {devoleumStep._id && devoleumStep.data && (
            <>
              <Meta
                title={devoleumStep.data.name}
                img_url={devoleumStep.data.image}
              />
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col col-md-6">
                  <img
                    src={devoleumStep.data.image}
                    alt={devoleumStep.data.name}
                    className="img-fluid"
                  />
                </div>
                <div className="col col-md-6">
                  <h3>{devoleumStep.data.name}</h3>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item">
                      {devoleumStep.data.description}
                    </div>
                  </div>
                  <div className="row" style={{ marginBottom: '15px' }}>
                    <div className="col col-md-12">
                      <h3>{strings.notarization}</h3>
                      <div className="list-group list-group-flush">
                        <div className="list-group-item">
                          <Achievement
                            label="JSON link"
                            text={devoleumStep.uri}
                            img={git_on}
                            img_off={git_off}
                          />
                          <Achievement
                            label="Hash"
                            text={devoleumStep.hash}
                            link={false}
                            img={hash_on}
                            img_off={hash_off}
                          />
                          <Achievement
                            label="Polygon Matic"
                            text={devoleumStep.polygon_matic_notarization}
                            img={matic_on}
                            img_off={eth_main_off}
                            verifyLink={
                              'https://eth.devoleum.com/' +
                              devoleumStep._id['$oid']
                            }
                          />
                          <Achievement
                            label="Algorand MainNet"
                            text={devoleumStep.main_algo_notarization}
                            img={algo_main_on}
                            img_off={algo_main_off}
                            verifyLink={
                              'https://algo.devoleum.com/main/' +
                              devoleumStep._id['$oid']
                            }
                          />
                          <Achievement
                            label="Ethereum Main"
                            text={devoleumStep.main_eth_notarization}
                            img={eth_main_on}
                            img_off={eth_main_off}
                          />
                          <Achievement
                            label="Ethereum Rinkeby"
                            text={devoleumStep.test_eth_notarization}
                            img={eth_test_on}
                            img_off={eth_test_off}
                            verifyLink={
                              'https://eth.devoleum.com/' +
                              devoleumStep._id['$oid']
                            }
                          />
                          <Achievement
                            label="Algorand TestNet"
                            text={devoleumStep.test_algo_notarization}
                            img={algo_test_on}
                            img_off={algo_test_off}
                            verifyLink={
                              'https://algo.devoleum.com/test/' +
                              devoleumStep._id['$oid']
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3>{strings.title}</h3>
              <div className="row" style={{ marginBottom: '15px' }}>
                <div className="col col-md-12">
                  {Object.keys(devoleumStep.data).map((key, value) => (
                    <div className="list-group list-group-flush">
                      <div className="list-group-item">
                        <strong
                          style={{
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            color: 'black',
                          }}
                        >
                          {' '}
                          {key.replace(/_/g, ' ')}{' '}
                        </strong>{' '}
                        <br />
                        {
                          <div>
                            <div
                              style={{
                                whiteSpace: 'pre-line',
                                verticalAlign: 'bottom',
                                wordBreak: 'break-all',
                              }}
                            >
                              {devoleumStep.data[key]}
                            </div>
                            <br />
                          </div>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default StepScreen;
