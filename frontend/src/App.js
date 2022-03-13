import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import HistoryScreen from './screens/HistoryScreen'
import StepScreen from './screens/StepScreen'
import MerchantScreen from './screens/MerchantScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import EarlyRegister from './screens/EarlyRegister'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import HistoryListScreen from './screens/HistoryListScreen'
import HistoryEditScreen from './screens/HistoryEditScreen'
import StepEditScreen from './screens/StepEditScreen'
import OrderListScreen from './screens/OrderListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={EarlyRegister} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/history/:id' component={HistoryScreen} />
          <Route path='/step/:stepId' component={StepScreen} />
          <Route path='/merchant/:id' component={MerchantScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/dashboard/historylist'
            component={HistoryListScreen}
            exact
          />
          <Route
            path='/dashboard/history/:pageNumber'
            component={HistoryListScreen}
            exact
          />
          <Route
            path='/dashboard/history/:id/edit/:pageNumber'
            component={HistoryEditScreen}
            exact
          />
          <Route path='/dashboard/history/:id/edit' component={HistoryEditScreen} />
          <Route path='/dashboard/history/:id/step/:stepId/edit' component={StepEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
