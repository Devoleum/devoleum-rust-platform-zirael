import axios from 'axios'
import {
  HISTORY_LIST_REQUEST,
  HISTORY_LIST_SUCCESS,
  HISTORY_LIST_FAIL,
  HISTORY_MERCHANT_REQUEST,
  HISTORY_MERCHANT_SUCCESS,
  HISTORY_MERCHANT_FAIL,
  HISTORY_DETAILS_REQUEST,
  HISTORY_DETAILS_SUCCESS,
  HISTORY_DETAILS_FAIL,
  HISTORY_DELETE_SUCCESS,
  HISTORY_DELETE_REQUEST,
  HISTORY_DELETE_FAIL,
  HISTORY_CREATE_REQUEST,
  HISTORY_CREATE_SUCCESS,
  HISTORY_CREATE_FAIL,
  HISTORY_UPDATE_REQUEST,
  HISTORY_UPDATE_SUCCESS,
  HISTORY_UPDATE_FAIL,
  HISTORY_CREATE_REVIEW_REQUEST,
  HISTORY_CREATE_REVIEW_SUCCESS,
  HISTORY_CREATE_REVIEW_FAIL,
  HISTORY_TOP_REQUEST,
  HISTORY_TOP_SUCCESS,
  HISTORY_TOP_FAIL,
  HISTORY_PUBLICLIST_REQUEST,
  HISTORY_PUBLICLIST_SUCCESS,
  HISTORY_PUBLICLIST_FAIL
} from '../constants/historyConstants'
import { logout } from './userActions'
import {getIterate, getOnce} from '../utils/fetchData'

export const listHistories = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: HISTORY_LIST_REQUEST })

    let { data } = await axios.get(
      `/api/histories?keyword=${keyword}&pageNumber=${pageNumber}`
    )
    data.histories = await getIterate(data.histories, true);
    dispatch({
      type: HISTORY_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: HISTORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPublicHistories = () => async (
  dispatch
) => {
  try {
    dispatch({ type: HISTORY_PUBLICLIST_REQUEST })

    let { data } = await axios.get(
      `/api/histories/public`
    )
    data.histories = await getIterate(data.histories, true);
    console.log("histories: ", data.histories)
    dispatch({
      type: HISTORY_PUBLICLIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: HISTORY_PUBLICLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listHistoriesByMerchant = (merchantId) => async (dispatch) => {
  try {
    dispatch({ type: HISTORY_MERCHANT_REQUEST })

    let { data } = await axios.get(`/api/histories/merchant/${merchantId}`)
    data.histories = await getIterate(data);
    
    dispatch({
      type: HISTORY_MERCHANT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: HISTORY_MERCHANT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listHistoryDetails = (id, getMerchBool = false) => async (dispatch) => {
  try {
    dispatch({ type: HISTORY_DETAILS_REQUEST })

    let { data } = await axios.get(`/api/histories/${id}`)
    data.data = await getOnce(data, getMerchBool);

    dispatch({
      type: HISTORY_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: HISTORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteHistory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HISTORY_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/histories/${id}`, config)

    dispatch({
      type: HISTORY_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: HISTORY_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createHistory = (history) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HISTORY_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/histories`, history, config)

    dispatch({
      type: HISTORY_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: HISTORY_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateHistory = (history) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HISTORY_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/histories/${history._id}`,
      history,
      config
    )

    dispatch({
      type: HISTORY_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: HISTORY_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createHistoryReview = (historyId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: HISTORY_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/histories/${historyId}/reviews`, review, config)

    dispatch({
      type: HISTORY_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: HISTORY_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopHistories = () => async (dispatch) => {
  try {
    dispatch({ type: HISTORY_TOP_REQUEST })

    const { data } = await axios.get(`/api/histories/top`)
    data.histories = await getIterate(data);

    dispatch({
      type: HISTORY_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: HISTORY_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
