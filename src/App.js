import React from 'react';
import Login from './components/auth/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import Inbox from './components/pages/Inbox';
import Compose from './components/pages/Compose';
import SentEmail from './components/pages/SentMail';
import ViewMail from './components/pages/ViewMail';

const App = () => {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/compose' element={<Compose />} />
          <Route path='/inbox' element={<Inbox />} />
          <Route path='/sent' element={<SentEmail />} />
          <Route path="/emails/:emailId" element={<ViewMail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
