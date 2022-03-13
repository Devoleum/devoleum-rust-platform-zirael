import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import Meta from "../../components/Meta";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { listStepDetails } from "../../actions/stepActions";
import LocalizedStrings from "react-localization";
import Achievement from "../../components/Achievement";
//images
import eth_main_off from "../../imgs/eth_main_off.jpg";
import eth_main_on from "../../imgs/eth_main_off.jpg";
import matic_on from "../../imgs/matic_on.jpg";
import eth_test_off from "../../imgs/eth_test_off.jpg";
import eth_test_on from "../../imgs/eth_test_on.jpg";
import algo_main_off from "../../imgs/algo_main_off.jpg";
import algo_main_on from "../../imgs/algo_main_on.jpg";
import algo_test_off from "../../imgs/algo_test_off.jpg";
import algo_test_on from "../../imgs/algo_test_on.jpg";
import git_off from "../../imgs/git_off.jpg";
import git_on from "../../imgs/git_on.jpg";
import hash_off from "../../imgs/hash_off.jpg";
import hash_on from "../../imgs/hash_on.jpg";

const strings = new LocalizedStrings({
  en: {
    back: "Go Back",
    notarization: "Notarization",
    title: "Details",
  },
  it: {
    back: "Indietro",
    notarization: "Notarizzazione",
    title: "Dettagli",
  },
});

const StepScreen = () => {
  const dispatch = useDispatch();
  let { stepId } = useParams();

  const stepDetails = useSelector((state) => state.stepDetails);
  const { loading, error, devoleumStep } = stepDetails;

  useEffect(() => {
    if (!devoleumStep._id || devoleumStep._id !== stepId) {
      dispatch(listStepDetails(stepId));
    }
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link
            to={"/history/" + devoleumStep.historyId}
            className="btn btn-light my-3"
          >
            {strings.back}
          </Link>
          {devoleumStep.data && (
            <>
              <Meta
                title={devoleumStep.data.name}
                img_url={devoleumStep.data.image}
              />
              <Row style={{ marginBottom: "15px" }}>
                <Col md={6}>
                  <Image
                    src={devoleumStep.data.image}
                    alt={devoleumStep.data.name}
                    fluid
                  />
                </Col>
                <Col md={6}>
                  <h3>{devoleumStep.data.name}</h3>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      {devoleumStep.data.description}
                    </ListGroup.Item>
                  </ListGroup>
                  <Row style={{ marginBottom: "15px" }}>
                    <Col md={12}>
                      <h3>{strings.notarization}</h3>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
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
                              "https://eth.devoleum.com/" +
                              devoleumStep._id
                            }
                          />
                          <Achievement
                            label="Algorand MainNet"
                            text={devoleumStep.main_algo_notarization}
                            img={algo_main_on}
                            img_off={algo_main_off}
                            verifyLink={
                              "https://algo.devoleum.com/main/" +
                              devoleumStep._id
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
                              "https://eth.devoleum.com/" +
                              devoleumStep._id
                            }
                          />
                          <Achievement
                            label="Algorand TestNet"
                            text={devoleumStep.test_algo_notarization}
                            img={algo_test_on}
                            img_off={algo_test_off}
                            verifyLink={
                              "https://algo.devoleum.com/test/" +
                              devoleumStep._id
                            }
                          />
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <h3>{strings.title}</h3>
              <Row style={{ marginBottom: "15px" }}>
                <Col md={12}>
                  {Object.keys(devoleumStep.data).map((key, value) => (
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong
                          style={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          {" "}
                          {key.replace(/_/g, " ")}{" "}
                        </strong>{" "}
                        <br />
                        {
                          <div>
                            <div
                              style={{
                                whiteSpace: "pre-line",
                                verticalAlign: "bottom",
                                wordBreak: "break-all",
                              }}
                            >
                              {devoleumStep.data[key]}
                            </div>
                            <br />
                          </div>
                        }
                      </ListGroup.Item>
                    </ListGroup>
                  ))}
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default StepScreen;
