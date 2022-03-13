import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import returnMatchLang from "../utils/returnMatchLang";
import { uriCorrection, validationJson } from "../utils/validationJson";
import Product from "../components/Product";

import {
  listHistoriesByMerchant,
  deleteHistory,
  createHistory,
} from "../actions/historyActions";
import { HISTORY_CREATE_RESET } from "../constants/historyConstants";

const HistoryListScreen = ({ history, match }) => {
  const [uri, setUri] = useState("");
  const [name, setName] = useState("");
  const [item, setItem] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [category, setCategory] = useState("");
  const [errorPost, setErrorPost] = useState(null);

  const dispatch = useDispatch();

  const historyListByMerchant = useSelector(
    (state) => state.historyListByMerchant
  );

  const { loading, error, histories } = historyListByMerchant;

  const historyDelete = useSelector((state) => state.historyDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = historyDelete;

  const historyCreate = useSelector((state) => state.historyCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    devoleumHistory: createdHistory,
  } = historyCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: HISTORY_CREATE_RESET });

    if (!userInfo) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/dashboard/history/${createdHistory._id}/edit`);
    } else {
      dispatch(listHistoriesByMerchant(userInfo._id));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdHistory,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteHistory(id));
    }
  };

  const previewHandler = async () => {
    let correctUri = uriCorrection(uri)
    setUri(correctUri);
    const { localizedData, fetchedData } = await returnMatchLang(correctUri);
    if (!validationJson(localizedData, fetchedData, "history", setErrorPost)) return;
    setItem(localizedData);
    setFetchedData(fetchedData)
    setName(localizedData.name);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validationJson(item, fetchedData, "history", errorPost)) return;
    dispatch(
      createHistory({
        name,
        uri,
        category,
      })
    );
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Histories</h1>
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
          {histories.length === 0 ? (
            <Message variant="info">No steps found, please add one</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>CATEGORY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {histories.map((devoleumHistory) => (
                  <tr key={devoleumHistory._id}>
                    <td>{devoleumHistory.name}</td>
                    <td>{devoleumHistory.category}</td>
                    <td>
                      <LinkContainer
                        to={`/dashboard/history/${devoleumHistory._id}/edit`}
                      >
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(devoleumHistory._id)}
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
            <h1>Create new story</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="uri">
                <Form.Label>Uri</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter uri"
                  value={uri}
                  onChange={(e) => setUri(e.target.value)}
                ></Form.Control>
                <Form.Text muted>
                  The direct link to your history JSON file
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
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
                    <i className="fas fa-plus"></i> Create History
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

export default HistoryListScreen;
