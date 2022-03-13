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
  HISTORY_DELETE_REQUEST,
  HISTORY_DELETE_SUCCESS,
  HISTORY_DELETE_FAIL,
  HISTORY_CREATE_RESET,
  HISTORY_CREATE_FAIL,
  HISTORY_CREATE_SUCCESS,
  HISTORY_CREATE_REQUEST,
  HISTORY_UPDATE_REQUEST,
  HISTORY_UPDATE_SUCCESS,
  HISTORY_UPDATE_FAIL,
  HISTORY_UPDATE_RESET,
  HISTORY_CREATE_REVIEW_REQUEST,
  HISTORY_CREATE_REVIEW_SUCCESS,
  HISTORY_CREATE_REVIEW_FAIL,
  HISTORY_CREATE_REVIEW_RESET,
  HISTORY_TOP_REQUEST,
  HISTORY_TOP_SUCCESS,
  HISTORY_TOP_FAIL,
  HISTORY_PUBLICLIST_REQUEST,
  HISTORY_PUBLICLIST_SUCCESS,
  HISTORY_PUBLICLIST_FAIL
} from '../constants/historyConstants'

export const historyListReducer = (state = { histories: [] }, action) => {
  switch (action.type) {
    case HISTORY_LIST_REQUEST:
      return { loading: true, histories: [] }
    case HISTORY_LIST_SUCCESS:
      return {
        loading: false,
        histories: action.payload.histories,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case HISTORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const historyPublicListReducer = (state = { histories: [] }, action) => {
  switch (action.type) {
    case HISTORY_PUBLICLIST_REQUEST:
      return { loading: true, histories: [] }
    case HISTORY_PUBLICLIST_SUCCESS:
      return {
        loading: false,
        histories: action.payload.histories,
      }
    case HISTORY_PUBLICLIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const historyListByMerchantReducer = (state = { histories: [] }, action) => {
  switch (action.type) {
    case HISTORY_MERCHANT_REQUEST:
      return { loading: true, histories: [] }
    case HISTORY_MERCHANT_SUCCESS:
      return {
        loading: false,
        histories: action.payload,
      }
    case HISTORY_MERCHANT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const historyDetailsReducer = (
  state = { devoleumHistory: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case HISTORY_DETAILS_REQUEST:
      return { ...state, loading: true }
    case HISTORY_DETAILS_SUCCESS:
      return { loading: false, devoleumHistory: action.payload }
    case HISTORY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const historyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HISTORY_DELETE_REQUEST:
      return { loading: true }
    case HISTORY_DELETE_SUCCESS:
      return { loading: false, success: true }
    case HISTORY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const historyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HISTORY_CREATE_REQUEST:
      return { loading: true }
    case HISTORY_CREATE_SUCCESS:
      return { loading: false, success: true, devoleumHistory: action.payload }
    case HISTORY_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case HISTORY_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const historyUpdateReducer = (state = { devoleumHistory: {} }, action) => {
  switch (action.type) {
    case HISTORY_UPDATE_REQUEST:
      return { loading: true }
    case HISTORY_UPDATE_SUCCESS:
      return { loading: false, success: true, devoleumHistory: action.payload }
    case HISTORY_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case HISTORY_UPDATE_RESET:
      return { devoleumHistory: {} }
    default:
      return state
  }
}

export const historyReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HISTORY_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case HISTORY_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case HISTORY_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case HISTORY_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const historyTopRatedReducer = (state = { histories: [] }, action) => {
  switch (action.type) {
    case HISTORY_TOP_REQUEST:
      return { loading: true, histories: [] }
    case HISTORY_TOP_SUCCESS:
      return { loading: false, histories: action.payload }
    case HISTORY_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
