import {
  STEP_LIST_REQUEST,
  STEP_LIST_SUCCESS,
  STEP_LIST_FAIL,
  STEP_DETAILS_REQUEST,
  STEP_DETAILS_SUCCESS,
  STEP_DETAILS_FAIL,
  STEP_DELETE_REQUEST,
  STEP_DELETE_SUCCESS,
  STEP_DELETE_FAIL,
  STEP_CREATE_RESET,
  STEP_CREATE_FAIL,
  STEP_CREATE_SUCCESS,
  STEP_CREATE_REQUEST,
  STEP_UPDATE_REQUEST,
  STEP_UPDATE_SUCCESS,
  STEP_UPDATE_FAIL,
  STEP_UPDATE_RESET,
  STEP_CREATE_REVIEW_REQUEST,
  STEP_CREATE_REVIEW_SUCCESS,
  STEP_CREATE_REVIEW_FAIL,
  STEP_CREATE_REVIEW_RESET,
  STEP_TOP_REQUEST,
  STEP_TOP_SUCCESS,
  STEP_TOP_FAIL,
} from '../constants/stepConstants'

export const stepListReducer = (state = { steps: [] }, action) => {
  switch (action.type) {
    case STEP_LIST_REQUEST:
      return { loading: true, steps: [] }
    case STEP_LIST_SUCCESS:
      return {
        loading: false,
        steps: action.payload
      }
    case STEP_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const stepDetailsReducer = (
  state = { devoleumStep: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case STEP_DETAILS_REQUEST:
      return { ...state, loading: true }
    case STEP_DETAILS_SUCCESS:
      return { loading: false, devoleumStep: action.payload }
    case STEP_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const stepDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STEP_DELETE_REQUEST:
      return { loading: true }
    case STEP_DELETE_SUCCESS:
      return { loading: false, success: true }
    case STEP_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const stepCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STEP_CREATE_REQUEST:
      return { loading: true }
    case STEP_CREATE_SUCCESS:
      return { loading: false, success: true, devoleumStep: action.payload }
    case STEP_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case STEP_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const stepUpdateReducer = (state = { devoleumStep: {} }, action) => {
  switch (action.type) {
    case STEP_UPDATE_REQUEST:
      return { loading: true }
    case STEP_UPDATE_SUCCESS:
      return { loading: false, success: true, devoleumStep: action.payload }
    case STEP_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case STEP_UPDATE_RESET:
      return { devoleumStep: {} }
    default:
      return state
  }
}

export const stepReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STEP_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case STEP_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case STEP_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case STEP_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const stepTopRatedReducer = (state = { steps: [] }, action) => {
  switch (action.type) {
    case STEP_TOP_REQUEST:
      return { loading: true, steps: [] }
    case STEP_TOP_SUCCESS:
      return { loading: false, steps: action.payload }
    case STEP_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
