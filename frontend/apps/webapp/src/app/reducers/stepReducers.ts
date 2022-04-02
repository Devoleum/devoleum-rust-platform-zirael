import {
  STEP_LIST_REQUEST,
  STEP_LIST_SUCCESS,
  STEP_LIST_FAIL,
  STEP_DETAILS_REQUEST,
  STEP_DETAILS_SUCCESS,
  STEP_DETAILS_FAIL,
} from '../constants/stepConstants';

export const stepListReducer = (state = { steps: [] }, action: any) => {
  switch (action.type) {
    case STEP_LIST_REQUEST:
      return { loading: true, steps: [] };
    case STEP_LIST_SUCCESS:
      return {
        loading: false,
        steps: action.payload,
      };
    case STEP_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stepDetailsReducer = (
  state = { devoleumStep: { reviews: [] } },
  action: any
) => {
  switch (action.type) {
    case STEP_DETAILS_REQUEST:
      return { ...state, loading: true };
    case STEP_DETAILS_SUCCESS:
      return { loading: false, devoleumStep: action.payload };
    case STEP_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
