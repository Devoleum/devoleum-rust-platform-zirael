import {
  MERCHANT_DETAILS_REQUEST,
  MERCHANT_DETAILS_SUCCESS,
  MERCHANT_DETAILS_FAIL,
} from '../constants/userConstants';

export const merchantDetailsReducer = (
  state = { merchantData: { reviews: [] } },
  action: any
) => {
  switch (action.type) {
    case MERCHANT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case MERCHANT_DETAILS_SUCCESS:
      return { loading: false, merchantData: action.payload };
    case MERCHANT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
