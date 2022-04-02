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
  HISTORY_PUBLICLIST_REQUEST,
  HISTORY_PUBLICLIST_SUCCESS,
  HISTORY_PUBLICLIST_FAIL,
} from '../constants/historyConstants';

export const historyListReducer = (state = { histories: [] }, action: any) => {
  switch (action.type) {
    case HISTORY_LIST_REQUEST:
      return { loading: true, histories: [] };
    case HISTORY_LIST_SUCCESS:
      return {
        loading: false,
        histories: action.payload,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case HISTORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const historyPublicListReducer = (
  state = { histories: [] },
  action: any
) => {
  switch (action.type) {
    case HISTORY_PUBLICLIST_REQUEST:
      return { loading: true, histories: [] };
    case HISTORY_PUBLICLIST_SUCCESS:
      return {
        loading: false,
        histories: action.payload,
      };
    case HISTORY_PUBLICLIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const historyListByMerchantReducer = (
  state = { histories: [] },
  action: any
) => {
  switch (action.type) {
    case HISTORY_MERCHANT_REQUEST:
      return { loading: true, histories: [] };
    case HISTORY_MERCHANT_SUCCESS:
      return {
        loading: false,
        histories: action.payload,
      };
    case HISTORY_MERCHANT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const historyDetailsReducer = (
  state = { devoleumHistory: { reviews: [] } },
  action: any
) => {
  switch (action.type) {
    case HISTORY_DETAILS_REQUEST:
      return { ...state, loading: true };
    case HISTORY_DETAILS_SUCCESS:
      return { loading: false, devoleumHistory: action.payload };
    case HISTORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
