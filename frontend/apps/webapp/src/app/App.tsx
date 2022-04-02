import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/Home/HomeScreen';
import HistoryScreen from './screens/History/HistoryScreen';
import StepScreen from './screens/Step/StepScreen';
import MerchantScreen from './screens/Merchant/MerchantScreen';

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
            <Route path="/history/:id" element={<HistoryScreen />} />
            <Route path="/step/:stepId" element={<StepScreen />} />
            <Route path="/merchant/:id" element={<MerchantScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
