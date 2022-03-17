import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/Home/HomeScreen';
import HistoryScreen from './screens/History/HistoryScreen';
import StepScreen from './screens/Step/StepScreen';
import MerchantScreen from './screens/Merchant/MerchantScreen';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import EarlyRegister from './screens/EarlyRegister';
import ProfileScreen from './screens/Profile/ProfileScreen';
import UserListScreen from './screens/UserList/UserListScreen';
import UserEditScreen from './screens/UserEdit/UserEditScreen';
import HistoryListScreen from './screens/HistoryList/HistoryListScreen';
import HistoryEditScreen from './screens/HistoryEdit/HistoryEditScreen';
import StepEditScreen from './screens/StepEdit/StepEditScreen';

const App = () => {
  const api_regex = /^\/api\/.*/;
  // if using "/api/" in the pathname, don't use React Router
  if (api_regex.test(window.location.pathname)) {
    return <div />;
  }

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<EarlyRegister />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/history/:id" element={<HistoryScreen />} />
            <Route path="/step/:stepId" element={<StepScreen />} />
            <Route path="/merchant/:id" element={<MerchantScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route
              path="/dashboard/historylist"
              element={<HistoryListScreen />}
            />
            <Route
              path="/dashboard/history/:pageNumber"
              element={<HistoryListScreen />}
            />
            <Route
              path="/dashboard/history/:id/edit/:pageNumber"
              element={<HistoryEditScreen />}
            />
            <Route
              path="/dashboard/history/:id/edit"
              element={<HistoryEditScreen />}
            />
            <Route
              path="/dashboard/history/:id/step/:stepId/edit"
              element={<StepEditScreen />}
            />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
