import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import ItemInfo from "../components/ItemInfo";
import { listHistoryDetails, updateHistory } from "../actions/historyActions";
import { HISTORY_UPDATE_RESET } from "../constants/historyConstants";
import StepListScreen from "./StepListScreen";



const HistoryEditScreen = ({ match, history }) => {
  const historyId = match.params.id;
  const pageNumber = match.params.pageNumber || 1;

  const [uri, setUri] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const historyDetails = useSelector((state) => state.historyDetails);
  const { loading, error, devoleumHistory } = historyDetails;
  console.log(devoleumHistory);

  const historyUpdate = useSelector((state) => state.historyUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = historyUpdate;

  useEffect(() => {
    
    if (successUpdate) {
      dispatch({ type: HISTORY_UPDATE_RESET });
      history.push("/dashboard/historylist");
    } else {
      if (!devoleumHistory.name || devoleumHistory._id !== historyId) {
        dispatch(listHistoryDetails(historyId));
      } else {
        setName(devoleumHistory.name);
        setUri(devoleumHistory.uri);
        setCategory(devoleumHistory.category);
      }
    }
  }, [dispatch, history, historyId, devoleumHistory, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateHistory({
        _id: historyId,
        name,
        uri,
        category,
      })
    );
  };

  return (
    <>
      <Link to="/dashboard/historylist" className="btn btn-light my-3">
        Go Back to list
      </Link>
      <ItemInfo item={devoleumHistory}/>
      <FormContainer>
        <h1>Edit History</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
                <Form.Text muted>The direct link to your JSON file</Form.Text>
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

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
      <br />
      <br />
      <StepListScreen
        historyId={historyId}
        history={history}
        page={pageNumber}
      />
    </>
  );
};

export default HistoryEditScreen;
