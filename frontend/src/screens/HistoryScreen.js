import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import Meta from "../components/Meta";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listHistoryDetails } from "../actions/historyActions";
import { listSteps } from "../actions/stepActions";
import Product from "../components/Product";
import LocalizedStrings from "react-localization";
import QRCode from "qrcode-react";
import Logo from "../imgs/icon.png";

const strings = new LocalizedStrings({
  en: {
    back: "Go Back",
    by: "by",
    title: "Steps",
    goWeb: "Visit {0} website",
  },
  it: {
    back: "Indietro",
    by: "di",
    title: "Passaggi",
    goWeb: "Visita il sito di {0}",
  },
});

const HistoryScreen = ({ match }) => {
  const dispatch = useDispatch();

  const historyDetails = useSelector((state) => state.historyDetails);
  const { loading, error, devoleumHistory } = historyDetails;
  console.log("devoleumHistory: ", devoleumHistory);

  const stepList = useSelector((state) => state.stepList);
  const { steps } = stepList;

  useEffect(() => {
    //RETROFIT PREVIOUS PLATFORM IDS, REMOVE IT ON DEVELOPMENT
    let id = (() => {
      switch (match.params.id) {
        case "1":
          return "5fff6a9a42be9f00049e8fbe";
        case "2":
          return "5ffb87240fd1c30004878d7e";
        case "3":
          return "5fff1c2798d14b000434ea84";
        default:
          return match.params.id;
      }
    })();

    if (!devoleumHistory._id || devoleumHistory._id !== id) {
      dispatch(listHistoryDetails(id, true));
      dispatch(listSteps(id, "", 1));
    }
  }, [dispatch, match]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        {strings.back}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {devoleumHistory.data && (
            <>
              <Meta
                title={devoleumHistory.data.name}
                img_url={devoleumHistory.data.image}
              />
              <Row style={{ marginBottom: "15px" }}>
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
                      {strings.by}{" "}
                      {devoleumHistory.data.merchant && (
                        <Link to={`/merchant/${devoleumHistory.user}`}>
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
                          {" "}
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
                      <div align="center">
                        <QRCode
                          logo={Logo}
                          logoWidth={60}
                          size={140}
                          bgColor="#84B62B"
                          fgColor="#014940"
                          value={
                            "https://app.devoleum.com/history/" +
                            devoleumHistory._id
                          }
                        />
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <h3>{strings.title}</h3>
              {steps.map((devoleumStep) => (
                <>
                  {devoleumStep.data && (
                    <Link
                      to={`/step/${devoleumStep._id}`}
                      style={{ textDecoration: "none" }}
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
