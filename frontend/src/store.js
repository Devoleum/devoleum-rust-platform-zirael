import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import {
  composeWithDevTools
} from 'redux-devtools-extension'
import {
  historyListReducer,
  historyListByMerchantReducer,
  historyDetailsReducer,
  historyDeleteReducer,
  historyCreateReducer,
  historyUpdateReducer,
  historyReviewCreateReducer,
  historyTopRatedReducer,
  historyPublicListReducer
} from './reducers/historyReducers'

import {
  stepListReducer,
  stepDetailsReducer,
  stepDeleteReducer,
  stepCreateReducer,
  stepUpdateReducer,
  stepReviewCreateReducer,
  stepTopRatedReducer,
} from './reducers/stepReducers'

import {
  cartReducer
} from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  merchantDetailsReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  historyList: historyListReducer,
  historyListByMerchant: historyListByMerchantReducer,
  historyDetails: historyDetailsReducer,
  historyDelete: historyDeleteReducer,
  historyCreate: historyCreateReducer,
  historyUpdate: historyUpdateReducer,
  historyReviewCreate: historyReviewCreateReducer,
  historyTopRated: historyTopRatedReducer,
  historyPublicList: historyPublicListReducer,
  stepList: stepListReducer,
  stepDetails: stepDetailsReducer,
  stepDelete: stepDeleteReducer,
  stepCreate: stepCreateReducer,
  stepUpdate: stepUpdateReducer,
  stepReviewCreate: stepReviewCreateReducer,
  stepTopRated: stepTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  merchantDetails: merchantDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
  JSON.parse(localStorage.getItem('cartItems')) :
  []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) :
  null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
  JSON.parse(localStorage.getItem('shippingAddress')) :
  {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store