import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import returnMatchLang from "../utils/returnMatchLang";
import Product from "../components/Product";
import FormContainer from "../components/FormContainer";
import { listSteps, deleteStep, createStep } from "../actions/stepActions";
import { STEP_CREATE_RESET } from "../constants/stepConstants";
import { uriCorrection, validationJson } from "../utils/validationJson";

const StepListScreen = ({ history, historyId }) => {
  const [uri, setUri] = useState("");
  const [item, setItem] = useState(null);
  const [name, setName] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [randomAlpha, setRandomAlpha] = useState(null);
  const [errorPost, setErrorPost] = useState(null);

  const pageNumber = 1;

  const dispatch = useDispatch();

  const stepList = useSelector((state) => state.stepList);
  const { loading, error, steps, page, pages } = stepList;

  const stepDelete = useSelector((state) => state.stepDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = stepDelete;

  const stepCreate = useSelector((state) => state.stepCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    devoleumStep: createdStep,
  } = stepCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: STEP_CREATE_RESET });

    if (!userInfo) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(
        `/dashboard/history/${historyId}/step/${createdStep._id}/edit`
      );
    } else {
      dispatch(listSteps(historyId, "", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdStep,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteStep(id));
    }
  };

  const randomString = (length, chars) => {
    let mask = "";
    if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
    if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (chars.indexOf("#") > -1) mask += "0123456789";
    if (chars.indexOf("!") > -1) mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
    let result = "";
    for (let i = length; i > 0; --i)
      result += mask[Math.floor(Math.random() * mask.length)];
    return result;
  };

  const previewHandler = async () => {
    setRandomAlpha(randomString(16, "#A!"));
    let correctUri = uriCorrection(uri)
    setUri(correctUri);
    const { localizedData, fetchedData } = await returnMatchLang(correctUri);
    if (!validationJson(localizedData, fetchedData, "step", setErrorPost)) return;
    setItem(localizedData);
    setFetchedData(fetchedData)
    setName(localizedData.name);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validationJson(item, fetchedData, "step", errorPost)) return;
    dispatch(
      createStep(historyId, {
        name,
        uri,
        randomAlpha,
      })
    );
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Steps</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {steps.length === 0 ? (
            <Message variant="info">No steps found, please add one</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>NAME</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((devoleumStep) => (
                  <tr key={devoleumStep._id}>
                    <td>{devoleumStep.name}</td>
                    <td>
                      <LinkContainer
                        to={`/dashboard/history/${historyId}/step/${devoleumStep._id}/edit`}
                      >
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(devoleumStep._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <FormContainer>
            <h1>Create new step</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="uri">
                <Form.Label>Uri*</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter uri"
                  value={uri}
                  onChange={(e) => setUri(e.target.value)}
                ></Form.Control>
                <Form.Text muted>The direct link to your JSON file</Form.Text>
              </Form.Group>
              <Form.Group controlId="randomAlpha">
                <Form.Label>Random</Form.Label>
                <Form.Control
                  type="name"
                  placeholder=""
                  value={randomAlpha}
                  onChange={(e) => setRandomAlpha(e.target.value)}
                ></Form.Control>
                <Form.Text muted>
                  Optional, a random string to anonymize proof, if empty it will
                  be automatically generated.
                </Form.Text>
              </Form.Group>
              <Button onClick={() => previewHandler()} variant="info">
                <i className="fas fa-eye"></i> Preview
              </Button>
              <br />
              <br />
              {errorPost && <Message variant="danger">{errorPost}</Message>}
              {item && (
                <>
                  <h3>Are you sure? </h3>
                  <Product product={{ data: item }} />
                  <Button type="submit" variant="success">
                    <i className="fas fa-plus"></i> Create Step
                  </Button>
                </>
              )}
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default StepListScreen;
